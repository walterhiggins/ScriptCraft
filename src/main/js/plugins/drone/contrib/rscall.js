var Drone = require('../drone').Drone;

/**
 * rscall(callback) will call the callback if a redstone event happens on a block at the location of the drone
 * rsremove will remove all callbacks added with rscall from the location of the drone
 *
 * (todo: should I be looking for block breaks at this location and removing callbacks?)
*/

var rsRemoveFuncs = {};

function locToStr(x,y,z) { return ""+x+","+y+","+z; }

Drone.extend("rscall", function( callback ) {
    var newCallback = function(x,y,z){
                    return function(event) { if (event.block.location.blockX == x &&
                                            event.block.location.blockY == y &&
                                            event.block.location.blockZ == z) callback(event); }}(this.x,this.y,this.z);
    var locStr = locToStr(this.x,this.y,this.z);
    if (!(locStr in rsRemoveFuncs)) {
        rsRemoveFuncs[locStr] = [];
    }
    rsRemoveFuncs[locStr].push(events.blockRedstone(newCallback));

  return this;
});

Drone.extend("rsremove", function( ) {
    var locStr = locToStr(this.x,this.y,this.z);
    var removeList = rsRemoveFuncs[locToStr(this.x, this.y, this.z)];
    if (removeList) {
        for (var i = 0; i < removeList.length; ++i) {
            removeList[i].unregister();
        }
    }

    return this;
});
