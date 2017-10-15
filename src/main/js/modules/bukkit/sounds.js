var bkLocation = Packages.org.bukkit.Location,
  i = 0,
  foreach = require('utils').foreach,
  allSounds = Packages.org.bukkit.Sound.values(),
  len = allSounds.length,
  sound,
  soundName;

function play(sound, locationOrHasLocation,  volume, pitch) {
  var location = null;
  if (!locationOrHasLocation)
    return;
  if (locationOrHasLocation instanceof bkLocation){
    location = locationOrHasLocation;
  } else {
    locationOrHasLocation = locationOrHasLocation.location;
    if (locationOrHasLocation && locationOrHasLocation instanceof bkLocation ){
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
  location.world.playSound(location, sound, volume, pitch);
}

for ( ; i < len; i++ ) {
  sound = allSounds[i];
  soundName = '' + sound.name();
  var methodName = soundName.toLowerCase().replace(/_(.)/g,function(a,b){
    return b.toUpperCase();
  });
  exports[methodName] = (function(sound){ 
    return function()
    {
      switch (arguments.length) { 
      case 3:
        exports.play(sound, arguments[0], arguments[1], arguments[2]);
        break;
      case 2:
        // TODO: possible combinations: 
        // location, volume, 
        // volume pitch
        exports.play(sound, arguments[0],arguments[1]);
        break;
      case 1:
        exports.play(sound, arguments[0]);
        break;
      case 0:
        // play the sound at full vol, medium pitch for all players
        //
        foreach(server.onlinePlayers,function(player){
          exports.play(sound, player, 1, 0);
        });
        break;
      default:
      }
    };
  })(sound);
}
exports.play = play;
