'use strict';
/*global require */
var Drone = require('drone'),
  blocks = require('blocks');
/************************************************************************
### Drone.castle() method

Creates a Castle. A castle is just a big wide fort with 4 taller forts at each corner. 
See also Drone.fort() method.

#### Parameters
 
 * side - How many blocks wide and long the castle will be (default: 24. Must be greater than 19)
 * height - How tall the castle will be (default: 10. Must be geater than 7)

#### Example

At the in-game prompt you can create a castle by looking at a block and typing:

```javascript
/js castle()
```

Alternatively you can create a new Drone object from a Player or Location object and call the castle() method.

```javascript
var d = new Drone(player);
d.castle();
```
![castle example](img/castleex1.png)

***/
function castle(side, height) {
  //
  // use sensible default parameter values
  // if no parameters are supplied
  //
  if (typeof side == 'undefined') side = 24;
  if (typeof height == 'undefined') height = 10;
  if (height < 8 || side < 20)
    throw new java.lang.RuntimeException(
      'Castles must be at least 20 wide X 8 tall'
    );
  //
  // how big the towers at each corner will be...
  //
  var towerSide = 10;
  var towerHeight = height + 4;

  //
  // the main castle building will be front and right of the first tower
  //
  this.chkpt('castle')
    .fwd(towerSide / 2)
    .right(towerSide / 2)
    .fort(side, height)
    .move('castle');
  //
  // now place 4 towers at each corner (each tower is another fort)
  //
  for (var corner = 0; corner < 4; corner++) {
    // construct a 'tower' fort
    this.fort(towerSide, towerHeight)
      .chkpt('tower-' + corner)
      .fwd(towerSide - 1)
      .right(towerSide - 3)
      .up(towerHeight - 5) // create 2 doorways from main castle rampart into each tower
      .box(blocks.air, 1, 2, 1)
      .back(2)
      .right(2)
      .box(blocks.air, 1, 2, 1)
      .move('tower-' + corner)
      .fwd(side + towerSide - 1) // move forward the length of the castle then turn right
      .turn();
  }
  this.move('castle');
}
Drone.extend(castle);
