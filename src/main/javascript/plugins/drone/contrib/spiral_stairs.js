var Drone = require('../drone').Drone;
var blocks = require('blocks');

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
Drone.extend("spiral_stairs",function(stairBlock, flights){
    this.chkpt('spiral_stairs');
    
    for (var i = 0; i < flights; i++){
        this
            .box(blocks.stairs[stairBlock] + ':' + Drone.PLAYER_STAIRS_FACING[this.dir])
            .up().fwd()
            .box(blocks.stairs[stairBlock] + ':' + Drone.PLAYER_STAIRS_FACING[this.dir])
            .up().fwd()
            .box(blocks.slab[stairBlock])
            .turn().fwd();
    }
    return this.move('spiral_stairs');
});
