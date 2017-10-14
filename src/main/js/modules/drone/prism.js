'use strict';
/*global require, module*/
/************************************************************************
### Drone.prism() method

Creates a prism. This is useful for roofs on houses.

#### Parameters

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * width - the width of the prism
 * length - the length of the prism (will be 2 time its height)

#### Example

    prism(blocks.oak,3,12);

![prism example](img/prismex1.png)

### Drone.prism0() method

A variation on `prism` which hollows out the inside of the prism. It
uses the same parameters as `prism`.

***/
var STAIRBLOCKS = {
  53: '5:0'     // oak wood
  ,67: 4    // cobblestone
  ,108: 45  // brick
  ,109: 98  // stone brick
  ,114: 112 // nether brick
  ,128: 24  // sandstone
  ,134: '5:1'    // spruce wood
  ,135: '5:2'    // birch wood
  ,136: '5:3'    // jungle wood
  ,156: 155  // quartz
};
//
// prism private implementation
//
function prism( block, w, d ) {
  var stairEquiv = STAIRBLOCKS[block];
  if ( stairEquiv ) {
    this
      .fwd()
      .prism( stairEquiv,w,d-2 )
      .back()
      .stairs(block, w, d / 2)
      .fwd(d - 1)
      .right(w - 1)
      .turn(2)
      .stairs(block, w, d / 2)
      .turn(2)
      .left(w - 1)
      .back(d - 1);
  }else{
    var c = 0;
    var d2 = d;
    while ( d2 >= 1 ) { 
      this.cuboid(block,w,1,d2 );
      d2 -= 2;
      this.fwd( ).up( );
      c++;
    }
    this.down(c ).back(c );
  }
  return this;
}
//
// prism0 private implementation
//
function prism0( block,w,d ) { 
  this
    .stairs(block,w,d/2)
    .fwd(d-1)
    .right(w-1)
    .turn(2)
    .stairs(block,w,d/2)
    .turn(2)
    .left(w-1)
    .back(d-1);
  
  var se = STAIRBLOCKS[block];
  if (se) {
    this
      .fwd()
      .prism(se,1,d-2)
      .right(w-1)
      .prism(se,1,d-2)
      .left(w-1)
      .back();
  }
}
module.exports = function(Drone){
  Drone.extend(prism0);
  Drone.extend(prism);
};
