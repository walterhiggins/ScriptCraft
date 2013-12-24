var Drone = require('../drone').Drone;

/**
* Iterates over each cube in a cubic region. For each cube has a chance to callback your 
* function and provide a new drone to it.
*
* Parameters:
*  callback - any function that accepts a drone as its first argument
*  probability - chance to invoke your callback on each iteration
*  width - width of the region
*  height - (Optional) height of the region, defaults to width
*  depth - (Optional) depth of the cube, defaults to width
*/

Drone.extend("rboxcall", function(callback, probability, width, height, depth) {
   this.chkpt('rboxcall-start');

   for(var i = 0; i < width; ++i) {
      this.move('rboxcall-start').right(i);
      for(var j = 0; j < depth; ++j) {
         this.move('rboxcall-start').right(i).fwd(j);
         for(var k = 0; k < height; ++k) {
            if(Math.random()*100 < probability) {
               callback.call(null, new Drone(this.x, this.y, this.z));
            }
            this.up();
         }
      }
   }

   this.move('rboxcall-start');

   return this;
});
