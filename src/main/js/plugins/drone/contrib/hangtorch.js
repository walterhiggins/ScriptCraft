var Drone = require('../drone').Drone;
var Material = org.bukkit.Material;
function canHang(material){
  if (material.equals(Material.AIR) ||
      material.equals(Material.VINE) ) {
    return true;
  } else { 
    return false;
  }
}  
Drone.extend('hangtorch', function () { 
  var torch = '50:' + Drone.PLAYER_TORCH_FACING[this.dir];
  var moves = 0;
  var block = this.world.getBlockAt(this.x, this.y, this.z);

  while ( !canHang(block.type) ){

    moves++;
    this.back();
    if (moves == 10){
      this.fwd(moves);
      console.log('no air to hang torch');
      return;
    }
    block = this.world.getBlockAt(this.x, this.y, this.z);
  }
  this.box(torch);
  this.fwd(moves);
});
