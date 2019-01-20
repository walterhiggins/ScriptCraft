'use strict';
var out = java.lang.System.out;
var content = [
  '',
  '## Items module (SpigotMC version)',
  'The Items module provides a suite of functions - one for each possible item.',
  'See https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html for a list of possible items',
  '',
  '### Usage',
  '',
  '    items.book(); // returns org.bukkit.Material.BOOK',
  '    items.book(2); // returns a new org.bukkit.inventory.ItemStack object of 2 books',
  '    items.book( itemType ); // compares itemType parameter to org.bukkit.Material.BOOK or an Item of type book',
  '',
  'The following functions are provided:',
  ''
];

var enumVals = [],
  t,
  i,
  name;

var types = org.bukkit.Material.values();

for (t in types) {
  if (types[t] && types[t].ordinal) {
    name = ('' + types[t].name()).toLowerCase();
    name = name.replace(/(_.)/g, function(a) {
      return a.replace(/_/, '').toUpperCase();
    });
    enumVals.push(' * ' + name + '()');
  }
}
enumVals.sort();
content = content.concat(enumVals);
content.push('');
for (i = 0; i < content.length; i++) {
  out.println(content[i]);
}
