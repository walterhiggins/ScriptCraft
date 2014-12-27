'use strict';
/*global module,exports,require,Packages*/
var Facing = Packages.net.minecraft.util.EnumFacing;
var DoorHalf = Packages.net.minecraft.block.BlockDoor.EnumDoorHalf;
var HingePosition = Packages.net.minecraft.block.BlockDoor.EnumHingePosition;
var table = {
  facing: [  Facing.EAST, Facing.SOUTH, Facing.WEST, Facing.NORTH],
  half: {   upper: DoorHalf.UPPER, lower: DoorHalf.LOWER },
  hinge: { left: HingePosition.LEFT, right: HingePosition.RIGHT }
};

function property( block ){
  var result;
  result = {
    get: function(p){
      var bp = block.getPropertyForName(p);
      return block.getValue(bp);
    },
    set: function(name,value){
      var bp = block.getPropertyForName(name);
      if (bp === null){
	console.warn(block + ' has no property named ' + name);
	return result;
      }
      if (table[bp.name]){
	value = table[bp.name][value];
      }
      block.setPropertyValue(bp, value);
      return result;
    }
  };
  return result;
}
exports.property = property;
