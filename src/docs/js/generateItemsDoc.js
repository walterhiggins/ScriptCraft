args = Array.prototype.slice.call(args,1);
// [0] = type, [1] = lib.jar [2] = blockX, [3] = classX
var out = java.lang.System.out,
  err = java.lang.System.err,
  entry = null;
var content = [
  '/*********************',
  '## Items module',
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
var materials = itemTypeClass.getDeclaredFields();

var enumVals = [];
for (var i = 0;i < materials.length; i++ ){

  if (materials[i].type != itemTypeClass) {
    continue;
  }
  var materialField = materials[i];
  var name = (''+materialField.name).replace(/^(.)/,function(a){ return a.toLowerCase() });
  enumVals.push(' * ' + name + '()');
}
enumVals.sort();
content = content.concat(enumVals);
content.push('');
content.push('***/');
for (var i = 0; i< content.length; i++){
  out.println(content[i]);
}


  
