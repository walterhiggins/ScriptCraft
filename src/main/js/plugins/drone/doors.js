/*************************************************************************
### Drone.door() method

create a door - if a parameter is supplied an Iron door is created otherwise a wooden door is created.

#### Parameters

 * doorType (optional - default wood) - If a parameter is provided then the door is Iron.

#### Example

To create a wooden door at the crosshairs/drone's location...

    var drone = new Drone(self);
    drone.door();

To create an iron door...

    drone.door( blocks.door_iron );

![iron door](img/doorex1.png)

### Drone.door_iron() method

create an Iron door.

### Drone.door2() method

Create double doors (left and right side)

#### Parameters

 * doorType (optional - default wood) - If a parameter is provided then the door is Iron.

#### Example

To create double-doors at the cross-hairs/drone's location...

    drone.door2();

![double doors](img/door2ex1.png)

### Drone.door2_iron() method

Create double iron doors

***/

var Drone = require('./drone').Drone;
/*global require*/
function door( doorMaterial, hinge) {
  if ( typeof doorMaterial == 'undefined' ) {
    doorMaterial = 64; // wood
  } 
  if (typeof hinge == 'undefined') { 
    hinge = 'left';
  }
  this.then(function(){
    this.setBlock(doorMaterial, this.dir);
    this.setBlock(doorMaterial, hinge=='left' ? 8 : 9, 0,1,0);
  });
}
Drone.extend( door );

Drone.extend( function door_iron( ) {
  this.door(71);
} );

Drone.extend( function door2( doorMaterial ) {
  if ( typeof doorMaterial == 'undefined' ) {
    doorMaterial = 64;
  } 
  this
    .door( doorMaterial, 'left')
    .right()
    .door( doorMaterial, 'right')
    .left();
} );
Drone.extend( function door2_iron( ) {
  this.door2( 71 );
} );
