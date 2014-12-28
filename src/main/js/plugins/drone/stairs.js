/**************************************************************************
### Drone.stairs() function

The stairs() function will build a flight of stairs

#### Parameters

 * blockType - should be one of the following: 

   * blocks.stairs.oak
   * blocks.stairs.cobblestone
   * blocks.stairs.brick
   * blocks.stairs.stone
   * blocks.stairs.nether
   * blocks.stairs.sandstone
   * blocks.stairs.spruce
   * blocks.stairs.birch
   * blocks.stairs.jungle
   * blocks.stairs.quartz

 * width - The width of the staircase - default is 1
 * height - The height of the staircase - default is 1

#### Example

To build an oak staircase 3 blocks wide and 5 blocks tall:

    /js stairs(blocks.stairs.oak, 3, 5) 

Staircases do not have any blocks beneath them.

***/
var Drone = require('./drone').Drone;
/*global require*/
function stairs(blockType, width, height){
  if (typeof width === 'undefined')
    width = 1;
  if (typeof height === 'undefined')
    height = 1;
  this.chkpt('_stairs');
  while (height > 0) {
    this.traverseWidth(width, function(){
      this.setBlock(blockType, Drone.PLAYER_STAIRS_FACING[this.dir]);
	if ( this.bountiful ){
	  // 1.8
	  var prop = require('blockhelper').property;
	  var block = this.getBlock();
	  prop(block).set('facing',that.dir);
	  block.update();
	}
    });

    this.fwd().up();
    height -= 1;
  }
  this.move('_stairs');
}
Drone.extend(stairs);
