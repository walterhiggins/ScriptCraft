// Receives: D2|D3|D4|PWM9|PWM10|PWM11|STR|00 (1 byte each except STR, termiante with 00)
// Sends: D5|D6|D7|A0|A1|A2|STR|00 (1 byte each except STR, terminate with 00)
// I/O are 0 or 255 for digital, 0-255 for analog (input is PWM, output is sensor),
//  null-terminated string at end.
// Digital inputs of 0 is LOW, everything else is HIGH
// Since driving an LCD takes 6 pins free, you can optionally have the I/O code ignore the
//    input values for pin 9,10,11 and not touch them, giving you 8,9,10,11,12,13 to drive an LCD.
//    of course, you lose PWM output then.  Just set usePinX to false.


String inputString = "";         // a string to hold incoming data

// millis delay between sending readings.  Only approximate.
const unsigned long SEND_DELAY_MS= 1500;

unsigned long lastSendMS = 0;

// inputs
const int INPUT_ARRAY_LENGTH = 6;

boolean newPacketAvailable = false;  // do we have a new packet
byte inputs[INPUT_ARRAY_LENGTH];
String displayString;

// outputs
const int OUTPUT_ARRAY_LENGTH = 6;

byte outputs[OUTPUT_ARRAY_LENGTH];

// sensor values
byte d5 = 0;
byte d6 = 0;
byte d7 = 0;
byte a0 = 0;
byte a1 = 0;
byte a2 = 0;

// How many bytes of the current packet have we processed?
int bytesProcessed = 0;

void setup() {
  // initialize serial
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  
  // Set up digital pins for I/O
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);

  pinMode(5, INPUT);
  pinMode(6, INPUT);
  pinMode(7, INPUT);
  
  establishContact();
}

void loop() {
  // handle input buffer once complete
  if (newPacketAvailable) {
    handleInputs();
    newPacketAvailable = false;
  }
  
  // send outputs
  if (abs(millis() - lastSendMS) > SEND_DELAY_MS) {
    readSensors();
    sendOutput();
    lastSendMS = millis();
  }
}

/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent() {

  // handled old message and have a new message...
  if (Serial.available() && !newPacketAvailable) {
    displayString = "";
    // read until the first 00
    while (Serial.available() && !newPacketAvailable) {
      byte inByte = Serial.read();

      // read first BYTE_ARRAY_LENGTH bytes into array...
      if (bytesProcessed < INPUT_ARRAY_LENGTH) {
        inputs[bytesProcessed] = inByte;
        bytesProcessed += 1;
      } else {
        // and append the rest to the displayString
//        displayString += (char)inByte;
        if (inByte == 0) {
          bytesProcessed = 0;
          // If we've ended the string, the packet is ready for processing
          newPacketAvailable = true;
        }
      }
    }
  }
}

void establishContact() {
  while (Serial.available() <= 0) {
    delay(300);
  }
}

void handleInputs() {
  digitalWrite(2, inputs[0]==0?LOW:HIGH);
  digitalWrite(3, inputs[1]==0?LOW:HIGH);
  digitalWrite(4, inputs[2]==0?LOW:HIGH);
  analogWrite(9, inputs[3]);
  analogWrite(10, inputs[4]);
  analogWrite(11, inputs[5]);
}

void handleDisplayString() {
  // Send to LCD for a nifty display.
}

void readSensors() {
  //interleave analog and digital so ADC has more time to recover
  a0 = analogRead(A0)/4;
  d5 = map(digitalRead(5), 0, 1, 0, 255);
  a1 = analogRead(A1)/4;
  d6 = map(digitalRead(6), 0, 1, 0, 255);
  a2 = analogRead(A2)/4;
  d7 = map(digitalRead(7), 0, 1, 0, 255);
}

void sendOutput() {
  Serial.write(d5);
  Serial.write(d6);
  Serial.write(d7);
  Serial.write(a0);
  Serial.write(a1);
  Serial.write(a2);
  Serial.write('\0');
}

