var out = java.lang.System.out;
var content = [
  '',
  '## Sounds module (CanaryMod version)',
  '',
  'This module provides a simple way to play sounds.',
  '',
  '### Usage',
  '',
  '    var sounds = require("sounds");',
  '    // plays WOLF_HOWL sound at full volume and medium pitch',
  '    sounds.play( Packages.net.canarymod.api.world.effects.SoundEffect.Type.WOLF_HOWL, self, 1, 0); ',
  '    // same as previous statement',
  '    sounds.play( Packages.net.canarymod.api.world.effects.SoundEffect.Type.WOLF_HOWL, self );',
  '',
  'The play() function takes as parameters:',
  '',
  ' * A Sound value (see https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/api/world/effects/SoundEffect.Type.html for a list of possible values)',
  ' * A Location orbject or any object which has a location',
  ' * The Volume parameter is in the range 0 to 1 (default: 1)',
  ' * The Pitch parameter is in the range 0 to 4 (default: 0)',
  '',
  'In addition, the Sounds module provides a suite of helper functions - one for each possible sound. ',
  '',
  '    var sounds = require("sounds");',
  '    // same as previous examples',
  '    sounds.wolfHowl( self );',
  '',
  'Each of the following functions takes as parameters:',
  '',
  ' * A Location orbject or any object which has a location',
  ' * The Volume parameter is in the range 0 to 1 (default: 1)',
  ' * The Pitch parameter is in the range 0 to 4 (default: 0)',
  '',
  'The following functions are provided for convenience and to help beginners explore sounds using TAB completion:',
  ''
];

var enumVals = [],
  i,
  sound,
  soundName,
  sounds;
sounds = Packages.net.canarymod.api.world.effects.SoundEffect.Type.values();
for (i = 0; i < sounds.length; i++) {
  sound = sounds[i];
  soundName = '' + sound.name();
  methodName = ('' + soundName).toLowerCase().replace(/_(.)/g, function(a, b) {
    return b.toUpperCase();
  });
  enumVals.push(' * ' + methodName + '()');
}
enumVals.sort();
content = content.concat(enumVals);
content.push('');
for (i = 0; i < content.length; i++) {
  out.println(content[i]);
}
