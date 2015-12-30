args = Array.prototype.slice.call(args,1);
// [0] = type, [1] = lib.jar [2] = blockX, [3] = classX
var out = java.lang.System.out,
  err = java.lang.System.err,
  entry = null;
var content = [
  '',
  '## Entities module',
  'The Entities module provides a suite of functions - one for each possible entity type.',
  '',
  '### Usage',
  '',
  '    entities.zombie(); // returns a canaryMod/Bukkit EntityType.ZOMBIE enum value',
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


  
