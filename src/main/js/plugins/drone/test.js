var Drone = require('./drone').Drone;

Drone.prototype.testHorizontalStrokeWidth = function(){
    this.arc({
        blockType: 42,
        meta: 0,
        radius: 8,
        orientation: 'horizontal',
        strokeWidth: 3,
        quadrants: {topright:true,topleft:true,bottomleft:true,bottomright:true}
    });
};

Drone.prototype.testVerticalStrokeWidth = function(){
    this.arc({
        blockType: 42,
        meta: 0,
        radius: 8,
        orientation: 'vertical',
        strokeWidth: 3,
        quadrants: {topright:true,topleft:true,bottomleft:true,bottomright:true}
    });
};
