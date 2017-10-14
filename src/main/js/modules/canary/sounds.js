var allSounds = Packages.net.canarymod.api.world.effects.SoundEffect.Type.values(),
  cmSoundEffect = Packages.net.canarymod.api.world.effects.SoundEffect,
  foreach = require('utils').foreach,
  i = 0,
  len = allSounds.length,
  sound, 
  soundName;

function playSound(sound, locationOrHasLocation, volume, pitch ) {
  var location = null;
  if (!locationOrHasLocation)
    return;
  if (locationOrHasLocation.world){
    location = locationOrHasLocation;
  } else {
    locationOrHasLocation = locationOrHasLocation.location;
    if (locationOrHasLocation && locationOrHasLocation.world ){
      location = locationOrHasLocation;
    }
  }
  if (!location){
    console.warn('sounds.play() needs a location');
    return;
  }
  if (typeof volume == 'undefined')
    volume = 1;
  if (typeof pitch == 'undefined')
    pitch = 1;
  var soundEffect = new cmSoundEffect(sound, location.x, location.y, location.z, volume, pitch);
  location.world.playSound(soundEffect);
}

for ( ; i < len; i++ ) {
  sound = allSounds[i];
  soundName = '' + sound.name();
  var methodName = soundName.toLowerCase().replace(/_(.)/g,function(a,b){ return b.toUpperCase();});
  exports[methodName] = (function(sound){ 
    return function()
    {
      switch (arguments.length) { 
      case 3:
        playSound(sound, arguments[0], arguments[1], arguments[2]);
        break;
      case 2:
        // TODO: possible combinations: 
        // location, volume, 
        // volume pitch
        playSound(sound, arguments[0],arguments[1]);
        break;
      case 1:
        playSound(sound, arguments[0]);
        break;
      case 0:
        // play the sound at full vol, medium pitch for all players
        //
        foreach( server.playerList, function(player) {
          playSound(sound, player, 1, 0);
        });
      default:
      }
    };
  })(sound);
}

exports.play = playSound;
