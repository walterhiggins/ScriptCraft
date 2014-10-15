//Example taken from ScriptCraft tutorial

var Drone = require('../drone/drone').Drone; 


var skyscraper = function(numFloors, floorHeight, material) {
    var i ;
    if ( typeof numFloors == 'undefined' ) {
        numFloors = 10;
    }
    if ( typeof floorHeight == 'undefined' ) {
        floorHeight = 3;
    }
    if ( typeof material == 'undefined' ) {
        material = blocks.iron;
    }
    this.chkpt('skyscraper'); // saves the drone position so it can return there later
    for ( i = 0; i < numFloors; i++ ) {
        this.box(material,20,1,20)
            .up()
            .box0(blocks.glass_pane,20,floorHeight,20)
            .up(floorHeight);
    }
    this.box(material,20,1,20);
    return this.move('skyscraper'); // return to where we started
};

Drone.extend('skyscraper',skyscraper);

//Example: /js skyscraper(10,7,blocks.diamond)