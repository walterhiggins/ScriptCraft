'use strict';
/*global require */
var Drone = require('drone'),
  blocks = require('blocks');
/************************************************************************
### Drone.cottage() method

Creates a simple but cosy dwelling.

#### Example

At the in-game prompt you can create a cottage by looking at a block and typing:

```javascript
/js cottage()
```

Alternatively you can create a new Drone object from a Player or Location object and call the cottage() method.

```javascript
var d = new Drone(player);
d.cottage();
```
![cottage example](img/cottageex1.png)

***/
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
/************************************************************************
### Drone.cottage_road() method

Creates a tree-lined avenue with cottages on both sides.

#### Parameters
 
 * numberOfCottages: The number of cottages to build in total (optional: default 6)

#### Example

At the in-game prompt you can create a cottage road by looking at a block and typing:

```javascript
/js cottage_road()
```

Alternatively you can create a new Drone object from a Player or Location object and call the cottage_road() method.

```javascript
var d = new Drone(player);
d.cottage_road();
```
![cottage_road example](img/cottageroadex1.png)

***/

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
    // make sure the drone's state is saved.
    .chkpt('cottage_road') 
    // build the road
    .box( blocks.double_slab.stone, 3, 1, cottagesPerSide * ( distanceBetweenTrees + 1 ) ) 
    .up()
    // now centered in middle of road
    .right() 
    // will be returning to this position later
    .chkpt('cottage_road_cr'); 

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
    .move('cottage_road_cr')
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
  }
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

