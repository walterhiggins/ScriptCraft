'use strict';
/*global require, setInterval, clearInterval, __plugin, exports*/
/*************************************************************************
### Drone.lcdclock() method.

Constructs a large LCD Clock. The clock will display the current time of day.
The clock can be stopped by calling the stopLCD() method of the Drone which created the clock.

#### Parameters

 * foregroundBlock (Optional - default is blocks.glowstone)
 * backgroundBlock (Optional - default is blocks.wool.black)
 * borderBlock (Optional - a border around the LCD display - default none)

#### Example

At the in-game prompt you can create a LCD clock by looking at a block and typing:

```javascript
/js var clock = lcdclock()
/js clock.stopLCD()
```

Alternatively you can create a new Drone object from a Player or Location object and call the lcdclock() method.

```javascript
var d = new Drone(player);
d.lcdclock();
d.stopLCD();
```
![lcdclock example](img/lcdclockex1.png)
***/
var blocks = require('blocks'),
  utils = require('utils'),
  Drone = require('drone');

function lcdclock(fgColor, bgColor, border) {
  var drone = this;
  var lastSecs = [0, 0, 0, 0],
    world = drone.world,
    intervalId = -1;

  function update(secs) {
    var digits = [0, 0, 0, 0],
      s = secs % 60,
      m = (secs - s) / 60;
    digits[3] = s % 10;
    digits[2] = (s - digits[3]) / 10;
    digits[1] = m % 10;
    digits[0] = (m - digits[1]) / 10;
    //
    // updating all 4 digits each time is expensive
    // only update digits which have changed (in most cases - just 1)
    //
    if (digits[3] != lastSecs[3]) {
      drone
        .right(14)
        .blocktype('' + digits[3], fgColor, bgColor, true)
        .left(14);
    }
    if (digits[2] != lastSecs[2]) {
      drone
        .right(10)
        .blocktype('' + digits[2], fgColor, bgColor, true)
        .left(10);
    }
    if (digits[1] != lastSecs[1]) {
      drone
        .right(4)
        .blocktype('' + digits[1], fgColor, bgColor, true)
        .left(4);
    }
    if (digits[0] != lastSecs[0]) {
      drone.blocktype('' + digits[0], fgColor, bgColor, true);
    }
    lastSecs[0] = digits[0];
    lastSecs[1] = digits[1];
    lastSecs[2] = digits[2];
    lastSecs[3] = digits[3];
  }
  if (typeof bgColor == 'undefined') {
    bgColor = blocks.wool.black;
  }
  if (typeof fgColor == 'undefined') {
    fgColor = blocks.glowstone;
  }
  if (border) {
    drone.box(border, 21, 9, 1);
    drone.up().right();
  }
  drone.blocktype('00:00', fgColor, bgColor, true);

  function tick() {
    var timeOfDayInMins = utils.time24(world);
    update(timeOfDayInMins);
  }
  intervalId = setInterval(tick, 800);
  this.stopLCD = function() {
    clearInterval(intervalId);
  };
}

Drone.extend(lcdclock);
