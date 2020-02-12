var myskyscraper = function(floors) {
    var i ;
    if ( typeof floors == 'undefined' ) {
        floors = 10;
    }
    this.chkpt('myskyscraper'); // saves the drone position so it can return there later
    for ( i = 0; i < floors; i++ ) {
        this.box(blocks.iron,20,1,20)
            .up()
            .box0(blocks.glass_pane,20,3,20)
            .up(3);
    }
    return this.move('myskyscraper'); // return to where we started
};
var Drone = require('../drone/drone').Drone; 
Drone.extend('myskyscraper',myskyscraper);
