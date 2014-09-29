var bkItemStack = org.bukkit.inventory.ItemStack;

var items = function( material, amount ) {
  material = material.toUpperCase();
  return new bkItemStack(bukkit.material[material],amount);
};

var materials = bukkit.material.values();

for (var i = 0;i < materials.length; i++ ){
  var name = (''+materials[i].name()).toLowerCase();
  name = name.replace(/(_.)/g,function(a){ return a.replace(/_/,'').toUpperCase(); });
  
  items[name] = (function(material){
    return function(amount){
      if (typeof amount == 'undefined'){
	return material;
      }
      if (typeof amount == 'number'){
	return new bkItemStack(material, amount);
      } else {
	return amount == material;
      }
    };
  })(materials[i]);
}

module.exports = items;
