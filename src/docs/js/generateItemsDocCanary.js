'use strict';
/*global cmItemTypeClass*/
var out = java.lang.System.out;
var content = [
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
for (i = 0; i < materials.length; i++) {
  if (materials[i].type != cmItemTypeClass) {
    continue;
  }
  var materialField = materials[i];
  name = ('' + materialField.name).replace(/^(.)/, function(a) {
    return a.toLowerCase();
  });
  enumVals.push(' * ' + name + '()');
}
enumVals.sort();
content = content.concat(enumVals);
content.push('');
for (i = 0; i < content.length; i++) {
  out.println(content[i]);
}
