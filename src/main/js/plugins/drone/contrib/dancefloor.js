'use strict';
/*global require, clearInterval, setInterval*/
var Drone = require('drone'),
  blocks = require('blocks'),
  SECOND = 1000;
/************************************************************************
### Drone.dancefloor() method
Create an animated dance floor of colored tiles some of which emit light.
The tiles change color every second creating a strobe-lit dance-floor effect.
See it in action here [http://www.youtube.com/watch?v=UEooBt6NTFo][ytdance]

#### Parameters 

 * width - how wide the dancefloor should be (optional: default 5)
 * length - how long the dancefloor should be (optional: default 5)
 * duration - the time duration for which the lights should change (optional: default 30 seconds)

#### Example

At the in-game prompt you can create a dancefloor by looking at a block and typing:

```javascript
/js dancefloor()
```

Alternatively you can create a new Drone object from a Player or Location object and call the dancefloor() method.

```javascript
var d = new Drone(player);
d.dancefloor();
```

[ytdance]: http://www.youtube.com/watch?v=UEooBt6NTFo
![dancefloor example](img/dancefloorex1.png)
***/

//
function dancefloor(width, length, duration) {
  if (typeof width == 'undefined') width = 5;
  if (typeof length == 'undefined') length = width;
  if (typeof duration === 'undefined') {
    duration = 30;
  }
  //
  // create a separate Drone object to lay down disco tiles
  //
  var disco = new Drone(this.x, this.y, this.z, this.dir, this.world);
  //
  // under-floor lighting
  //
  disco
    .down()
    .box(blocks.glowstone, width, 1, length)
    .up();

  //
  // strobe gets called in a java thread - disco only lasts 30 seconds.
  //
  var task = null;
  var strobe = function() {
    disco.rand(blocks.rainbow, width, 1, length);
    duration--;
    if (duration == 0) {
      // turn off the lights
      clearInterval(task);
    }
  };
  task = setInterval(strobe, 1 * SECOND);
}
Drone.extend(dancefloor);
