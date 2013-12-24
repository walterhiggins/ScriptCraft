var Drone = require('../drone').Drone;
//
// constructs a mayan temple
// 
Drone.extend('temple', function(side) {
  if (!side) {
    side = 20;
  }
  var stone = '98:1';
  var stair = '109:' + Drone.PLAYER_STAIRS_FACING[this.dir];

  this.chkpt('temple');

  while (side > 4) {
    var middle = Math.round((side-2)/2);
    this.chkpt('corner')
      .box(stone, side, 1, side)
      .right(middle).box(stair).right().box(stair)
      .move('corner').up().fwd().right();
    side = side - 2;
  }

  return this.move('temple');
});
