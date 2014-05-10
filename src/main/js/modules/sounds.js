var bkSound = org.bukkit.Sound,
  bkLocation = org.bukkit.Location,
  i = 0,
  allSounds = bkSound.values(),
  len = allSounds.length,
  sound,
  soundName;

for ( ; i < len; i++ ) {
  sound = allSounds[i];
  soundName = '' + sound.name();
  exports[soundName] = sound;
}
/*************************************************************************
## Sounds Module

This module is a simple wrapper around the Bukkit Sound class and provides
a simpler way to play sounds. All of the org.bukkit.Sound Enum values are attached.

### Usage:

    var sounds = require('sounds');
    sounds.play( self, sounds.VILLAGER_NO , 1, 0); // plays VILLAGER_NO sound at full volume and medium pitch
    sounds.play( self, sounds.VILLAGER_NO );       // same as previous statement

The play() function takes either a Location object or any object which has a location.
The volume parameter is in the range 0 to 1 and the pitch parameter is in the range 0 to 4.    
***/
exports.play = function(locationOrHasLocation, sound, volume, pitch) {
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
  if (!location)
    return;
  if (!volume)
    volume = 1;
  if (!pitch)
    pitch = 0;
  location.world.playSound(location, sound, volume, pitch);
};
