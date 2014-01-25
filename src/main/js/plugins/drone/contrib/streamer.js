var Drone = require('../drone').Drone;
/**
* Creates a stream of blocks in a given direction until it hits something other than air
* 
* Parameters:
*  block - blockId
*  dir - "up", "down", "left", "right", "fwd", "back
*  maxIterations - (Optional) maximum number of cubes to generate, defaults to 1000
*/
Drone.extend("streamer", function(block, dir, maxIterations) {
    if (typeof maxIterations == "undefined")
        maxIterations = 1000;
    
    var usage = "Usage: streamer({block-type}, {direction: 'up', 'down', 'fwd', 'back', 'left', 'right'}, {maximum-iterations: default 1000})\nE.g.\n" +
        "streamer(5, 'up', 200)";
    if (typeof dir == "undefined"){
        throw new Error(usage);
    }
    if (typeof block == "undefined") {
        throw new Error(usage);
    }
    for ( var i = 0; i < maxIterations||1000; ++i ) {
        this.box(block);
        this[dir].call(this);
        var block = this.world.getBlockAt(this.x, this.y, this.z);
        if ( block.typeId != 0 && block.data != 0) {
            break
        }
    }
    return this;
});
