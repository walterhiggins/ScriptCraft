'use strict';
/*global require*/
var Drone = require('drone'),
  blocks = require('blocks');

/************************************************************************
### Drone.spiral_stairs() method

Constructs a spiral staircase with slabs at each corner.

#### Parameters

 * stairBlock - The block to use for stairs, should be one of the following...
   - 'oak'
   - 'spruce'
   - 'birch'
   - 'jungle'
   - 'cobblestone'
   - 'brick'
   - 'stone'
   - 'nether'
   - 'sandstone'
   - 'quartz'
 * flights - The number of flights of stairs to build.

![Spiral Staircase](img/spiralstair1.png)

#### Example

To construct a spiral staircase 5 floors high made of oak...

    spiral_stairs('oak', 5);

***/
function spiral_stairs(stairBlock, flights) {
  this.chkpt('spiral_stairs');

  for (var i = 0; i < flights; i++) {
    this.box(blocks.stairs[stairBlock])
      .up()
      .fwd()
      .box(blocks.stairs[stairBlock])
      .up()
      .fwd()
      .box(blocks.slab[stairBlock])
      .turn()
      .fwd();
  }
  this.move('spiral_stairs');
}
Drone.extend(spiral_stairs);
