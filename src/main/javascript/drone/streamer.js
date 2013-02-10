/**
* Creates a stream of blocks in a given direction until it hits something other than air
* 
* Parameters:
*  block - blockId
*  dir - "up", "down", "left", "right", "fwd", "back
*  maxIterations - (Optional) maximum number of cubes to generate, defaults to 1000
*/
Drone.extend("streamer", function(block, dir, maxIterations) {
   for(var i = 0; i < maxIterations||1000; ++i) {
      this.box(block);
      this[dir].call(this);
      if(getBlock(this.x, this.y, this.z) !== "0:0") {
         break;
      }
   }
   
   return this;
});
