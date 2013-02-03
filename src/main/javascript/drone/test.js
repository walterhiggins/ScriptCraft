load (__folder + "drone.js");

Drone.prototype.testStrokeWidth = function(){
    this.arc({
        blockType: 42,
        meta: 0,
        radius: 8,
        strokeWidth: 3,
        quadrants: {topright:true},
        world: this._getWorld()
    });
};
