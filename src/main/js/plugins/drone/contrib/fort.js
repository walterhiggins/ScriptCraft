var Drone = require('../drone').Drone;
var blocks = require('blocks');
//
// constructs a medieval fort
// 
function fort( side, height ) {
  var brick = 98,
    turret,
    i,
    torch,
    ladder;

  if ( typeof side == 'undefined' ) {
    side = 18;
  }
  if ( typeof height == 'undefined' ) { 
    height = 6;
  }
  // make sure side is even
  if ( side % 2 ) {
    side++;
  }
  var battlementWidth = 3;
  if ( side <= 12 ) {
    battlementWidth = 2;
  }
  if ( height < 4 || side < 10 ) {
    throw new java.lang.RuntimeException('Forts must be at least 10 wide X 4 tall');
  }
  //
  // build walls.
  //
  this.chkpt('fort')
    .down().chessboard(blocks.wool.black, blocks.wool.white, side).up()
    .box0(brick,side,height-1,side)
    .up(height-1);
  //
  // build battlements
  //
  for ( i = 0; i <= 3; i++ ) {

    turret = [
      '109:'+ Drone.PLAYER_STAIRS_FACING[this.dir],
      '109:'+ Drone.PLAYER_STAIRS_FACING[(this.dir+2)%4]
    ];
    this.box(brick) // solid brick corners
      .up()
      .box('50:5')
      .down() // light a torch on each corner
      .fwd()
      .boxa(turret,1,1,side-2)
      .fwd(side-2)
      .turn();
  }
  //
  // build battlement's floor
  //
  this.move('fort')
    .up(height-2)
    .fwd()
    .right();

  for ( i = 0; i < battlementWidth; i++ ) { 

    this.box0('126:0', side - ( 2 + (i * 2) ), 1, side - ( 2 + ( i * 2) ))
      .fwd()
      .right();
  }
  //
  // add door
  //
  torch = '50:' + Drone.PLAYER_TORCH_FACING[this.dir];
  this.move('fort')
    .right((side/2)-1)
    .door2() // double doors
    .back()
    .left()
    .up()
    .box(torch) // left torch
    .right(3)
    .box(torch); // right torch
  //
  // add ladder up to battlements
  //
  ladder = '65:' + Drone.PLAYER_SIGN_FACING[(this.dir+2)%4];
  this.move('fort')
    .right((side/2)-3)
    .fwd(1) // move inside fort
    .box(ladder, 1,height-1,1)
    .move('fort');
}
Drone.extend(fort);

