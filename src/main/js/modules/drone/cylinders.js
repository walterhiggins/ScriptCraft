'use strict';

/**************************************************************************
### Drone.cylinder() method

A convenience method for building cylinders. Building begins radius blocks to the right and forward.

#### Parameters

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * radius 
 * height

#### Example

To create a cylinder of Iron 7 blocks in radius and 1 block high...

    cylinder(blocks.iron, 7 , 1);

![cylinder example](img/cylinderex1.png)

### Drone.cylinder0() method

A version of cylinder that hollows out the middle.

#### Example

To create a hollow cylinder of Iron 7 blocks in radius and 1 block high...

    cylinder0(blocks.iron, 7, 1);

![cylinder0 example](img/cylinder0ex1.png)

***/

function cylinder0( block,radius,height,exactParams ) { 
  var arcParams = {
    radius: radius,
    fill: false,
    orientation: 'horizontal',
    stack: height
  };

  if ( exactParams ) { 
    for ( var p in exactParams ) {
      arcParams[p] = exactParams[p];
    }
  }else{
    var md = this.getBlockIdAndMeta(block );
    arcParams.blockType = md[0];
    arcParams.meta = md[1];
  }
  return this.arc(arcParams );
}
function cylinder( block,radius,height,exactParams ) { 
  var arcParams = {
    radius: radius,
    fill: true,
    orientation: 'horizontal',
    stack: height
  };

  if ( exactParams ) { 
    arcParams.blockType = exactParams.blockType;
    arcParams.meta = exactParams.meta;
  }else{
    var md = this.getBlockIdAndMeta(block );
    arcParams.blockType = md[0];
    arcParams.meta = md[1];
  }
  return this.arc(arcParams );
}
module.exports = function(Drone){
  Drone.extend(cylinder0 );
  Drone.extend(cylinder );
};
