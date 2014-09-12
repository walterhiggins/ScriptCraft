/************************************************************************

### bukkit

The bukkit global variable provides short names for commonly used Bukkit
Java classes and Enums. It also provides some helper functions for getting
players, player names and worlds.

#### bukkit.stat and bukkit.stats

This is a short name for the [org.bukkit.Statistic](http://jd.bukkit.org/rb/apidocs/org/bukkit/Statistic.html) Enum. 

##### Usage

    var jumpStat = bukkit.stat.JUMP; // var jumpStat = org.bukkit.Statistic.JUMP

#### bukkit.material

This is a short name for the [org.bukkit.Material](http://jd.bukkit.org/rb/apidocs/org/bukkit/Material.html) Enum. 

##### Usage
    
    var apple = bukkit.material.APPLE;

#### bukkit.art

This is a short name for the [org.bukkit.Art](http://jd.bukkit.org/rb/apidocs/org/bukkit/Art.html) Enum. 

##### Usage
    
    var sunsetArt = bukkit.art.SUNSET;

#### bukkit.mode

This is a short name for the [org.bukkit.GameMode](http://jd.bukkit.org/rb/apidocs/org/bukkit/GameMode.html) Enum. 

##### Usage
    
    var creative = bukkit.mode.CREATIVE;

#### bukkit.sound

This is a short name for the [org.bukkit.Sound](http://jd.bukkit.org/rb/apidocs/org/bukkit/Sound.html) Enum. 

##### Usage
    
    var oink = bukkit.sound.PIG_IDLE;

#### bukkit.players() function

This function returns a javascript array of all online players on the server.

#### bukkit.playerNames() function

This function returns a javascript array of player names (as javascript strings)

#### bukkit.worlds() function

This function returns a javascript array of all worlds on the server.

***/
var bukkit = {
  stat: org.bukkit.Statistic,
  stats: org.bukkit.Statistic,
  material: org.bukkit.Material,
  art: org.bukkit.Art,
  mode: org.bukkit.GameMode,
  sound: org.bukkit.Sound,
  players: function(){
    var result = [];
    for (var i = 0; i < server.onlinePlayers.length; i++){
      result.push(server.onlinePlayers[i]);
    }
    return result;
  },
  playerNames: function(){
    var result = [];
    for (var i = 0; i < server.onlinePlayers.length; i++){
      result.push(''+ server.onlinePlayers[i].name);
    }
    return result;
  },
  worlds: function(){
    var result = [];
    var lWorlds = server.worlds;
    for (var i = 0; i < lWorlds.size(); i++){
      result.push(lWorlds.get(i));
    }
    return result;
  }
};
module.exports = function( container ){
  container.bukkit = bukkit;
};
