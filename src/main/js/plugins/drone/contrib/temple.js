var Drone = require('../drone').Drone;
var blocks = require('blocks');
//
// constructs a mayan temple
// 
function temple( side ) {
  if ( !side ) {
    side = 20;
  }
  this.chkpt('temple');

  while ( side > 4 ) {
    var middle = Math.round( (side-2) / 2 );
    this
      .chkpt('temple-corner')
      .box( blocks.brick.mossy, side, 1, side )
      .right( middle )
      .box( blocks.stairs.stone )
      .right()
      .box( blocks.stairs.stone )
      .move('temple-corner')
      .up()
      .fwd()
      .right();
    side = side - 2;
  }

  this.move('temple');
}
Drone.extend( temple );
