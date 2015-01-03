var Drone = require('../drone').Drone;
var blocks = require('blocks');
//
// usage: 
// [1] to build a cottage at the player's current location or the cross-hairs location...
//
// /js cottage();
// 
// [2] to build a cottage using an existing drone...
// 
// /js drone.cottage();
//
function cottage( ) {
  this
    .chkpt('cottage')
    .down()
    .box(blocks.birch, 7, 1, 6) // birch wood floor
    .up()
    .box(blocks.air, 7, 5, 6) // clear area first
    .box0( blocks.moss_stone, 7, 2, 6)  // 4 walls
    .right(3)
    .door() // door front and center
    .up(1)
    .left(2)
    .box( blocks.glass_pane ) // windows to left and right
    .right(4)
    .box( blocks.glass_pane )
    .left(5)
    .up()
    .prism0( blocks.stairs.oak, 7, 6) // add a roof
    .down()
    .right(4)
    .back()
    .wallsign(['Home','Sweet','Home'])
    .fwd()
    .move('cottage')
    .right(3)
    .fwd(4)
    .up()
    .hangtorch()     // place a torch on wall
    .move('cottage')
    .right()
    .fwd(3)
    .bed()           // place a bed against left wall
    .fwd()
    .right(4)
    .box(blocks.furnace) // place a furnace against right wall
    .move('cottage')
  ;
}
//
// a more complex script that builds an tree-lined avenue with
// cottages on both sides.
//
function cottage_road( numberCottages ) {
  if (typeof numberCottages == 'undefined'){
    numberCottages = 6;
  }
  var i=0, distanceBetweenTrees = 11;
  //
  // step 1 build the road.
  //
  var cottagesPerSide = Math.floor(numberCottages/2);
  this
    .chkpt('cottage_road') // make sure the drone's state is saved.
    .box( blocks.double_slab.stone, 3, 1, cottagesPerSide * ( distanceBetweenTrees + 1 ) ) // build the road
    .up()
    .right() // now centered in middle of road
    .chkpt('cr'); // will be returning to this position later

  //
  // step 2 line the road with trees
  //
  for ( ; i < cottagesPerSide+1;i++ ) {
    this
      .left(5)
      .oak() 
      .right(10)
      .oak()
      .left(5) // return to middle of road
      .fwd( distanceBetweenTrees + 1 ); // move forward.
  }
  this
    .move('cr')
    .back(6); // move back 1/2 the distance between trees

  // this function builds a path leading to a cottage.
  function pathAndCottage( drone ) {
    drone
      .down()
      .box(blocks.double_slab.stone, 1, 1, 5)
      .fwd(5)
      .left(3)
      .up()
      .cottage();
    return drone;
  };
  //
  // step 3 build cottages on each side
  //
  for ( i = 0; i < cottagesPerSide; i++ ) {
    this
      .fwd( distanceBetweenTrees + 1 )
      .chkpt('r'+i);
    // build cottage on left
    pathAndCottage( this.turn(3) ).move( 'r' + i );
    // build cottage on right
    pathAndCottage( this.turn() ).move( 'r' + i );
  }
  // return drone to where it was at start of function
  this.move('cottage_road'); 
}
Drone.extend(cottage_road);
Drone.extend(cottage);

