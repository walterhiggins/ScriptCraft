args = Array.prototype.slice.call(args,1);
// [0] = type, [1] = lib.jar [2] = blockX, [3] = classX
var out = java.lang.System.out,
  err = java.lang.System.err,
  entry = null;
var content = [
  '',
  '## Items module (SpigotMC version)',
  'The Items module provides a suite of functions - one for each possible item.',
  'See https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html for a list of possible items',
  '',
  '### Usage',
  '',
  '    items.book(); // returns org.bukkit.Material.BOOK',
  '    items.book(2); // returns a new org.bukkit.Material object with an amount 2 (2 books)',
  '    items.book( itemType ); // compares itemType parameter to org.bukkit.Material.BOOK or an Item of type book',
  '',
  'The following functions are provided:',
  ''
];

var enumVals = [], t, i, name;
var types = org.bukkit.Material.values();
for (t in types) {
  if (types[t] && types[t].ordinal) {
    name = ('' + types[t].name()).toLowerCase();
    name = name.replace(/(_.)/g,function(a){ return a.replace(/_/,'').toUpperCase(); });
    enumVals.push(' * ' + name + '()');
  }
}
enumVals.sort();
content = content.concat(enumVals);
content.push('');
for (i = 0; i< content.length; i++){
  out.println(content[i]);
}

content = [
  '',
  '## Items module (CanaryMod version)',
  'The Items module provides a suite of functions - one for each possible item.',
  'See https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/api/inventory/ItemType.html for a list of possible items',
  '',
  '### Usage',
  '',
  '    items.book(); // returns net.canarymod.api.inventory.ItemType.Book',
  '    items.book(2); // returns a new net.canarymod.api.inventory.Item object with an amount 2 (2 books)',
  '    items.book( itemType ); // compares itemType parameter to ItemType.Book or an Item of type book',
  '',
  'The following functions are provided:',
  ''
];

//var ItemType = java.lang.Class.forName('net.canarymod.api.inventory.ItemType');
var materials = cmItemTypeClass.getDeclaredFields();

enumVals = [];
for ( i = 0;i < materials.length; i++ ){

  if (materials[i].type != cmItemTypeClass) {
    continue;
  }
  var materialField = materials[i];
  name = (''+materialField.name).replace(/^(.)/,function(a){ 
    return a.toLowerCase() ;
  });
  enumVals.push(' * ' + name + '()');
}
enumVals.sort();
content = content.concat(enumVals);
content.push('');
for (var i = 0; i< content.length; i++){
  out.println(content[i]);
}


  
