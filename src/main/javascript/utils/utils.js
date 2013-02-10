/************************************************************************
Utilities Module
================
Miscellaneous utility functions and classes to help with programming.

 * locationToString(Location) - returns a bukkit Location object in string form.
  
 * getPlayerObject(playerName) - returns the Player object for a named
   player or `self` if no name is provided.

***/
var utils = utils || {
    locationToString: function(location){
        return JSON.stringify([""+location.world.name,location.x, location.y, location.z]);
    },

    getPlayerObject: function(playerName){
        if (typeof playerName == "undefined")
            return self;
        if (typeof playerName == "string")
            return org.bukkit.Bukkit.getPlayer(playerName);
        return player;
    }
};
