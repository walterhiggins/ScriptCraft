args = Array.prototype.slice.call(args,1);
// [0] = type, [1] = lib.jar [2] = blockX, [3] = classX
var out = java.lang.System.out,
  err = java.lang.System.err,
  entry = null;
var content = [
  '',
  '## Entities module',
  'The Entities module provides a suite of functions - one for each possible entity type. ',
  'It acts as a helper or enumerated module to assist in use with the `spawn` module and command. ',
  'This module is useful for TAB-completion at the in-game prompt. ',
  '',
  'When each function is called with no parameters, it will return the appropriate EntityType object. ',
  'For example `entities.polar_bear()` will return an `EntityType.POLAR_BEAR` object. ',
  '',
  'When each function is called with a single parameter - an entity - the entity\'s type will be compared and return true or false. ',
  '',
  '### Usage',
  '',
  '    entities.zombie(); // returns a SpigotMC/CanaryMod EntityType.ZOMBIE enum value',
  '    entities.zombie( mob ); // compares the entity\'s type to a zombie, returns true if mob type is zombie, false otherwise',
  '    entities.player( self ); // at the in-game prompt this should return true (compares self to a player entity type)',
  '    entities.rabbit( self ); // at the in-game prompt this should return false (compares self to a rabbit entity type)',
  '',
  'The following functions are provided:',
  ''
];

var enumVals = [], t, i, name;
var entitytypes = org.bukkit.entity.EntityType.values();
for (t in entitytypes) {
  if (entitytypes[t] && entitytypes[t].ordinal) {
    name = entitytypes[t].name();
    name = ('' + name).replace(/^(.*)/,function(a){ return a.toLowerCase(); });
    enumVals.push(' * ' + name + '()');
  }
}
enumVals.sort();
content = content.concat(enumVals);
content.push('');
for (i = 0; i< content.length; i++){
  out.println(content[i]);
}


  
