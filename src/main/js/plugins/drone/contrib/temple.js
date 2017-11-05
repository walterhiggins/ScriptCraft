'use strict';
/*global require*/
var Drone = require('drone'),
  blocks = require('blocks');
/************************************************************************
### Drone.temple() method

Constructs a mayan temple.

#### Parameters
 
 * side - How many blocks wide and long the temple will be (default: 20)

#### Example

At the in-game prompt you can create a temple by looking at a block and typing:

```javascript
/js temple()
```

Alternatively you can create a new Drone object from a Player or Location object and call the temple() method.

```javascript
var d = new Drone(player);
d.temple();
```
![temple example](img/templeex1.png)

***/
function temple(side) {
  if (!side) {
    side = 20;
  }
  this.chkpt('temple');

  while (side > 4) {
    var middle = Math.round((side - 2) / 2);
    this.chkpt('temple-corner')
      .box(blocks.brick.mossy, side, 1, side)
      .right(middle)
      .box(blocks.stairs.stone)
      .right()
      .box(blocks.stairs.stone)
      .move('temple-corner')
      .up()
      .fwd()
      .right();
    side = side - 2;
  }

  this.move('temple');
}
Drone.extend(temple);
