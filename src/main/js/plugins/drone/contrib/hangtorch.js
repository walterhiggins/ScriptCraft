'use strict';
/*global require, __plugin, org*/
var Drone = require('drone'),
  blocks = require('blocks');
/************************************************************************
### Drone.hangtorch() method

Adds a hanging torch to a wall. This method will try to hang a torch
against a wall. It will traverse backwards until it finds a block
adjacent to air and hang the torch. If it can't find a block next to
air it will log a message in the server.

#### Example

At the in-game prompt you can create a hanging torch by looking at a
block and typing:

```javascript
/js hangtorch()
```

Alternatively you can create a new Drone object from a Player or
Location object and call the hangtorch() method.

```javascript
var d = new Drone(player);
d.hangtorch();
```

***/
function canHang( block ) {

  if (__plugin.bukkit){
    var bkMaterial = org.bukkit.Material;
    if ( block.type.equals(bkMaterial.AIR) ||
         block.type.equals(bkMaterial.VINE) ) {
      return true;
    } 
  }
  if (__plugin.canary){
    if (block.typeId == blocks.air || 
 block.typeId == blocks.vines ) {
      return true;
    }
  }
  return false;
}  
function hangtorch() { 
  var torch = blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[this.dir];
  var moves = 0;
  var block = this.getBlock();

  while ( !canHang(block) ){

    moves++;
    this.back();
    if (moves == 10){
      this
        .fwd(moves);
      console.log('nowhere to hang torch');
      return;
    }
    block = this.getBlock();
  }
  this
    .box(torch)
    .fwd(moves);
}
Drone.extend(hangtorch);
