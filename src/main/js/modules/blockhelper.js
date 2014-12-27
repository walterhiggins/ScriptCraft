'use strict';
/*global module,exports,require,Packages*/
var Facing = Packages.net.minecraft.util.EnumFacing;
var DoorHalf = Packages.net.minecraft.block.BlockDoor.EnumDoorHalf;
var HingePosition = Packages.net.minecraft.block.BlockDoor.EnumHingePosition;
var DyeColor = Packages.net.minecraft.item.EnumDyeColor;
var table = {
  facing: [  Facing.EAST, Facing.SOUTH, Facing.WEST, Facing.NORTH],
  half: {   upper: DoorHalf.UPPER, lower: DoorHalf.LOWER },
  hinge: { left: HingePosition.LEFT, right: HingePosition.RIGHT },
  color: { 
    black: DyeColor.BLACK, 
    blue: DyeColor.BLUE, 
    brown: DyeColor.BROWN,
    cyan: DyeColor.CYAN, 
    gray: DyeColor.GRAY, 
    green: DyeColor.GREEN,
    lightblue: DyeColor.LIGHT_BLUE, 
    lime: DyeColor.LIME, 
    magenta: DyeColor.MAGENTA,
    orange: DyeColor.ORANGE, 
    pink: DyeColor.PINK, 
    purple: DyeColor.PURPLE,
    red: DyeColor.RED, 
    silver: DyeColor.SILVER, 
    white: DyeColor.WHITE,
    yellow: DyeColor.YELLOW,
    0: DyeColor.WHITE,
    1: DyeColor.ORANGE, 
    2: DyeColor.MAGENTA,
    3: DyeColor.LIGHT_BLUE, 
    4: DyeColor.YELLOW,
    5: DyeColor.LIME, 
    6: DyeColor.PINK, 
    7: DyeColor.GRAY, 
    8: DyeColor.SILVER, 
    9: DyeColor.CYAN, 
    10: DyeColor.PURPLE,
    11: DyeColor.BLUE,
    12: DyeColor.BROWN,
    13: DyeColor.GREEN,
    14: DyeColor.RED, 
    15: DyeColor.BLACK
  }
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
