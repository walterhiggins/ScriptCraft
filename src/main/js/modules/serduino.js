'use strict';
/*************************************************************************
## serduino module

This module communicates with an Arduino board over a serial link.  The Arduino
must be running the included serduino.ino program.  The program and this module
define a protocol in which the value of 6 pins are sent in each direction, along
with an optional string (for debugging or LCD display).

The protocol is as follows
	Sends: D2|D3|D4|PWM9|PWM10|PWM11|STR|00 (1 byte each except STR, termiante with 00)
	Receives: D5|D6|D7|A0|A1|A2|STR|00 (1 byte each except STR, terminate with 00)

Each pin is 1 byte (0-255).  Digital values (0 for LOW and >0 for HIGH) are sent for 
pins 2, 3, and 4, and PWM duty cycles for PWM pins 9, 10, and 11.  Digital values 
(0 or 255) are received for pins 5, 6, and 7, and analog values (0-255) are received
for Analog pins A0, A1, or A2.  (To specify the analog pins in this class, just use the
numbers 0, 1, and 2 in the read functions.)

Note that the current Arduino code can only manage updates every 1-2 seconds, so you'll
have to hold buttons down for a bit for them to take effect, and sensors may not
immediately trigger actions.

### Usage

Below are some examples for working with serduino...

	```javascript
	var serduino = require('serduino');
	// Create a connection object
	var conn = serduino.connect();
	// Start the connection
	conn.start();
	// After a second or two to make sure it's going...
	// Send an initial command to let the Arduino know we're here
	conn.writeDigital(2,0);

	// Now the Arduino will send us regular updates, and we can set pins
	
	// Put an LED and 1K resistor in series across pin 2.  Turn it on with:
	conn.writeDigital(2,255); // Any number other than 0 will work...

	// Or turn it on when any redstone is activated in the world...
	events.blockRedstone(function(event){conn.writeDigital(2,event.newCurrent);});
	
	// Put a potentiometer on analog pin 0 and read its value with:
	conn.readAnalog(0);
	
	// Callbacks can also be installed so a function is triggered when a pin changes...
	// This example launches some fireworks at location (-292,0,0) when pin 5 goes HIGH:
	conn.onPinChanged(5,function(pin,value) { 
			if (value) new Drone(-292,0,0,1,server.worlds.get(0)).firework();
		});
	// This example sets night/day according to an analog pin (eg. potentiometer, light meter):
	//  (It doesn't process 0's in case there's a flaky connection to the sensor)
	conn.onPinChanged(0,function(pin,value) { 
			if (value != 0) server.worlds.get(0).time = 6000+value*12000/256; 
		});
	```
	
**/

var serial = require('sc-serial');


function Serduino ( baudRate, parity, dataBits, stopBits, serialPort ) {

    var port = serial.port( baudRate, parity, dataBits, stopBits, serialPort );

    var inputBuffer = [];
    var bytesProcessed = 0; // how many bytes of the current packet have we processed so far?

    var outBytes = [0,0,0,0,0,0];
    var outputString = "";

    var inBytes = [0,0,0,0,0,0];
    var inPins = [5,6,7,0,1,2];
    var inputString = "";

    var onPinChanged = {}; // ""+pin -> func
    var onStringChanged;

    return {
        start: function() {
            port.onBytesReceived(this.handleBytesReceived(this));
            port.open();

        },

        stop: function() {
            inputBuffer = [];
            bytesProcessed = 0;
            port.close();
        },

        writeDigital: function(pin, value) {
            switch (pin) {
                case 2: outBytes[0] = value; break;
                case 3: outBytes[1] = value; break;
                case 4: outBytes[2] = value; break;
                default: throw "Digital output pin must be 2, 3, or 4."
            }
            this.sendUpdate();
        },

        writePWM: function(pin, value) {
            switch (pin) {
                case 9: outBytes[3] = value; break;
                case 10: outBytes[4] = value; break;
                case 11: outBytes[5] = value; break;
                default: throw "PWM output pin must be 9, 10, or 11."
            }
            this.sendUpdate();
        },

        writeString: function(output) {
            outputString = output;
            this.sendUpdate();
        },

        // returns boolean for the last known value of the pin
        readDigital: function(pin) {
            switch (pin) {
                case 5: return inBytes[0] != 0; break;
                case 6: return inBytes[1] != 0; break;
                case 7: return inBytes[2] != 0; break;
                default: throw "Digital input pin must be 5, 6, or 7."
            }
        },

        // returns int 0-255 for the last known value of the pin
        readAnalog: function(pin) {
            switch (pin) {
                case 0: return inBytes[3]; break;
                case 1: return inBytes[4]; break;
                case 2: return inBytes[5]; break;
                default: throw "Analog input pin must be 0, 1, or 2."
            }
        },

        readString: function() {
            return inputString;
        },

		// fn parameters will be (pin, value)
		//      where value is int for analog and boolean for digital
        onPinChanged: function( pin, fn ) {
            onPinChanged[""+pin] = fn;
        },

		// fn parameters will be (str)
        onStringChanged: function( fn ) {
            onStringChanged = fn;
        },

        sendUpdate: function() {
            port.send(outBytes);
            var bytes = [];
            for (var i = 0; i < outputString.length; ++i)
            {
                bytes.push(outputString.charCodeAt(i));
            }
            bytes.push(0);
            port.send(bytes);
        },

        handleBytesReceived: function(arduino) {
            return function (port, bytes) {
//                console.log(bytes.length+" bytes received.");

                for (var i = 0; i < bytes.length; i++) {
                    inputBuffer.push(bytes[i]);
                    bytesProcessed++;
//                    console.log("Processed: "+bytesProcessed+" ("+bytes[i]+")");
                    if (bytesProcessed > 6 && bytes[i] == 0) {
//                        console.log("processing packet");
                        arduino.processPacket();
                        // this packet is ended... start a new one
                        bytesProcessed = 0;
                        inputBuffer = [];
                    }
                }
            }
        },

        processPacket: function() {
//             var packetString = "";
//             for (var i = 0; i < inputBuffer.length; i++) {
//                 packetString += inputBuffer[i] + " ";
//             }
//             console.log("Process packet: "+packetString);
            for (var i = 0; i < 6; i++) {
                if (inBytes[i] != inputBuffer[i]) {
                    inBytes[i] = inputBuffer[i];
                    if (onPinChanged[""+inPins[i]]) {
                    	// convert digital pins to booleans
                    	var value = (i < 3) ? inBytes[i]!=0 : inBytes[i];
                        onPinChanged[""+inPins[i]](inPins[i],value);
                    }
                }
            }
            var oldInputString = inputString;
            inputString = "";
            for (var i = 6; i < inputBuffer.length; i++) {
                inputString += String.fromCharCode(inputBuffer[i]);
            }
            if (inputString != oldInputString) {
                if (onStringChanged) {
                    onStringChanged(inputString);
                }
            }
        }
    }
}

// Leave parameters blank for 9600,N,8,1 on the first available serial port
exports.connect = function( baudRate, parity, dataBits, stopBits, serialPort ) {
    return new Serduino( baudRate, parity, dataBits, stopBits, serialPort );
};
