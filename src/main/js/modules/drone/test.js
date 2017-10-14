'use strict';
/*global module*/
function testHorizontalStrokeWidth(){
  this.arc({
    blockType: 42,
    meta: 0,
    radius: 8,
    orientation: 'horizontal',
    strokeWidth: 3,
    quadrants: {topright:true,topleft:true,bottomleft:true,bottomright:true}
  });
}
function testVerticalStrokeWidth(){
  this.arc({
    blockType: 42,
    meta: 0,
    radius: 8,
    orientation: 'vertical',
    strokeWidth: 3,
    quadrants: {topright:true,topleft:true,bottomleft:true,bottomright:true}
  });
}
module.exports = function(Drone){
  Drone.prototype.testHorizontalStrokeWidth = testHorizontalStrokeWidth;
  Drone.prototype.testVerticalStrokeWidth = testVerticalStrokeWidth;
};
