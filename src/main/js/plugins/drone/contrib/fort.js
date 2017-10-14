'use strict';
/*global require */
var Drone = require('drone'),
  blocks = require('blocks');
/************************************************************************
### Drone.fort() method

Constructs a medieval fort.

#### Parameters
 
 * side - How many blocks whide and long the fort will be (default: 18 . Must be greater than 9)
 * height - How tall the fort will be (default: 6 . Must be greater than 3)

#### Example

At the in-game prompt you can create a fort by looking at a block and typing:

```javascript
/js fort()
```

Alternatively you can create a new Drone object from a Player or Location object and call the fort() method.

```javascript
var d = new Drone(player);
d.fort();
```
![fort example](img/fortex1.png)

***/ 
function fort( side, height ) {
  var turret,
    i,
    torch;

  if ( typeof side == 'undefined' ) {
    side = 18;
  }
  if ( typeof height == 'undefined' ) { 
    height = 6;
  }
  // make sure side is even
  if ( side % 2 ) {
    side++;
  }
  var battlementWidth = 3;
  if ( side <= 12 ) {
    battlementWidth = 2;
  }
  if ( height < 4 || side < 10 ) {
    throw new java.lang.RuntimeException('Forts must be at least 10 wide X 4 tall');
  }
  //
  // build walls.
  //
  this
    .chkpt('fort')
    .down()
    .chessboard( blocks.wool.black, blocks.wool.white, side)
    .up()
    .box0( blocks.brick.stone, side, height - 1, side)
    .up(height-1);
  //
  // build battlements
  //
  for ( i = 0; i <= 3; i++ ) {

    turret = [
      blocks.stairs.stone ,
      blocks.stairs.stone + ':'+ Drone.PLAYER_STAIRS_FACING[ (this.dir + 2) % 4 ]
    ];
    this
      .box( blocks.brick.stone ) // solid brick corners
      .up()
      .box(blocks.torch)
      .down() // light a torch on each corner
      .fwd()
      .boxa( turret, 1, 1, side-2)
      .fwd( side-2 )
      .turn();
  }
  //
  // build battlement's floor
  //
  this
    .move('fort')
    .up(height-2)
    .fwd()
    .right();

  for ( i = 0; i < battlementWidth; i++ ) { 
    var bside = side - ( 2 + (i * 2) );
    this
      .box0( blocks.slab.oak, bside, 1, bside)
      .fwd()
      .right();
  }
  //
  // add door
  //
  torch = blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[this.dir];
  this
    .move('fort')
    .right( ( side / 2 ) - 1 )
    .door2() // double doors
    .back()
    .left()
    .up()
    .box( torch ) // left torch
    .right( 3 )
    .box( torch ); // right torch
  //
  // add ladder up to battlements
  //
  this
    .move('fort')
    .right( ( side / 2 ) - 3 )
    .fwd() // move inside fort
    .turn( 2 )
    .box( blocks.air, 1, height - 1, 1)
    .ladder( height - 1 )
    .move( 'fort' );
}
Drone.extend(fort);

