var bkSound = org.bukkit.Sound,
  bkLocation = org.bukkit.Location,
  i = 0,
  foreach = require('utils').foreach,
  allSounds = bkSound.values(),
  len = allSounds.length,
  sound,
  soundName;

for ( ; i < len; i++ ) {
  sound = allSounds[i];
  soundName = '' + sound.name();
  var methodName = soundName.toLowerCase().replace(/_(.)/g,function(a,b){ return b.toUpperCase();});
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
	default:
	}
    };
  })(sound);
}
/*************************************************************************
## Sounds Module

This module is a simple wrapper around the Bukkit Sound class and provides
a simpler way to play sounds. All of the org.bukkit.Sound Enum values are attached.

### Usage:

    var sounds = require('sounds');
    sounds.play( org.bukkit.Sound.VILLAGER_NO , self, 1, 0); // plays VILLAGER_NO sound at full volume and medium pitch
    sounds.play( org.bukkit.Sound.VILLAGER_NO , self );       // same as previous statement

The play() function takes either a Location object or any object which has a location.
The volume parameter is in the range 0 to 1 and the pitch parameter is in the range 0 to 4.    

In addition, a play function is provided for each possible sound using the following rules:

1. The sound is converted from ALL_CAPS_UNDERSCORE to camelCase so for example there is a sounds.villagerNo() function which will play the VILLAGER_NO sound.
2. Each such function can take 3 parameters: location (which can be either an actual Location object or an object which has a location), volume and pitch
3. Or... each such function can be called without parameters meaning the sound will be played for all online players to hear.

    sounds.villagerNo(self, 1, 0); // plays VILLAGER_NO sound at full volume and medium pitch at invoker's location

    sounds.villagerNo(); // plays VILLAGER_NO sound for all players online.

These methods are provided for convenience to help beginners explore sounds using TAB completion.
***/
exports.play = function(sound, locationOrHasLocation,  volume, pitch) {
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
};
