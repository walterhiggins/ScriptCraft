'use strict';
/************************************************************************
## Utilities Module

The `utils` module is a storehouse for various useful utility
functions which can be used by plugin and module authors. It contains
miscellaneous utility functions and classes to help with programming.

### utils.player() function

The utils.player() function will return a [bukkit Player][bkpl] object
with the given name. This function takes a single parameter
`playerName` which can be either a String or a [Player][bkpl] object -
if it's a Player object, then the same object is returned. If it's a
String, then it tries to find the player with that name.

#### Parameters

 * playerName : A String or Player object. If no parameter is provided
   then player() will try to return the `self` variable . It is 
   strongly recommended to provide a parameter.

#### Example

    var utils = require('utils');
    var name = 'walterh';
    var player = utils.player(name);
    if (player) {
        player.sendMessage('Got ' + name);
    }else{
        console.log('No player named ' + name);
    }

[bkpl]: http://jd.bukkit.org/dev/apidocs/org/bukkit/entity/Player.html
[bkloc]: http://jd.bukkit.org/dev/apidocs/org/bukkit/Location.html

***/
var _player = function ( playerName ) {
    if (typeof playerName == 'undefined'){
        if (typeof self == 'undefined'){
            return null;
        } else { 
            return self;
        }
    } else {
        if (typeof playerName == 'string')
            return org.bukkit.Bukkit.getPlayer(playerName);
        else
            return playerName; // assumes it's a player object
    }
};
/*************************************************************************
### utils.locationToJSON() function

utils.locationToJSON() returns a [org.bukkit.Location][bkloc] object in JSON form...

    { world: 'world5',
      x: 56.9324,
      y: 103.9954,
      z: 43.1323,
      yaw: 0.0,
      pitch: 0.0
    }

This can be useful if you write a plugin that needs to store location data since bukkit's Location object is a Java object which cannot be serialized to JSON by default.

#### Parameters
 
 * location: An object of type [org.bukkit.Location][bkloc]

#### Returns

A JSON object in the above form.
 
***/
var _locationToJSON = function(location){
    return { 
        world: ''+location.world.name, 
        x: location.x, 
        y: location.y, 
        z: location.z, 
        yaw: location.yaw,
        pitch: location.pitch
    };
};
/*************************************************************************
### utils.locationToString() function

The utils.locationToString() function returns a
[org.bukkit.Location][bkloc] object in string form...

    '{"world":"world5",x:56.9324,y:103.9954,z:43.1323,yaw:0.0,pitch:0.0}'

... which can be useful if you write a plugin which uses Locations as
keys in a lookup table.

#### Example
    
    var utils = require('utils');
    ...
    var key = utils.locationToString(player.location);
    lookupTable[key] = player.name;

***/
exports.locationToString = function(location){
    return JSON.stringify(_locationToJSON(location));
};
exports.locationToJSON = _locationToJSON;

/*************************************************************************
### utils.locationFromJSON() function

This function reconstructs an [org.bukkit.Location][bkloc] object from
a JSON representation. This is the counterpart to the
`locationToJSON()` function. It takes a JSON object of the form
returned by locationToJSON() and reconstructs and returns a bukkit
Location object.

***/
exports.locationFromJSON = function(json){
    if (json.constuctor == Array){ 
        // for support of legacy format
        var world = org.bukkit.Bukkit.getWorld(json[0]);
        return new org.bukkit.Location(world, json[1], json[2] , json[3]);
    }else{
        var world = org.bukkit.Bukkit.getWorld(json.world);
        return new org.bukkit.Location(world, json.x, json.y , json.z, json.yaw, json.pitch);
    }
};

exports.player = _player;
exports.getPlayerObject = function(player){
    console.warn('utils.getPlayerObject() is deprecated. Use utils.player() instead.');
    return _player(player);
};
/*************************************************************************
### utils.getPlayerPos() function

This function returns the player's [Location][bkloc] (x, y, z, pitch
and yaw) for a named player.  If the "player" is in fact a
[org.bukkit.command.BlockCommandSender][bkbcs] then the attached
Block's location is returned.

#### Parameters

 * player : A [org.bukkit.command.CommandSender][bkbcs] (Player or BlockCommandSender) or player name (String).

#### Returns

An [org.bukkit.Location][bkloc] object.

[bkbcs]: http://jd.bukkit.org/dev/apidocs/org/bukkit/command/BlockCommandSender.html
[bksndr]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/command/CommandSender.html
***/
exports.getPlayerPos = function( player ) {
    player = _player(player);
    if (player){
        if (player instanceof org.bukkit.command.BlockCommandSender)
            return player.block.location;
        else
            return player.location;
    }
    else
        return null;
};
/************************************************************************
### utils.getMousePos() function

This function returns a [org.bukkit.Location][bkloc] object (the
x,y,z) of the current block being targeted by the named player. This
is the location of the block the player is looking at (targeting).

#### Parameters

 * player : The player whose targeted location you wish to get.

#### Example

The following code will strike lightning at the location the player is looking at...

    var utils = require('utils');
    var playerName = 'walterh';
    var targetPos = utils.getMousePos(playerName);
    if (targetPos){
       targetPos.world.strikeLightning(targetPos);
    }

***/
exports.getMousePos = function (player) {
    
    player = _player(player);
    if (!player)
        return null;
    // player might be CONSOLE or a CommandBlock
    if (!player.getTargetBlock)
        return null;
    var targetedBlock = player.getTargetBlock(null,5);
    if (targetedBlock == null || targetedBlock.isEmpty()){
        return null;
    }
    return targetedBlock.location;
};
/************************************************************************
### utils.foreach() function

The utils.foreach() function is a utility function for iterating over
an array of objects (or a java.util.Collection of objects) and processing each object in turn. Where
utils.foreach() differs from other similar functions found in
javascript libraries, is that utils.foreach can process the array
immediately or can process it *nicely* by processing one item at a
time then delaying processing of the next item for a given number of
server ticks (there are 20 ticks per second on the minecraft main
thread).  This method relies on Bukkit's [org.bukkit.scheduler][sched]
package for scheduling processing of arrays.

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

 * object (optional) : An object which may be used by the callback.
 * delay (optional, numeric) : If a delay is specified (in ticks - 20
   ticks = 1 second), then the processing will be scheduled so that
   each item will be processed in turn with a delay between the completion of each
   item and the start of the next. This is recommended for big builds (say 200 x 200 x 200
   blocks) or any CPU-intensive process.
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

    var utils = require('utils');
    var players = ['moe', 'larry', 'curly'];
    utils.foreach (players, function(item){ 
        server.getPlayer(item).sendMessage('Hi ' + item);
    });

... The `utils.foreach()` function can work with Arrays or any Java-style collection. This is important
because many objects in the Bukkit API use Java-style collections...

    utils.foreach( server.onlinePlayers, function(player){
         player.chat('Hello!');
    }); 

... the above code sends a 'Hello!' to every online player.

The following example is a more complex use case - The need to build an enormous structure
without hogging CPU usage...

    // build a structure 200 wide x 200 tall x 200 long
    // (That's 8 Million Blocks - enough to tax any machine!)
    var utils = require('utils');

    var a = []; 
    a.length = 200; 
    var drone = new Drone();
    var processItem = function(item, index, object, array){
        // build a box 200 wide by 200 long then move up
        drone.box(blocks.wood, 200, 1, 200).up();
    };
    // by the time the job's done 'self' might be someone else 
    // assume this code is within a function/closure
    var player = self;
    var onDone = function(){ 
        player.sendMessage('Job Done!');
    };
    utils.foreach (a, processItem, null, 10, onDone);
    
***/
var _foreach = function(array, callback, object, delay, onCompletion) {
    if (array instanceof java.util.Collection)
        array = array.toArray();
    var i = 0;
    var len = array.length;
    if (delay){
        var next = function(){ callback(array[i],i,object,array); i++;};
        var hasNext = function(){return i < len;};
        _nicely(next,hasNext,onCompletion,delay);
    }else{
        for (;i < len; i++){
            callback(array[i],i,object,array);
        }
    }
};
exports.foreach = _foreach;
/************************************************************************
### utils.nicely() function

The utils.nicely() function is for performing processing using the
[org.bukkit.scheduler][sched] package/API. utils.nicely() lets you
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
 * delay : The delay (in server ticks - 20 per second) between each call.

#### Example

See the source code to utils.foreach for an example of how utils.nicely is used.

***/
var _nicely = function(next, hasNext, onDone, delay){
    if (hasNext()){
        next();
        server.scheduler.runTaskLater(__plugin,function(){
            _nicely(next,hasNext,onDone,delay);
        },delay);
    }else{
        if (onDone)
            onDone();
    }
};
exports.nicely = _nicely;
/************************************************************************
### utils.at() function

The utils.at() function will perform a given task at a given time every 
(minecraft) day.

#### Parameters

 * time24hr : The time in 24hr form - e.g. 9:30 in the morning is '09:30' while
   9:30 pm is '21:30', midnight is '00:00' and midday is '12:00'
 * callback : A javascript function which will be invoked at the given time.
 * worlds : (optional) An array of worlds. Each world has its own clock. If no array of worlds is specified, all the server's worlds are used.

#### Example

To warn players when night is approaching...

    var utils = require('utils');

    utils.at( '19:00', function() {

        utils.foreach( server.onlinePlayers, function(player){
            player.chat('The night is dark and full of terrors!');            
        });

    });
  
***/
exports.at = function(time24hr, callback, worlds) {
    var forever = function(){ return true;};
    var timeParts = time24hr.split(':');
    var hrs = ((timeParts[0] * 1000) + 18000) % 24000;
    var mins;
    if (timeParts.length > 1)
        mins = (timeParts[1] / 60) * 1000;
    
    var timeMc = hrs + mins;
    if (typeof worlds == 'undefined'){
        worlds = server.worlds;
    }
    _nicely(function(){
        _foreach (worlds, function (world){
            var time = world.getTime();
            var diff = timeMc - time;
            if (diff > 0 && diff < 100){
                callback();
            }
        });
    },forever, null, 100);
};

/************************************************************************
### utils.find() function

The utils.find() function will return a list of all files starting at
a given directory and recursiving trawling all sub-directories.

#### Parameters

 * dir : The starting path. Must be a string.
 * filter : (optional) A [FilenameFilter][fnfltr] object to return only files matching a given pattern.

[fnfltr]: http://docs.oracle.com/javase/6/docs/api/java/io/FilenameFilter.html

#### Example

    var utils = require('utils');
    var jsFiles = utils.find('./', function(dir,name){
        return name.match(/\.js$/);
    });  

***/
exports.find = function( dir , filter){
    var result = [];
    var recurse = function(dir, store){
        var files, dirfile = new java.io.File(dir);
        
        if (typeof filter == 'undefined')
            files = dirfile.list();
        else
            files = dirfile.list(filter);

        _foreach(files, function (file){
            file = new java.io.File(dir + '/' + file);
            if (file.isDirectory()){
                recurse(file.canonicalPath, store);
            }else{
                store.push(file.canonicalPath);
            }
        });
    }
    recurse(dir,result);
    return result;
}
