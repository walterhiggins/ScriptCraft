var Drone = require('../drone/drone').Drone; 

var treehouse = function(numFloors, floorHeight, material) {
    var i ;
    if ( typeof numFloors == 'undefined' ) {
        numFloors = 6;
    }
    if ( typeof floorHeight == 'undefined' ) {
        floorHeight = 3;
    }
    if ( typeof material == 'undefined' ) {
        material = blocks.jungle;
    }
    this.chkpt('treehouse'); // saves the drone position so it can return there later

    // Create Jungle tree
    this.fwd(2).turn().fwd(2).jungle().box(0,1,25,1);

    // Create Treehouse levels
    this.move('treehouse');
    for ( i = 0; i < numFloors; i++ ) {
        this.box(material,10,1,10)
            .up()
            .box0(blocks.fence,10,1,10)
            .up(floorHeight);
    }
    // Create treehouse roof
    this.box(material,10,1,10);

    // return to checkpoint
    return this.move('treehouse'); 
};


// Example: /js treehouse()
// make sure you point at a piece of dirt in the ground so the jungle tree will grow
Drone.extend('treehouse',treehouse);