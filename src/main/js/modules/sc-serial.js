'use strict';
/*************************************************************************
## sc-serial module

This module provides a simple way to communicate with devices (such as Arduino Uno)
using the serial port.

### Usage

This module can only be used if the separate `jssc.jar` file is
present in the CraftBukkit classpath. To use this module, you should
...

 1. Download jssc.jar from <https://github.com/scream3r/java-simple-serial-connector/releases>
 2. Save the file to the same directory where craftbukkit.jar resides.
 3. Create a new launch script.
 	On Windows, call it craftbukkit-jssc.bat and edit it to include 
 	the following command...

    ```sh
    java -classpath jssc.jar;craftbukkit.jar org.bukkit.craftbukkit.Main
    ```

    If you're using Mac OS, create a new craftbukkit-jssc.command
    file and edit it (using TextWrangler or another text editor) ...

    ```sh
    java -classpath jssc.jar:craftbukkit.jar org.bukkit.craftbukkit.Main
    ```

 4. Execute the craftbukkit-jssc batch file / command file to start
    Craftbukkit. You can now begin using this module to send and receive
    messages to/from a serial-connected Arduino which is running the
    included "serduino.ino" program.
    
	```javascript
	var serial = require('sc-serial');
	// get a list of all available serial ports
	console.log(serial.allSerialPorts());
	// create a new port.  serial.port() would default to 9600,N,8,1 on first available serial port, usually good choice
	var port = serial.port(9600,0,8,1,'COM1');
	// OR...
	var port = serial.port();
	// open the port
	port.open();
	// send "ABC"
	client.send([65,66,67]);
	//  do something when an incoming message arrives... bytes will be dropped until callback is set.
	//   (callback can be set before port is opened)
	client.onBytesReceived( function( port, buffer ) {
		var outString = "";
		for (var i = 0; i < buffer.length; i++) {
			outString += String.fromCharCode(buffer[i]);
		}
		console.log("Message arrived: "+ outString);
	});
	// close the port
	port.close();
	```

***/


function SerialPort( baudRate, parity, dataBits, stopBits, serialPort ) {

    if ( !serialPort ) {
        var portNames = Packages.jssc.SerialPortList.getPortNames();
        if (portNames.length > 0) {
            serialPort = portNames[0];
        }
        else {
            throw "No serial port specified or available.";
        }
    }
    if ( !baudRate ) {
        baudRate = 9600;
    }
    if ( parity && parity == 'N' ) {
        parity = 0;
    }
    if ( !parity ) {
        parity = 0;
    }
    if ( !dataBits ) {
        dataBits = 8;
    }
    if ( !stopBits ) {
        stopBits = 1;
    }

    var onPortOpened;
    var onPortClosed;
    var onBytesReceived;
    var onDeliveryComplete;

    var port = new Packages.jssc.SerialPort(serialPort);

    return {

        open: function() {
            if (port && port.isOpened ()) {
                disconnect();
            }
            port.openPort();
            port.setParams(baudRate, dataBits, stopBits, parity);
            var mask = Packages.jssc.SerialPort.MASK_RXCHAR +
                Packages.jssc.SerialPort.MASK_CTS +
                Packages.jssc.SerialPort.MASK_DSR;
            port.setEventsMask(mask);

            port.addEventListener(
                function serialEvent(event) {
                    if (event.isRXCHAR()){
                        var buffer = port.readBytes();
                        // convert to JavaScript array
                        var outBytes = [];
                        for ( var i = 0; i < buffer.length; i++ ) {
                            var outByte = buffer[i]<0?buffer[i]+256:buffer[i]; // signed->unsigned
                            outBytes.push(outByte);
                            //TODO: DEBUG ONLY
                            //console.log(outBytes[i]);
                        }
                        if (onBytesReceived) {
                            onBytesReceived(this, outBytes);
                        }
                        // Some test code
                    }
                }
            );

            if (onPortOpened) {
                onPortOpened(this);
            }

            console.log("Serial port '"+serialPort+"' opened.")

            return this;
        },

        close: function() {
            port.purgePort (1);
            port.purgePort (2);
            port.closePort ();

            if (onPortClosed) {
                onPortClosed(this);
            }

            console.log("Serial port '"+serialPort+"' closed.")

            return this;
        },

        send: function( bytes ) {
            var sendArray = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, bytes.length);
            if (typeof bytes == 'string') {
                for (var i = 0; i < bytes.length; i++) {
                    var charCode = bytes.charCodeAt(i);
                    var outByte = charCode<128?charCode:charCode-256; // Java has no unsigned byte.  Thanks, Java.
                    sendArray[i] = java.lang.Byte.valueOf(outByte);
                }
            }
            else {
                for (var i = 0; i < bytes.length; i++) {
                    var outByte = bytes[i]<128?bytes[i]:bytes[i]-256; // Java has no unsigned byte.  Thanks, Java.
                    sendArray[i] = java.lang.Byte.valueOf(outByte);
                    //TODO: DEBUG ONLY
                    //console.log(bytes[i]+"("+outByte+")");
                }
            }
            var success = port.writeBytes(sendArray);
            if (!success) {
                throw "Unknown error writing to serial port.";
            }
            if (onDeliveryComplete) {
                onDeliveryComplete(this);
            }
        },

        onPortOpened: function( fn ) {
            onPortOpened = fn;
            return this;
        },

        onPortClosed: function( fn ) {
            onPortClosed = fn;
            return this;
        },

        onBytesReceived: function( fn ) {
            onBytesReceived = fn;
            return this;
        },

        onDeliveryComplete: function( fn ) {
            onDeliveryComplete = fn;
            return this;
        }
    };
}
/*
 Return a new Serial Client
 options: int baudRate, int dataBits, int stopBits, int parity
 eg. "serial.port(9600,0,8,1)" for 9600,N,8,1 on the first available serial port
 eg. "serial.port(9600,0,8,1,'COM1')" for 9600,N,8,1 on COM1
 */
exports.port = function( baudRate, parity, dataBits, stopBits, serialPort ) {
    if ( typeof Packages.jssc.SerialPort != 'function' ) {
        throw "Error: Cannot find jssc.SerialPort.  Please ensure jssc.jar is on the CLASSPATH.";
    }
    return new SerialPort( baudRate, parity, dataBits, stopBits, serialPort );
};
exports.allSerialPorts = function() {
    if ( typeof Packages.jssc.SerialPortList != 'function' ) {
        throw "Error: Cannot find jssc.SerialPortList.  Please ensure jssc.jar is on the CLASSPATH.";
    }
    return Packages.jssc.SerialPortList.getPortNames().join(",");
};

