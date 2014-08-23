var Drone = require('../drone').Drone;
var bkMaterial = org.bukkit.Material;

function canHang( material ) {

  if ( material.equals(bkMaterial.AIR) ||
       material.equals(bkMaterial.VINE) ) {
    return true;
  } else { 
    return false;
  }
}  
function hangtorch() { 
  var torch = '50:' + Drone.PLAYER_TORCH_FACING[this.dir];
  var moves = 0;
  var block = this.world.getBlockAt(this.x, this.y, this.z);

  while ( !canHang(block.type) ){

    moves++;
    this.back();
    if (moves == 10){
      this.fwd(moves);
      console.log('nowhere to hang torch');
      return;
    }
    block = this.world.getBlockAt(this.x, this.y, this.z);
  }
  this.box(torch)
    .fwd(moves);
}
Drone.extend(hangtorch);
