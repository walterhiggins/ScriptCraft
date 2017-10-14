'use strict';
if (__plugin.bukkit){
  var bkBukkit = org.bukkit.Bukkit,
    bkLocation = org.bukkit.Location,
    bkBlockCommandSender = org.bukkit.command.BlockCommandSender;
}
if (__plugin.canary){
  var Canary = Packages.net.canarymod.Canary;
}
/************************************************************************
## Utilities Module

The `utils` module is a storehouse for various useful utility
functions which can be used by plugin and module authors. It contains
miscellaneous utility functions and classes to help with programming.

### utils.player() function

The utils.player() function will return a [Player][cmpl] object
with the given name. This function takes a single parameter
`playerName` which can be either a String or a [Player][cmpl] object -
if it's a Player object, then the same object is returned. If it's a
String, then it tries to find the player with that name.

#### Parameters

 * playerName : A String or Player object. If no parameter is provided
   then player() will try to return the `self` variable . It is 
   strongly recommended to provide a parameter.

#### Example

```javascript
var utils = require('utils');
var name = 'walterh';
var player = utils.player(name);
if ( player ) {
  echo(player, 'Got ' + name);
} else {
  console.log('No player named ' + name);
}
```

[bkpl]: http://jd.bukkit.org/dev/apidocs/org/bukkit/entity/Player.html
[cmpl]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/api/entity/living/humanoid/Player.html
[cmloc]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/api/world/position/Location.html 
[bkloc]: http://jd.bukkit.org/dev/apidocs/org/bukkit/Location.html

***/
function _player( playerName ) {
  if ( typeof playerName == 'undefined' ) {
    if ( typeof self == 'undefined' ) {
      return null;
    } else { 
      return self;
    }
  } else {
    if ( typeof playerName == 'string' )
      if (__plugin.canary) {
        return Canary.server.getPlayer( playerName );
      } else { 
        return bkBukkit.getPlayer( playerName );
      }
    else
      return playerName; // assumes it's a player object
  }
}
/*************************************************************************
### utils.world( worldName ) function

Returns a World object matching the given name

***/
function _world( worldName ){
  if (__plugin.canary){
    if (worldName instanceof Packages.net.canarymod.api.world.World){
      return worldName;
    }
    var worldMgr = Canary.server.worldManager;
    try { 
      if (worldName === undefined){
        var worldNames = worldMgr.getLoadedWorldsNames();
        worldName = worldNames[0];
      }
      return worldMgr.getWorld( worldName, true );
    } catch (error) {
      console.error( 'utils.world() failed to load ' + worldName + ',Error:' + error );
    }
  }
  if (__plugin.bukkit){
    if (worldName instanceof org.bukkit.World){
      return worldName;
    }
    if (worldName === undefined){
      return bkBukkit.getWorlds().get(0);
    }
    return bkBukkit.getWorld( worldName );
  }
  return null;
}
exports.world = _world;

/*************************************************************************
### utils.blockAt( Location ) function

Returns the Block at the given location.

***/
function _blockAt( location ){
  if (__plugin.canary){
    return location.world.getBlockAt(location);
  }
  if (__plugin.bukkit){
    return location.block;
  }
  return null;
}
exports.blockAt = _blockAt;
/*************************************************************************
### utils.locationToJSON() function

utils.locationToJSON() returns a [Location][cmloc] object in JSON form...

    { world: 'world5',
      x: 56.9324,
      y: 103.9954,
      z: 43.1323,
      yaw: 0.0,
      pitch: 0.0
    }

This can be useful if you write a plugin that needs to store location data since bukkit's Location object is a Java object which cannot be serialized to JSON by default.

#### Parameters
 
 * location: An object of type [Location][cmloc]

#### Returns

A JSON object in the above form.
 
***/
function _locationToJSON( location ) {
  var yaw = __plugin.bukkit ? location.yaw : (__plugin.canary ? location.rotation : 0);
  return { 
    world: ''+location.world.name, 
    x: location.x, 
    y: location.y, 
    z: location.z, 
    yaw: yaw,
    pitch: location.pitch
  };
}
/*************************************************************************
### utils.locationToString() function

The utils.locationToString() function returns a
[Location][cmloc] object in string form...

    '{"world":"world5",x:56.9324,y:103.9954,z:43.1323,yaw:0.0,pitch:0.0}'

... which can be useful if you write a plugin which uses Locations as
keys in a lookup table.

#### Example

```javascript    
var utils = require('utils');
...
var key = utils.locationToString(player.location);
lookupTable[key] = player.name;
```

***/
exports.locationToString = function locationToString( location ) {
  return JSON.stringify( _locationToJSON( location ) );
};
exports.locationToJSON = _locationToJSON;

/*************************************************************************
### utils.locationFromJSON() function

This function reconstructs an [Location][cmloc] object from
a JSON representation. This is the counterpart to the
`locationToJSON()` function. It takes a JSON object of the form
returned by locationToJSON() and reconstructs and returns a bukkit
Location object.

***/
exports.locationFromJSON = function locationFromJSON( json ) {
  var world;
  if ( json.constructor == Array ) { 
    // for support of legacy format
    world = _world( json[0] );
    return new bkLocation( world, json[1], json[2] , json[3] );
  } else {
    if (__plugin.canary){
      world = _world( json.world );
      var cmLocation = Packages.net.canarymod.api.world.position.Location;
      return new cmLocation(world, json.x, json.y, json.z, json.pitch?json.pitch:0, json.yaw?json.yaw:0);
    } else {
      world = _world( json.world );
      return new bkLocation( world, json.x, json.y , json.z, json.yaw?json.yaw:0, json.pitch?json.pitch:0 );
    }
  }
};

exports.player = _player;

exports.getPlayerObject = function getPlayerObject( player ) {
  console.warn( 'utils.getPlayerObject() is deprecated. Use utils.player() instead.' );
  return _player(player);
};
/*************************************************************************
### utils.getPlayerPos() function

This function returns the player's [Location][cmloc] (x, y, z, pitch
and yaw) for a named player.  If the "player" is in fact a
[BlockCommand][bkbcs] then the attached Block's location is returned.

#### Parameters

 * player : A [org.bukkit.command.CommandSender][bkbcs] (Player or BlockCommandSender) or player name (String).

#### Returns

A [Location][cmloc] object.

[bkbcs]: http://jd.bukkit.org/dev/apidocs/org/bukkit/command/BlockCommandSender.html
[bksndr]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/command/CommandSender.html
***/
function getPlayerPos( player ){
  player = _player( player );
  if ( player ) {
    if (__plugin.bukkit){
      if ( player instanceof bkBlockCommandSender )
        return player.block.location;
      else
        return player.location;
    }
    if (__plugin.canary){
      if ( player instanceof Packages.net.canarymod.api.world.blocks.CommandBlock)
        return player.block.location;
      else
        return player.location;
    }
  } 
  return null;
}
exports.getPlayerPos = getPlayerPos;
/************************************************************************
### utils.getMousePos() function

This function returns a [Location][cmloc] object (the
x,y,z) of the current block being targeted by the named player. This
is the location of the block the player is looking at (targeting).

#### Parameters

 * player : The player whose targeted location you wish to get.

#### Example

The following code will strike lightning at the location the player is looking at...

```javascript
var utils = require('utils');
var playerName = 'walterh';
var targetPos = utils.getMousePos(playerName);
if (targetPos){
  if (__plugin.canary){
    targetPos.world.makeLightningBolt(targetPos);
  }  
  if (__plugin.bukkit){ 
    targetPos.world.strikeLightning(targetPos);
  }
}
```

***/
exports.getMousePos = function getMousePos( player ) {
  
  player = _player(player);
  if ( !player ) {
    return null;
  }
  var targetedBlock ;
  if ( __plugin.canary ) {
    var cmLineTracer = Packages.net.canarymod.LineTracer;
    var lineTracer = new cmLineTracer(player);
    targetedBlock = lineTracer.getTargetBlock();
    if (targetedBlock == null){
      return null;
    }
  } else { 
    // player might be CONSOLE or a CommandBlock
    if ( !player.getTargetBlock ) {
      return null;
    }
    try {
      targetedBlock = player.getTargetBlock( null, 5 );
    }catch (e){
      // spigot 1.8.7 adds new overload which causes problems with JDK 7
      targetedBlock = player['getTargetBlock(java.util.Set,int)'](null, 5 );
    }
    if ( targetedBlock == null || targetedBlock.isEmpty() ) {
      return null;
    }
  }
  return targetedBlock.location;
};
/************************************************************************
### utils.foreach() function

The utils.foreach() function is a utility function for iterating over
an array of objects (or a java.util.Collection of objects) and
processing each object in turn. Where utils.foreach() differs from
other similar functions found in javascript libraries, is that
utils.foreach can process the array immediately or can process it
*nicely* by processing one item at a time then delaying processing of
the next item for a given number of server ticks (there are 20 ticks
per second on the minecraft main thread).  This method relies on
Bukkit's [org.bukkit.scheduler][sched] package for scheduling
processing of arrays.

[sched]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scheduler/package-summary.html

#### Parameters

 * array : The array to be processed - It can be a javascript array, a java array or java.util.Collection
 * callback : The function to be called to process each item in the
   array. The callback function should have the following signature
   `callback(item, index, object, array)`. That is the callback will
   be called with the following parameters....

   - item : The item in the array
   - index : The index at which the item can be found in the array.
   - object : Additional (optional) information passed into the foreach method.
   - array : The entire array.

 * context (optional) : An object which may be used by the callback.
 * delayInMilliseconds (optional, numeric) : If a delay is specified then the processing will be scheduled so that
   each item will be processed in turn with a delay between the completion of each
   item and the start of the next. This is recommended for any CPU-intensive process.
 * onDone (optional, function) : A function to be executed when all processing 
   is complete. This parameter is only used when the processing is delayed. (It's optional even if a 
   delay parameter is supplied).

If called with a delay parameter then foreach() will return
immediately after processing just the first item in the array (all
subsequent items are processed later). If your code relies on the
completion of the array processing, then provide an `onDone` parameter
and put the code there.

#### Example

The following example illustrates how to use foreach for immediate processing of an array...

```javascript
var utils = require('utils');
var players = utils.players();
utils.foreach (players, function( player ) { 
  echo( player , 'Hi ' + player);
});
```

... The `utils.foreach()` function can work with Arrays or any
Java-style collection. This is important because many objects in the
CanaryMod and Bukkit APIs use Java-style collections.
***/
function _foreach( array, callback, context, delay, onCompletion ) {
  if ( array instanceof java.util.Collection ) {
    array = array.toArray();
  }
  var i = 0;
  var len = array.length;
  function next() { 
    callback(array[i], i, context, array); 
    i++;
  }
  function hasNext() {
    return i < len;
  }
  if ( delay ) {
    _nicely( next, hasNext, onCompletion, delay );
  } else {
    for ( ;i < len; i++ ) {
      callback( array[i], i, context, array );
    }
  }
}
exports.foreach = _foreach;
/************************************************************************
### utils.nicely() function

The utils.nicely() function is for performing background processing. utils.nicely() lets you
process with a specified delay between the completion of each `next()`
function and the start of the next `next()` function.
`utils.nicely()` is a recursive function - that is - it calls itself
(schedules itself actually) repeatedly until `hasNext` returns false.

#### Parameters

 * next : A function which will be called if processing is to be done. 
 * hasNext : A function which is called to determine if the `next`
   callback should be invoked. This should return a boolean value -
   true if the `next` function should be called (processing is not
   complete), false otherwise.
 * onDone : A function which is to be called when all processing is complete (hasNext returned false).
 * delayInMilliseconds : The delay between each call.

#### Example

See the source code to utils.foreach for an example of how utils.nicely is used.

***/
function _nicely( next, hasNext, onDone, delay ) {
  if ( hasNext() ){
    next();
    setTimeout( function() {
      _nicely( next, hasNext, onDone, delay );
    }, delay );
  }else{
    if ( onDone ) {
      onDone();
    }
  }
}
exports.nicely = _nicely;

function _at( time24hr, callback, pWorlds, repeat ) {
  console.warn('utils.at() is deprecated, use require(\'at\') instead');
  var at = require('at');
  return at( time24hr, callback, pWorlds, repeat);
}
exports.at = _at;
/*************************************************************************
### utils.time( world ) function

Returns the timeofday (in minecraft ticks) for the given world. This function is necessary because
canarymod and bukkit differ in how the timeofday is calculated. 

See http://minecraft.gamepedia.com/Day-night_cycle#Conversions

***/
function getTime(world){
  world = _world(world);

  if (__plugin.bukkit){
    return world.time;
  }
  if (__plugin.canary){
    // there's a bug in canary where if you call world.setTime() the world.totalTime 
    // becomes huge.
    if (world.totalTime < world.rawTime){
      return world.totalTime;
    } else { 
      return ((world.totalTime % world.rawTime) + world.relativeTime) % 24000;
    }
  }
  return 0;
}
exports.time = getTime;

/*************************************************************************
### utils.time24( world ) function

Returns the timeofday for the given world using 24 hour notation. (number of minutes)

See http://minecraft.gamepedia.com/Day-night_cycle#Conversions

#### Parameters

 * world : the name of the world or world object for which you want to get time

***/
function getTime24( world ){
  world = _world(world); // accept world name or object or undeifned
  var mcTime = getTime(world);
  var mins = Math.floor( ( (mcTime + 6000) % 24000) / 16.6667 );
  return mins;
}
exports.time24 = getTime24;

/************************************************************************
### utils.find() function

The utils.find() function will return a list of all files starting at
a given directory and recursiving trawling all sub-directories.

#### Parameters

 * dir : The starting path. Must be a string.
 * filter : (optional) A [FilenameFilter][fnfltr] object to return only files matching a given pattern.

[fnfltr]: http://docs.oracle.com/javase/6/docs/api/java/io/FilenameFilter.html

#### Example

```javascript
var utils = require('utils');
var jsFiles = utils.find('./', function(dir,name){
    return name.match(/\.js$/);
});  
```
***/
exports.find = function( path, filter){
  console.warn('utils.find() is deprecated, use require(\'find\') instead');
  return require('find')(path, filter);
};
/************************************************************************
### utils.serverAddress() function

The utils.serverAddress() function returns the IP(v4) address of the server.

```javascript
var utils = require('utils');
var serverAddress = utils.serverAddress();
console.log(serverAddress);
```
***/
exports.serverAddress = function serverAddress() {
  var interfaces = java.net.NetworkInterface.getNetworkInterfaces();
  var current,
    addresses,
    current_addr;
  while ( interfaces.hasMoreElements() ) {
    current = interfaces.nextElement();
    if ( ! current.isUp() || current.isLoopback() || current.isVirtual() ) {
      continue;
    }
    addresses = current.getInetAddresses();
    while (addresses.hasMoreElements()) {
      current_addr = addresses.nextElement();
      if ( current_addr.isLoopbackAddress() ) 
        continue;
      if ( current_addr instanceof java.net.Inet4Address)
        return current_addr.getHostAddress();
    }
  }  
  return null;
};
/**************************************************************************
### utils.array() function

Converts Java collection objects to type Javascript array so they can avail of
all of Javascript's Array goodness.
 
#### Example

    var utils = require('utils');
    var worlds = utils.array(server.worldManager.getAllWorlds());
    
***/
function toArray( ){
  var result = [],
    javaArray = null,
    i = 0;
  if (arguments[0] instanceof java.util.Collection){
    // it's a java collection
    javaArray = arguments[0].toArray();
    for ( ;i < javaArray.length; i++) {
      result.push(javaArray[i]);
    }
  } else if (arguments[0].constructor === Array){
    // it's a javascript array
    return arguments[0];
  } else if (arguments[0].length) {
    // it's a java array
    javaArray = arguments[0];
    for ( ;i < javaArray.length; i++) {
      result.push(javaArray[i]);
    }
  }
  return result;
}
exports.array = toArray;

function worlds(){
  if (__plugin.canary){
    return toArray(server.worldManager.allWorlds);
  }
  if (__plugin.bukkit){
    return toArray(server.worlds);
  }
}
exports.worlds = worlds;

/*************************************************************************
### utils.players() function

This function returns a javascript array of all online players on the
server.  You can optionally provide a function which will be invoked
with each player as a parameter.  For example, to give each player the
ability to shoot arrows which launch fireworks:

```javascript
require('utils').players( arrows.firework )
```

Any players with a bow will be able to launch fireworks by shooting.

### utils.playerNames() function

This function returns a javascript array of player names (as javascript strings)

***/
function getPlayersBukkit(){
  var result = [];
  var players = server.getOnlinePlayers();
  for (var i = 0; i < players.size(); i++){
    result.push(players.get(i));
  }
  return result;
}
function getPlayersCanary(){
  var result = [];
  var players = server.playerList;
  for (var i = 0; i < players.size(); i++){
    result.push(players.get(i));
  }
  return result;
}
var getPlayers = null;
if (__plugin.canary) {
  getPlayers = getPlayersCanary;
} else {
  getPlayers = getPlayersBukkit;
}

function getStatBukkit(){
  var stat, player;
  if (arguments.length == 1){
    stat = arguments[1];
    return org.bukkit.Statistic[stat.toUpperCase()];
  } else {
    player = arguments[0];
    stat = arguments[1];
    return player.getStatistic(org.bukkit.Statistic[stat.toUpperCase()]);
  }
  
}
function getStatCanary(){
  var stat, player, cmStatistics = Packages.net.canarymod.api.statistics.Statistics;
  if (arguments.length == 1){
    stat = arguments[0];
    return cmStatistics[stat.toUpperCase()].instance;
  } else {
    player = arguments[0];
    stat = arguments[1];
    return player.getStat(cmStatistics[stat.toUpperCase()].instance);
  }
}
if (__plugin.canary){
  var cmStatistics = Packages.net.canarymod.api.statistics.Statistics;
  var values = cmStatistics.values();
  for (var i = 0;i < values.length; i++){
    var value = values[i];
    try { 
      var stat = value.instance;
      getStatCanary[value.name()] = stat;
    }catch (e){
      // as of 20141018 some calls to getInstance() will generate an NPE
      // see https://github.com/CanaryModTeam/CanaryMod/issues/84
    }
  }
}

function getPlayerNames(){
  return getPlayers().map(function(p){ return p.name; });
}
exports.players = function players(fn){
  var result = getPlayers();
  if (fn){
    result.forEach(fn);
  }
  return result;
};
exports.playerNames = getPlayerNames;

/*************************************************************************
### utils.stat() function

This function returns a numeric value for a given player statistic.

#### Parameters

 * Player - The player object (optional - if only the statistic name parameter is provided then the statistic object is returned)
 * Statistic - A string whose value should be one of the following (CanaryMod) 
   * ANIMALSBRED 
   * BOATONECM 
   * CLIMBONECM 
   * CROUCHONECM 
   * DAMAGEDEALT 
   * DAMAGETAKEN 
   * DEATHS 
   * DRIVEONECM 
   * DROP 
   * FALLONECM 
   * FISHCAUGHT 
   * FLYONECM 
   * HORSEONECM 
   * JUMP 
   * JUNKFISHED 
   * LEAVEGAME 
   * MINECARTONECM 
   * MOBKILLS 
   * PIGONECM 
   * PLAYERKILLS 
   * PLAYONEMINUTE 
   * SPRINTONECM 
   * SWIMONECM 
   * TALKEDTOVILLAGER 
   * TIMESINCEDEATH 
   * TRADEDWITHVILLAGER 
   * TREASUREFISHED 
   * WALKONECM 

See [CanaryMod's Statistic][cmstat] class for an up-to-date list of possible stat values

[cmstat]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/api/statistics/Statistics.html

#### Example 1 Getting stats for a player

    var utils = require('utils');
    var jumpCount = utils.stat( player, 'jump');

#### Example 2 Getting the JUMP statistic object (which can be used elsewhere)

    var utils = require('utils');
    var JUMPSTAT = utils.stat('jump');
    var jumpCount = player.getStat( JUMPSTAT ); // canary-specific code

This function also contains values for each possible stat so you can get at stats like this...

    var utils = require('utils');
    var JUMPSTAT = utils.stat.JUMP; // Accessing the value
    var jumpCount = player.getStat ( JUMPSTAT ); // canary-specific code
***/
exports.stat = __plugin.canary ? getStatCanary: getStatBukkit;

