var Drone = require('../drone').Drone;
var blocks = require('blocks');

Drone.extend('skyscraper', function( floors ) {
  var i = 0;
  if ( typeof floors == 'undefined' ) { 
    floors = 10; 
  }
  this.chkpt('skyscraper');
  for ( i = 0; i < floors; i++ ) {
    this          //     w   h  d
      .box( blocks.iron, 20, 1, 20)  // iron floor
      .up()       //           w   h  d
      .box0(blocks.glass_pane, 20, 3, 20) // glass walls
      .up(3);
  }
  return this.move('skyscraper');
});
