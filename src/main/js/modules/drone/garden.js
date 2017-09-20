/*global module, require*/
'use strict';
/************************************************************************
### Drone.garden() method

places random flowers and long grass (similar to the effect of placing bonemeal on grass)

#### Parameters

 * width - the width of the garden
 * length - how far from the drone the garden extends

#### Example

To create a garden 10 blocks wide by 5 blocks long...

    garden(10,5);

![garden example](img/gardenex1.png)

***/
var blocks = require('blocks');

function garden( width, depth ) {
  if ( typeof width == 'undefined' ) { 
    width = 10;
  }
  if ( typeof depth == 'undefined' ) { 
    depth = width;
  }
  // make sure grass is present first
  this
    .box( blocks.grass, width, 1, depth )
    .up();
  
  // make flowers more common than long grass
  var dist = { };
  dist[blocks.rose] = 3;
  dist[blocks.dandelion] = 3;
  dist[blocks.grass_tall] = 2;
  dist[blocks.air] = 1;

  this
    .rand( dist, width, 1, depth, false /* don't overwrite */ )
    .down();
}
module.exports = function(Drone){
  Drone.extend(garden);
};
