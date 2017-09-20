/*************************************************************************
## Sounds Module

This module is a simple wrapper around the Bukkit Sound class and provides
a simpler way to play sounds. All of the org.bukkit.Sound Enum values are attached.

### Usage (Bukkit) :

    var sounds = require('sounds');
    sounds.play( bukkit.sound.VILLAGER_NO , self, 1, 0); // plays VILLAGER_NO sound at full volume and medium pitch
    sounds.play( bukkit.sound.VILLAGER_NO , self );       // same as previous statement

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
if (__plugin.canary) { 
  module.exports = require('./canary/sounds');
} else {
  module.exports = require('./bukkit/sounds');
}
