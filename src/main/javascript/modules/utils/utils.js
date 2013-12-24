/************************************************************************
Utilities Module
================
Miscellaneous utility functions and classes to help with programming.

 * locationToString(Location) - returns a bukkit Location object in string form.
  
 * getPlayerObject(playerName) - returns the Player object for a named
   player or `self` if no name is provided.

***/
var utils = utils ? utils : {
    locationToString: function(location){
        return JSON.stringify([""+location.world.name,location.x, location.y, location.z]);
    },

    getPlayerObject: function(playerName){
        if (typeof playerName == "undefined")
            return self;
        if (typeof playerName == "string")
            return org.bukkit.Bukkit.getPlayer(playerName);
        return player;
    },
/************************************************************************
utils.foreach() function
========================
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

Parameters
----------

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

Example
-------
The following example illustrates how to use foreach for immediate processing of an array...

    var players = ["moe", "larry", "curly"];
    utils.foreach (players, function(item){ 
        server.getPlayer(item).sendMessage("Hi " + item);
    });

... The `utils.foreach()` function can work with Arrays or any Java-style collection. This is important
because many objects in the Bukkit API use Java-style collections...

    utils.foreach( server.onlinePlayers, function(player){
         player.chat("Hello!");
    }); 

... the above code sends a "Hello!" to every online player.

The following example is a more complex use case - The need to build an enormous structure
without hogging CPU usage...

    // build a structure 200 wide x 200 tall x 200 long
    // (That's 8 Million Blocks - enough to tax any machine!)

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
        player.sendMessage("Job Done!");
    };
    utils.foreach (a, processItem, null, 10, onDone);
    
***/
    foreach: function(array, callback, object, delay, onCompletion) {
        if (array instanceof java.util.Collection)
            array = array.toArray();
        var i = 0;
        var len = array.length;
        if (delay){
            var next = function(){ callback(array[i],i,object,array); i++;};
            var hasNext = function(){return i < len;};
            utils.nicely(next,hasNext,onCompletion,delay);
        }else{
            for (;i < len; i++){
                callback(array[i],i,object,array);
            }
        }
    },
/************************************************************************
utils.nicely() function
=======================
The utils.nicely() function is for performing processing using the
[org.bukkit.scheduler][sched] package/API. utils.nicely() lets you
process with a specified delay between the completion of each `next()`
function and the start of the next `next()` function.
`utils.nicely()` is a recursive function - that is - it calls itself
(schedules itself actually) repeatedly until `hasNext` returns false.

Parameters
----------

 * next : A function which will be called if processing is to be done. 
 * hasNext : A function which is called to determine if the `next`
   callback should be invoked. This should return a boolean value -
   true if the `next` function should be called (processing is not
   complete), false otherwise.
 * onDone : A function which is to be called when all processing is complete (hasNext returned false).
 * delay : The delay (in server ticks - 20 per second) between each call.

Example
-------
See the source code to utils.foreach for an example of how utils.nicely is used.

***/
    nicely: function(next, hasNext, onDone, delay){
        if (hasNext()){
            next();
            server.scheduler.runTaskLater(__plugin,function(){
                utils.nicely(next,hasNext,onDone,delay);
            },delay);
        }else{
            if (onDone)
                onDone();
        }
    },
/************************************************************************
utils.at() function
===================
The utils.at() function will perform a given task at a given time every 
(minecraft) day.

Parameters
----------

 * time24hr : The time in 24hr form - e.g. 9:30 in the morning is "09:30" while
   9:30 pm is "21:30", midnight is "00:00" and midday is "12:00"
 * callback : A javascript function which will be invoked at the given time.
 * world : (optional) Each world has its own clock. If no world is specified, the server's first world is used.

Example
-------

To warn players when night is approaching...

    utils.at( "19:00", function() {

        utils.foreach( server.onlinePlayers, function(player){
            player.chat("The night is dark and full of terrors!");            
        });

    }, self.world);
  
***/
    at: function(time24hr, callback, world){
        var forever = function(){ return true;};
        var timeParts = time24hr.split(":");
        var hrs = ((timeParts[0] * 1000) + 18000) % 24000;
        var mins;
        if (timeParts.length > 1)
            mins = (timeParts[1] / 60) * 1000;
        
        var timeMc = hrs + mins;
        if (typeof world == "undefined"){
            world = server.worlds.get(0);
        }
        utils.nicely(function(){
            var time = world.getTime();
            var diff = timeMc - time;
            if (diff > 0 && diff < 100){
                callback();
            }
        },forever, null, 100);
    },
};
