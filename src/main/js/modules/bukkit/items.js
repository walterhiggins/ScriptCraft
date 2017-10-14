/*global require, module, Packages */
var bkItemStack = Packages.org.bukkit.inventory.ItemStack;
var bkMaterial = Packages.org.bukkit.Material;
var items = function( material, amount ) {
  material = material.toUpperCase();
  return new bkItemStack(bkMaterial[material],amount);
};

var materials = bkMaterial.values();

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
