# ScriptCraft API Reference

Walter Higgins

[walter.higgins@gmail.com][email]

[email]: mailto:walter.higgins@gmail.com?subject=ScriptCraft_API_Reference

## Modules in Scriptcraft

ScriptCraft has a simple module loading system. In ScriptCraft, files
and modules are in one-to-one correspondence. As an example, foo.js
loads the module circle.js in the same directory. 
*ScriptCraft now uses the same module system as Node.js - see [Node.js Modules][njsmod] for more details.*

[njsmod]: http://nodejs.org/api/modules.html

The contents of foo.js:

    var circle = require('./circle.js');
    echo( 'The area of a circle of radius 4 is '
               + circle.area(4));

The contents of circle.js:

    var PI = Math.PI;
    
    exports.area = function (r) {
      return PI * r * r;
    };

    exports.circumference = function (r) {
      return 2 * PI * r;
    };

The module circle.js has exported the functions area() and
circumference(). To add functions and objects to the root of your
module, you can add them to the special exports object.

Variables local to the module will be private, as though the module
was wrapped in a function. In this example the variable PI is private
to circle.js.

If you want the root of your module's export to be a function (such as
a constructor) or if you want to export a complete object in one
assignment instead of building it one property at a time, assign it to
module.exports instead of exports.

## Module Loading

When the ScriptCraft Java plugin is first installed, a new
subdirectory is created in the craftbukkit directory. If your
craftbukkit directory is called 'craftbukkit' then the new
subdirectories will be ...

 * craftbukkit/scriptcraft/
 * craftbukkit/scriptcraft/plugins
 * craftbukkit/scriptcraft/modules
 * craftbukkit/scriptcraft/lib

... The `plugins`, `modules` and `lib` directories each serve a different purpose.

### The plugins directory

At server startup the ScriptCraft Java plugin is loaded and begins
automatically loading and executing all of the modules (javascript
files with the extension `.js`) it finds in the `scriptcraft/plugins`
directory. All modules in the plugins directory are automatically
loaded into the `global` namespace. What this means is that anything a
module in the `plugins` directory exports becomes a global
variable. For example, if you have a module greeting.js in the plugins
directory....

    exports.greet = function() {
        echo('Hello ' + self.name);
    };

... then `greet` becomes a global function and can be used at the
in-game (or server) command prompt like so...

    /js greet()

... This differs from how modules (in NodeJS and commonJS
environments) normally work. If you want your module to be exported
globally, put it in the `plugins` directory. If you don't want your
module to be exported globally but only want it to be used by other
modules, then put it in the `modules` directory instead. If you've
used previous versions of ScriptCraft and have put your custom
javascript modules in the `js-plugins` directory, then put them in the
`scriptcraft/plugins` directory. To summarise, modules in this directory are ...

 * Automatically loaded and run at server startup.
 * Anything exported by modules becomes a global variable.

### The modules directory

The module directory is where you should place your modules if you
don't want to export globally. In javascript, it's considered best
practice not to have too many global variables, so if you want to
develop modules for others to use, or want to develop more complex
mods then your modules should be placed in the `modules` directory.
*Modules in the `modules` directory are not automatically loaded at
startup*, instead, they are loaded and used by other modules/plugins
using the standard `require()` function.  This is the key difference
between modules in the `plugins` directory and modules in the
`modules` directory. Modules in the `plugins` directory are
automatically loaded and exported in to the global namespace at server
startup, modules in the `modules` directory are not.

### The lib directory

Modules in the `lib` directory are for use by ScriptCraft and some
core functions for use by module and plugin developers are also
provided. The `lib` directory is for internal use by ScriptCraft.
Modules in this directory are not automatically loaded nor are they
globally exported.

### Directories 

As of December 24 2013, the `scriptcraft/plugins` directory has the following sub-directories...

 * drone - Contains the drone module and drone extensions. Drone was the first scriptcraft module.
 * mini-games - Contains mini-games 
 * arrows - The arrows module
 * signs - The signs module (includes example signs)
 * chat - The chat plugin/module
 * alias - The alias plugin/module
 * home - The home module - for setting homes and visiting other homes.

## Core Module: functions

ScripCraft provides some functions which can be used by all plugins/modules...

 * echo (message) - Displays a message on the screen. 
   For example: `/js echo('Hello World')` will print Hello World on the in-game chat window.  
   For programmers familiar with Javascript web programming, an `alert` function is also provided. 
   `alert` works exactly the same as `echo` e.g. `alert('Hello World')` 

 * require (modulename) - Will load modules. See [Node.js modules][njsmod]

 * load (filename,warnOnFileNotFound) - loads and evaluates a javascript file, returning the evaluated object. (Note: Prefer `require()` to `load()`)
  
 * save (object, filename) - saves an object to a file.

 * plugin (name, interface, isPersistent) - defines a new plugin. If
   isPersistent is true then the plugin doesn't have to worry about
   loading and saving state - that will be done by the framework. Just
   make sure that anything you want to save (and restore) is in the plugin's
   'store' property - this will be created automatically if not
   already defined.  (its type is object {} ) . More on plugins below.
    
 * command (name, function) - defines a command that can be used by
   non-operators. The `command` function provides a way for plugin
   developers to provide new commands for use by players.

### require() function

ScriptCraft's `require()` function is used to load modules. The `require()` function takes a 
module name as a parameter and will try to load the named module.

#### Parameters

 * modulename - The name of the module to be loaded. Can be one of the following...

   - A relative file path (with or without `.js` suffix)
   - An absolute file path (with or without `.js` suffix)
   - A relative directory path (uses node.js rules for directories)
   - An absolute directory path (uses node.js rules for directories)
   - A name of the form `'events'` - in which case the `lib` directory and `modules` directories are searched for the module.

#### Return

require() will return the loaded module's exports.

### load() function 

#### No longer recommended for use by Plugin/Module developers (deprecated)

load() should only be used to load .json data.

#### Parameters

 * filename - The name of the file to load.
 * warnOnFileNotFound (optional - default: false) - warn if the file was not found.

#### Return

load() will return the result of the last statement evaluated in the file.

#### Example

    load(__folder + "myFile.js"); // loads a javascript file and evaluates it.

    var myData = load("myData.json"); // loads a javascript file and evaluates it - eval'd contents are returned.

myData.json contents...

    __data = { 
        players: {
            walterh: {
                h: ["jsp home {1}"],
                sunny:["time set 0",
                       "weather clear"]
                     }
                 }
            }

### save() function

The save() function saves an in-memory javascript object to a
specified file. Under the hood, save() uses JSON (specifically
json2.js) to save the object. Again, there will usually be no need to
call this function directly as all javascript plugins' state are saved
automatically if they are declared using the `plugin()` function.  Any
in-memory object saved using the `save()` function can later be
restored using the `load()` function.

#### Parameters

 * objectToSave : The object you want to save.
 * filename : The name of the file you want to save it to.

#### Example

    var myObject = { name: 'John Doe',
                     aliases: ['John Ray', 'John Mee'],
                     date_of_birth: '1982/01/31' };
    save(myObject, 'johndoe.json');

johndoe.json contents...

    var __data = { "name": "John Doe", 
                   "aliases": ["John Ray", "John Mee"], 
                   "date_of_birth": "1982/01/31" };

### plugin() function

The `plugin()` function should be used to declare a javascript module
whose state you want to have managed by ScriptCraft - that is - a
Module whose state will be loaded at start up and saved at shut down.
A plugin is just a regular javascript object whose state is managed by
ScriptCraft.  The only member of the plugin which whose persistence is
managed by Scriptcraft is `store` - this special member will be
automatically saved at shutdown and loaded at startup by
ScriptCraft. This makes it easier to write plugins which need to
persist data.

#### Parameters
 
 * pluginName (String) : The name of the plugin - this becomes a global variable.
 * pluginDefinition (Object) : The various functions and members of the plugin object.
 * isPersistent (boolean - optional) : Specifies whether or not the plugin/object state should be loaded and saved by ScriptCraft.

#### Example

See chat/color.js for an example of a simple plugin - one which lets
players choose a default chat color. See also [Anatomy of a
ScriptCraft Plugin][anatomy].
 
[anatomy]: http://walterhiggins.net/blog/ScriptCraft-1-Month-later

### command() function

The `command()` function is used to expose javascript functions for
use by non-operators (regular players). Only operators should be
allowed use raw javascript using the `/js ` command because it is too
powerful for use by regular players and can be easily abused. However,
the `/jsp ` command lets you (the operator / server administrator /
plugin author) safely expose javascript functions for use by players.

#### Parameters
 
 * commandName : The name to give your command - the command will be invoked like this by players `/jsp commandName`
 * commandFunction: The javascript function which will be invoked when the command is invoked by a player.
 * options (Array - optional) : An array of command options/parameters
   which the player can supply (It's useful to supply an array so that
   Tab-Completion works for the `/jsp ` commands.
 * intercepts (boolean - optional) : Indicates whether this command
   can intercept Tab-Completion of the `/jsp ` command - advanced
   usage - see alias/alias.js for example.

#### Example

See chat/colors.js or alias/alias.js or homes/homes.js for examples of how to use the `command()` function.

### ready() function

The `ready()` function provides a way for plugins to do additional
setup once all of the other plugins/modules have loaded.  For example,
event listener registration can only be done after the
events/events.js module has loaded. A plugin author could load the
file explicilty like this...

    load(__folder + "../events/events.js");

    // event listener registration goes here 

... or better still, just do event regristration using the `ready()`
handler knowing that by the time the `ready()` callback is invoked,
all of the scriptcraft modules have been loaded...

    ready(function(){
        // event listener registration goes here
        // code that depends on other plugins/modules also goes here
    });

The execution of the function object passed to the `ready()` function
is *deferred* until all of the plugins/modules have loaded. That way
you are guaranteed that when the function is invoked, all of the
plugins/modules have been loaded and evaluated and are ready to use.

Core Module - Special Variables
===============================
There are a couple of special javascript variables available in ScriptCraft...
 
 * __folder - The current working directory - this variable is only to be used within the main body of a .js file.
 * __plugin - The ScriptCraft JavaPlugin object.
 * server - The Minecraft Server object.
 * self - the current player. (Note - this value should not be used in multi-threaded scripts - it's not thread-safe)

## Miscellaneous Core Functions

### setTimeout() function

This function mimics the setTimeout() function used in browser-based javascript.
However, the function will only accept a function reference, not a string of javascript code.
Where setTimeout() in the browser returns a numeric value which can be subsequently passed to 
clearTimeout(), This implementation returns a [BukkitTask][btdoc] object which can be subsequently passed to ScriptCraft's own clearTimeout() implementation.

If Node.js supports setTimeout() then it's probably good for ScriptCraft to support it too.

[btdoc]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scheduler/BukkitTask.html

#### Example

    //
    // start a storm in 5 seconds
    //    
    setTimeout( function() {
        var world = server.worlds.get(0);
        world.setStorm(true);
    }, 5000);

### clearTimeout() function

A scriptcraft implementation of clearTimeout().

### setInterval() function

This function mimics the setInterval() function used in browser-based javascript.
However, the function will only accept a function reference, not a string of javascript code.
Where setInterval() in the browser returns a numeric value which can be subsequently passed to 
clearInterval(), This implementation returns a [BukkitTask][btdoc] object which can be subsequently passed to ScriptCraft's own clearInterval() implementation.

If Node.js supports setInterval() then it's probably good for ScriptCraft to support it too.

[btdoc]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scheduler/BukkitTask.html

### clearInterval() function

A scriptcraft implementation of clearInterval().

### refresh() function

The refresh() function will ...

1. Disable the ScriptCraft plugin.
2. Unload all event listeners associated with the ScriptCraft plugin.
3. Enable the ScriptCraft plugin.

... refresh() can be used during development to reload only scriptcraft javascript files.
See [issue #69][issue69] for more information.

[issue69]: https://github.com/walterhiggins/ScriptCraft/issues/69

## Require - Node.js-style module loading in ScriptCraft

Node.js is a server-side javascript environment with an excellent
module loading system based on CommonJS. Modules in Node.js are really
simple. Each module is in its own javascript file and all variables
and functions within the file are private to that file/module only.
There is a very concise explanation of CommonJS modules at...

[http://wiki.commonjs.org/wiki/Modules/1.1.1.][cjsmodules]

Node.js also has good documentation on [Modules][njsmod].

If you want to export a variable or function you use the module.export
property.

For example imagine you have 3 files program.js, inc.js  and math.js ...

### math.js

    exports.add = function(a,b){
        return a + b;
    }

### inc.js

    var math = require('./math');
    exports.increment = function(n){
        return math.add(n, 1);
    }

### program.js

    var inc = require('./inc').increment;
    var a = 7;
    a = inc(a);
    print(a);

You can see from the above sample code that programs can use modules
and modules themeselves can use other modules. Modules have full
control over what functions and properties they want to provide to
others.

## Important

Although ScriptCraft now supports Node.js style modules, it does not
support node modules. Node.js and Rhino are two very different
Javascript environments. ScriptCraft uses Rhino Javascript, not
Node.js.

Modules can be loaded using relative or absolute paths. Per the CommonJS
module specification, the '.js' suffix is optional.

[cjsmodules]: http://wiki.commonjs.org/wiki/Modules/1.1.1.

## When resolving module names to file paths, ScriptCraft uses the following rules...

 1. if the module does not begin with './' or '/' then ...

    1.1 Look in the 'scriptcraft/lib' directory. If it's not there then...
    1.2 Look in the 'scriptcraft/modules' directory. If it's not there then 
        Throw an Error.

 2. If the module begins with './' or '/' then ...
    
    2.1 if the module begins with './' then it's treated as a file path. File paths are 
        always relative to the module from which the require() call is being made.

    2.2 If the module begins with '/' then it's treated as an absolute path.

    If the module does not have a '.js' suffix, and a file with the same name and a .js sufix exists, 
    then the file will be loaded.

 3. If the module name resolves to a directory then...
    
    3.1 look for a package.json file in the directory and load the `main` property e.g.
    
    // package.json located in './some-library/'
    {
      "main": './some-lib.js',
      "name": 'some-library'
    }
    
    3.2 if no package.json file exists then look for an index.js file in the directory

events Module
=============
The Events module provides a thin wrapper around Bukkit's
Event-handling API.  Bukkit's Events API makes use of Java Annotations
which are not available in Javascript, so this module provides a
simple way to listen to minecraft events in javascript.

events.on() static method
=========================
This method is used to register event listeners. 

Parameters
----------

 * eventName - A string or java class. If a string is supplied it must
   be part of the Bukkit event class name.  See [Bukkit API][buk] for
   details of the many bukkit event types. When a string is supplied
   there is no need to provide the full class name - you should omit
   the 'org.bukkit.event' prefix. e.g. if the string
   "block.BlockBreakEvent" is supplied then it's converted to the
   org.bukkit.event.block.BlockBreakEvent class .
 
   If a java class is provided (say in the case where you've defined
   your own custom event) then provide the full class name (without
   enclosing quotes).

 * callback - A function which will be called whenever the event
   fires. The callback should take 2 parameters, listener (the Bukkit
   registered listener for this callback) and event (the event fired).

 * priority (optional - default: "HIGHEST") - The priority the
   listener/callback takes over other listeners to the same
   event. Possible values are "HIGH", "HIGHEST", "LOW", "LOWEST",
   "NORMAL", "MONITOR". For an explanation of what the different
   priorities mean refer to bukkit's [Event API Reference][buk2].

Returns
-------
An org.bukkit.plugin.RegisteredListener object which can be used to
unregister the listener. This same object is passed to the callback
function each time the event is fired.

Example:
------
The following code will print a message on screen every time a block is broken in the game

    var events = require('./events/events');

    events.on("block.BlockBreakEvent", function(listener, evt){ 
        echo (evt.player.name + " broke a block!");
    });

To handle an event only once and unregister from further events...
    
    var events = require('./events/events');

    events.on("block.BlockBreakEvent", function(listener, evt){ 
        print (evt.player.name + " broke a block!");
        evt.handlers.unregister(listener);
    });

To unregister a listener *outside* of the listener function...

    var events = require('./events/events');

    var myBlockBreakListener = events.on("block.BlockBreakEvent",function(l,e){ ... });
    ...
    var handlers = org.bukkit.event.block.BlockBreakEvent.getHandlerList();
    handlers.unregister(myBlockBreakListener);

[buk2]: http://wiki.bukkit.org/Event_API_Reference
[buk]: http://jd.bukkit.org/dev/apidocs/index.html?org/bukkit/event/Event.html

http.request() function
====================
The http.request() function will fetch a web address asynchronously (on a
separate thread)and pass the URL's response to a callback function
which will be executed synchronously (on the main thread).  In this
way, http.request() can be used to fetch web content without blocking the
main thread of execution.

Parameters
----------

 * request: The request details either a plain URL e.g. "http://scriptcraft.js/sample.json" or an object with the following properties...

   - url: The URL of the request.
   - method: Should be one of the standard HTTP methods, GET, POST, PUT, DELETE (defaults to GET).
   - params: A Javascript object with name-value pairs. This is for supplying parameters to the server.

 * callback: The function to be called when the Web request has completed. This function takes the following parameters...
   - responseCode: The numeric response code from the server. If the server did not respond with 200 OK then the response parameter will be undefined.
   - response: A string (if the response is of type text) or object containing the HTTP response body.

Example
-------
The following example illustrates how to use http.request to make a request to a JSON web service and evaluate its response...

    var jsResponse;
    var http = require('./http/request');
    http.request("http://scriptcraftjs.org/sample.json",function(responseCode, responseBody){
        jsResponse = eval("(" + responseBody +  ")");
    });

... The following example illustrates a more complex use-case POSTing parameters to a CGI process on a server...

    var http = require('./http/request');
    http.request({ url: "http://pixenate.com/pixenate/pxn8.pl",
                   method: "POST",
                   params: {script: "[]"}
                 }, function( responseCode, responseBody){
          var jsObj = eval("(" + responseBody + ")");
      });

Utilities Module
================
Miscellaneous utility functions and classes to help with programming.

 * locationToString(Location) - returns a bukkit Location object in string form.
  
 * getPlayerObject(playerName) - returns the Player object for a named
   player or `self` if no name is provided.

 * getPlayerPos(playerName) - returns the player's x,y,z and yaw (direction) for a named player
   or player or `self` if no parameter is provided.
 
 * getMousePos(playerName) - returns the x,y,z of the current block being targeted by the named player
   or player or `self` if no paramter is provided.

foreach() function
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

    var utils = require('./utils/_utils');
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
    var utils = require('./utils/_utils');

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

    var utils = require('./utils/_utils');

    utils.at( "19:00", function() {

        utils.foreach( server.onlinePlayers, function(player){
            player.chat("The night is dark and full of terrors!");            
        });

    }, self.world);
  
String class extensions
-----------------------
The following chat-formatting methods are added to the javascript String class..

    * aqua()
    * black()
    * blue()
    * bold()
    * brightgreen()
    * darkaqua()
    * darkblue()
    * darkgray()
    * darkgreen()
    * purple()
    * darkpurple()
    * darkred()
    * gold()
    * gray()
    * green()
    * italic()
    * lightpurple()
    * indigo()
    * green()
    * red()
    * pink()
    * yellow()
    * white()
    * strike()
    * random()
    * magic()
    * underline()
    * reset()

Example
-------

    var boldGoldText = "Hello World".bold().gold();
    self.sendMessage(boldGoldText);

<p style="color:gold;font-weight:bold">Hello World</p>    

Blocks Module
=============
You hate having to lookup [Data Values][dv] when you use ScriptCraft's Drone() functions. So do I.
So I created this blocks object which is a helper object for use in construction.

Examples
--------

    box( blocks.oak ); // creates a single oak wood block
    box( blocks.sand, 3, 2, 1 ); // creates a block of sand 3 wide x 2 high x 1 long
    box( blocks.wool.green, 2 ); // creates a block of green wool 2 blocks wide

Color aliased properties that were a direct descendant of the blocks object are no longer used to avoid confusion with carpet and stained clay blocks. In addition, there's a convenience array `blocks.rainbow` which is an array of the 7 colors of the rainbow (or closest approximations).

Fireworks Module
================
The fireworks module makes it easy to create fireworks using
ScriptCraft.  The module has a single function `firework` which takes
a `org.bukkit.Location` as its 1 and only parameter.

Examples
--------
The module also extends the `Drone` object adding a `firework` method
so that fireworks can be created as a part of a Drone chain. For
Example....

    /js firework()

... creates a single firework, while ....

    /js firework().fwd(3).times(5) 

... creates 5 fireworks in a row. Fireworks have also been added as a
possible option for the `arrow` module. To have a firework launch
where an arrow strikes...

    /js arrows.firework()

To call the fireworks.firework() function directly, you must provide a
location. For example...

    /js var fireworks = require('fireworks');
    /js fireworks.firework(self.location);

![firework example](img/firework.png)

Drone Module
============
The Drone is a convenience class for building. It can be used for...

 1. Building
 2. Copying and Pasting

It uses a fluent interface which means all of the Drone's methods return `this` and can 
be chained together like so...

    var theDrone = new Drone();
    theDrone.up().left().box(blocks.oak).down().fwd(3).cylinder0(blocks.lava,8); 

TLDNR; (Just read this if you're impatient)
===========================================
At the in-game command prompt type...
     
    /js box( blocks.oak )  
    
... creates a single wooden block at the cross-hairs or player location
    
    /js box( blocks.oak ).right(2).box( blocks.wool.black, 4, 9, 1)
    
... creates a single wooden block and a 2001 black obelisk that is 4
wide x 9 tall x 1 long in size.  If you want to see what else
ScriptCraft's Drone can do, read on...

Constructing a Drone Object
===========================

Drones can be created in any of the following ways...
    
 1. Calling any one of the methods listed below will return a Drone object. For example...
         
        var d = box( blocks.oak )

   ... creates a 1x1x1 wooden block at the cross-hairs or player's location and returns a Drone
   object. This might look odd (if you're familiar with Java's Object-dot-method syntax) but all 
   of the Drone class's methods are also global functions that return new Drone objects. 
   This is short-hand for creating drones and is useful for playing around with Drones at the in-game 
   command prompt. It's shorter than typing ...
    
        var d = new Drone().box( blocks.oak ) 
        
   ... All of the Drone's methods return `this` (self) so you can chain operations together like this...
        
        var d = box( blocks.oak )
                  .up()
                  .box( blocks.oak ,3,1,3)
                  .down()
                  .fwd(2)
                  .box( blocks.oak )
                  .turn()
                  .fwd(2)
                  .box( blocks.oak )
                  .turn()
                  .fwd(2)
                  .box( blocks.oak );
    
 2. Using the following form...

        d = new Drone()
    
    ...will create a new Drone. If the cross-hairs are pointing at a
    block at the time then, that block's location becomes the drone's
    starting point.  If the cross-hairs are _not_ pointing at a block,
    then the drone's starting location will be 2 blocks directly in
    front of the player.  TIP: Building always happens right and front
    of the drone's position...
    
    Plan View:

        ^
        |
        |
        D---->
      
    For convenience you can use a _corner stone_ to begin building.
    The corner stone should be located just above ground level.  If
    the cross-hair is point at or into ground level when you create a
    new Drone(), then building begins at that point. You can get
    around this by pointing at a 'corner stone' just above ground
    level or alternatively use the following statement...
    
        d = new Drone().up();
          
    ... which will move the drone up one block as soon as it's created.

    ![corner stone](img/cornerstone1.png)

 3. Or by using the following form...
    
        d = new Drone(x,y,z,direction,world);

    This will create a new Drone at the location you specified using
    x, y, z In minecraft, the X axis runs west to east and the Z axis runs
    north to south.  The direction parameter says what direction you want
    the drone to face: 0 = east, 1 = south, 2 = west, 3 = north.  If the
    direction parameter is omitted, the player's direction is used
    instead.

    Both the `direction` and `world` parameters are optional.

 4. Create a new Drone based on a Bukkit Location object...

        d = new Drone(location);

    This is useful when you want to create a drone at a given
    `org.bukkit.Location` . The `Location` class is used throughout
    the bukkit API. For example, if you want to create a drone when a
    block is broken at the block's location you would do so like
    this...

        events.on('block.BlockBreakEvent',function(listener,event){
            var location = event.block.location;
            var drone = new Drone(location);
            // do more stuff with the drone here...
        });

Parameters
----------
 * location (optional) : *NB* If an `org.bukkit.Location` object is provided as a parameter, then it should be the only parameter.
 * x (optional) : The x coordinate of the Drone
 * y (optional) : The y coordinate of the Drone
 * z (optional) : The z coordinate of the Drone
 * direction (optional) : The direction in which the Drone is
   facing. Possible values are 0 (east), 1 (south), 2 (west) or 3 (north)
 * world (optional) : The world in which the drone is created.
  
Drone.box() method
==================
the box() method is a convenience method for building things. (For the more performance-oriented method - see cuboid)

parameters
----------
 * b - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * w (optional - default 1) - the width of the structure 
 * h (optional - default 1) - the height of the structure 
 * d (optional - default 1) - the depth of the structure - NB this is
   not how deep underground the structure lies - this is how far
   away (depth of field) from the drone the structure will extend.

Example
-------
To create a black structure 4 blocks wide, 9 blocks tall and 1 block long...
    
    box(blocks.wool.black, 4, 9, 1);

... or the following code does the same but creates a variable that can be used for further methods...

    var drone = new Drone();
    drone.box(blocks.wool.black, 4, 9, 1);

![box example 1](img/boxex1.png)
    
Drone.box0() method
===================
Another convenience method - this one creates 4 walls with no floor or ceiling.

Parameters
----------
 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * width (optional - default 1) - the width of the structure 
 * height (optional - default 1) - the height of the structure 
 * length (optional - default 1) - the length of the structure - how far
   away (depth of field) from the drone the structure will extend.

Example
-------
To create a stone building with the insided hollowed out 7 wide by 3 tall by 6 long...

    box0( blocks.stone, 7, 3, 6);

![example box0](img/box0ex1.png)
   
Drone.boxa() method
===================
Construct a cuboid using an array of blocks. As the drone moves first along the width axis,
then the height (y axis) then the length, each block is picked from the array and placed.

Parameters
----------
 * blocks - An array of blocks - each block in the array will be placed in turn.
 * width
 * height
 * length

Example
-------
Construct a rainbow-colored road 100 blocks long...

    var rainbowColors = [blocks.wool.red, blocks.wool.orange, blocks.wool.yellow, blocks.wool.lime,
                         blocks.wool.lightblue, blocks.wool.blue, blocks.wool.purple];
    
    boxa(rainbowColors,7,1,30);

![boxa example](img/boxaex1.png)

Drone Movement
==============
Drones can move freely in minecraft's 3-D world. You control the
Drone's movement using any of the following methods..

 * up()
 * down()
 * left()
 * right()
 * fwd()
 * back()
 * turn()

... Each of these methods takes a single optional parameter
`numBlocks` - the number of blocks to move in the given direction. If
no parameter is given, the default is 1.

to change direction use the `turn()` method which also takes a single
optional parameter (numTurns) - the number of 90 degree turns to make.
Turns are always clock-wise. If the drone is facing north, then
drone.turn() will make the turn face east. If the drone is facing east
then drone.turn(2) will make the drone turn twice so that it is facing
west.

Drone Positional Info
=====================

 * getLocation() - Returns a Bukkit Location object for the drone

Drone Markers
=============
Markers are useful when your Drone has to do a lot of work. You can
set a check-point and return to the check-point using the move()
method.  If your drone is about to undertake a lot of work -
e.g. building a road, skyscraper or forest you should set a
check-point before doing so if you want your drone to return to its
current location.  

A 'start' checkpoint is automatically created when the Drone is first created.

Markers are created and returned to using the followng two methods...

 * chkpt - Saves the drone's current location so it can be returned to later.
 * move - moves the drone to a saved location. Alternatively you can provide an 
   org.bukkit.Location object or x,y,z and direction parameters.

Parameters
----------
 * name - the name of the checkpoint to save or return to.

Example
-------

    drone.chkpt('town-square');
    //
    // the drone can now go off on a long excursion
    //
    for (i = 0; i< 100; i++){ 
        drone.fwd(12).box(6); 
    }
    //
    // return to the point before the excursion
    //
    drone.move('town-square');

Drone.prism() method
====================
Creates a prism. This is useful for roofs on houses.

Parameters
----------

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * width - the width of the prism
 * length - the length of the prism (will be 2 time its height)

Example
-------

    prism(blocks.oak,3,12);

![prism example](img/prismex1.png)

Drone.prism0() method
=====================
A variation on `prism` which hollows out the inside of the prism. It uses the same parameters as `prism`.

Drone.cylinder() method
=======================
A convenience method for building cylinders. Building begins radius blocks to the right and forward.

Parameters
----------

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * radius 
 * height

Example
-------
To create a cylinder of Iron 7 blocks in radius and 1 block high...

    cylinder(blocks.iron, 7 , 1);

![cylinder example](img/cylinderex1.png)

Drone.cylinder0() method
========================
A version of cylinder that hollows out the middle.

Example
-------
To create a hollow cylinder of Iron 7 blocks in radius and 1 block high...

    cylinder0(blocks.iron, 7, 1);

![cylinder0 example](img/cylinder0ex1.png)

Drone.arc() method
==================
The arc() method can be used to create 1 or more 90 degree arcs in the horizontal or vertical planes.
This method is called by cylinder() and cylinder0() and the sphere() and sphere0() methods.

Parameters
----------
arc() takes a single parameter - an object with the following named properties...

 * radius - The radius of the arc.
 * blockType - The type of block to use - this is the block Id only (no meta). See [Data Values][dv].
 * meta - The metadata value. See [Data Values][dv].
 * orientation (default: 'horizontal') - the orientation of the arc - can be 'vertical' or 'horizontal'.
 * stack (default: 1) - the height or length of the arc (depending on
   the orientation - if orientation is horizontal then this parameter
   refers to the height, if vertical then it refers to the length).
 * strokeWidth (default: 1) - the width of the stroke (how many
   blocks) - if drawing nested arcs it's usually a good idea to set
   strokeWidth to at least 2 so that there are no gaps between each
   arc. The arc method uses a [bresenham algorithm][bres] to plot
   points along the circumference.
 * fill - If true (or present) then the arc will be filled in.
 * quadrants (default:
   `{topleft:true,topright:true,bottomleft:true,bottomright:true}` - An
   object with 4 properties indicating which of the 4 quadrants of a
   circle to draw. If the quadrants property is absent then all 4
   quadrants are drawn.

Examples
--------
To draw a 1/4 circle (top right quadrant only) with a radius of 10 and stroke width of 2 blocks ...

    arc({blockType: blocks.iron, 
         meta: 0, 
         radius: 10,
         strokeWidth: 2,
         quadrants: { topright: true },
         orientation: 'vertical', 
         stack: 1,
         fill: false
         });

![arc example 1](img/arcex1.png)

[bres]: http://en.wikipedia.org/wiki/Midpoint_circle_algorithm
[dv]: http://www.minecraftwiki.net/wiki/Data_values

Drone.door() method
===================
create a door - if a parameter is supplied an Iron door is created otherwise a wooden door is created.

Parameters
----------
 * doorType (optional - default wood) - If a parameter is provided then the door is Iron.

Example
-------
To create a wooden door at the crosshairs/drone's location...

    var drone = new Drone();
    drone.door();

To create an iron door...

    drone.door( blocks.door_iron );

![iron door](img/doorex1.png)
    
Drone.door2() method
====================
Create double doors (left and right side)

Parameters
----------
 * doorType (optional - default wood) - If a parameter is provided then the door is Iron.

Example
-------
To create double-doors at the cross-hairs/drone's location...

    drone.door2();

![double doors](img/door2ex1.png)

Drone.sign() method
===================
Signs must use block 63 (stand-alone signs) or 68 (signs on walls)

Parameters
----------
 * message -  can be a string or an array of strings. 
 * block - can be 63 or 68

Example
-------
To create a free-standing sign...

    drone.sign(["Hello","World"],63);

![ground sign](img/signex1.png)

... to create a wall mounted sign...

    drone.sign(["Welcome","to","Scriptopia"], 68);

![wall sign](img/signex2.png)

Drone Trees methods
===================

 * oak()
 * spruce()
 * birch()
 * jungle()

Example
-------
To create 4 trees in a row, point the cross-hairs at the ground then type `/js ` and ...

    up().oak().right(8).spruce().right(8).birch().right(8).jungle();

Trees won't always generate unless the conditions are right. You
should use the tree methods when the drone is directly above the
ground. Trees will usually grow if the drone's current location is
occupied by Air and is directly above an area of grass (That is why
the `up()` method is called first).

![tree example](img/treeex1.png)

    
None of the tree methods require parameters. Tree methods will only be successful
if the tree is placed on grass in a setting where trees can grow.

Drone.garden() method
=====================
places random flowers and long grass (similar to the effect of placing bonemeal on grass)

Parameters
----------

 * width - the width of the garden
 * length - how far from the drone the garden extends

Example
-------
To create a garden 10 blocks wide by 5 blocks long...

    garden(10,5);

![garden example](img/gardenex1.png)

Drone.rand() method
===================
rand takes either an array (if each blockid has the same chance of occurring)
or an object where each property is a blockid and the value is it's weight (an integer)

Example
-------
place random blocks stone, mossy stone and cracked stone (each block has the same chance of being picked)

    rand( [blocks.brick.stone, blocks.brick.mossy, blocks.brick.cracked ],w,d,h) 

to place random blocks stone has a 50% chance of being picked, 

    rand({blocks.brick.stone: 5, blocks.brick.mossy: 3, blocks.brick.cracked: 2},w,d,h) 

regular stone has a 50% chance, mossy stone has a 30% chance and cracked stone has just a 20% chance of being picked.

Copy & Paste using Drone
========================
A drone can be used to copy and paste areas of the game world.

Drone.copy() method
===================
Copies an area so it can be pasted elsewhere. The name can be used for
pasting the copied area elsewhere...

Parameters
----------

 * name - the name to be given to the copied area (used by `paste`)
 * width - the width of the area to copy
 * height - the height of the area to copy
 * length - the length of the area (extending away from the drone) to copy

Example
-------

    drone.copy('somethingCool',10,5,10).right(12).paste('somethingCool');

Drone.paste() method
====================
Pastes a copied area to the current location.

Example
-------
To copy a 10x5x10 area (using the drone's coordinates as the starting
point) into memory.  the copied area can be referenced using the name
'somethingCool'. The drone moves 12 blocks right then pastes the copy.

    drone.copy('somethingCool',10,5,10)
         .right(12)
         .paste('somethingCool');

Chaining
========

All of the Drone methods return a Drone object, which means methods
can be 'chained' together so instead of writing this...

    drone = new Drone(); 
    drone.fwd(3);
    drone.left(2);
    drone.box(2); // create a grass block 
    drone.up();
    drone.box(2); // create another grass block
    drone.down();

...you could simply write ...
    
    var drone = new Drone().fwd(3).left(2).box(2).up().box(2).down();

... since each Drone method is also a global function that constructs
a drone if none is supplied, you can shorten even further to just...
    
    fwd(3).left(2).box(2).up().box(2).down()

The Drone object uses a [Fluent Interface][fl] to make ScriptCraft
scripts more concise and easier to write and read.  Minecraft's
in-game command prompt is limited to about 80 characters so chaining
drone commands together means more can be done before hitting the
command prompt limit. For complex building you should save your
commands in a new script file and load it using /js load()

[fl]: http://en.wikipedia.org/wiki/Fluent_interface

Drone Properties
================

 * x - The Drone's position along the west-east axis (x increases as you move east)
 * y - The Drone's position along the vertical axis (y increses as you move up)
 * z - The Drone's position along the north-south axis (z increases as you move south)
 * dir - The Drone's direction 0 is east, 1 is south , 2 is west and 3 is north.

Extending Drone
===============
The Drone object can be easily extended - new buidling recipes/blue-prints can be added and can
become part of a Drone's chain using the *static* method `Drone.extend`. 

Drone.extend() static method
============================
Use this method to add new methods (which also become chainable global functions) to the Drone object.

Parameters
----------
 * name - The name of the new method e.g. 'pyramid'
 * function - The method body.

Example
-------

    // submitted by [edonaldson][edonaldson]
    Drone.extend('pyramid', function(block,height){
        this.chkpt('pyramid');
        for (var i = height; i > 0; i -= 2) {
            this.box(block, i, 1, i).up().right().fwd();
        }
        return this.move('pyramid');      
    });

Once the method is defined (it can be defined in a new pyramid.js file) it can be used like so...

    var d = new Drone();
    d.pyramid(blocks.brick.stone, 12);

... or simply ...

    pyramid(blocks.brick.stone, 12);

[edonaldson]: https://github.com/edonaldson

Drone Constants
===============

Drone.PLAYER_STAIRS_FACING
--------------------------
An array which can be used when constructing stairs facing in the Drone's direction...

    var d = new Drone();
    d.box(blocks.stairs.oak + ':' + Drone.PLAYER_STAIRS_FACING[d.dir]);

... will construct a single oak stair block facing the drone.

Drone.PLAYER_SIGN_FACING
------------------------
An array which can be used when placing signs so they face in a given direction.
This is used internally by the Drone.sign() method. It should also be used for placing
any of the following blocks...

 * chest 
 * ladder
 * furnace
 * dispenser

To place a chest facing the Drone ...

    drone.box( blocks.chest + ':' + Drone.PLAYER_SIGN_FACING[drone.dir]);

Drone.PLAYER_TORCH_FACING
-------------------------
Used when placing torches so that they face towards the drone. 

    drone.box( blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[drone.dir]);

Drone.times() Method
====================
The times() method makes building multiple copies of buildings easy. It's possible to create rows or grids of buildings without resorting to `for` or `while` loops.

Parameters
----------
 * numTimes (optional - default 2) : The number of times you want to repeat the preceding statements.

Example
-------
Say you want to do the same thing over and over. You have a couple of options...

 * You can use a for loop...

    d = new Drone(); for (var i =0;i < 4; i++){ d.cottage().right(8); }

While this will fit on the in-game prompt, it's awkward. You need to
declare a new Drone object first, then write a for loop to create the
4 cottages. It's also error prone, even the `for` loop is too much
syntax for what should really be simple.

 * You can use a while loop...
   
    d = new Drone(); var i=4; while (i--){ d.cottage().right(8); }

... which is slightly shorter but still too much syntax. Each of the
above statements is fine for creating a 1-dimensional array of
structures. But what if you want to create a 2-dimensional or
3-dimensional array of structures? Enter the `times()` method.

The `times()` method lets you repeat commands in a chain any number of
times. So to create 4 cottages in a row you would use the following
statement...

    cottage().right(8).times(4);

...which will build a cottage, then move right 8 blocks, then do it
again 4 times over so that at the end you will have 4 cottages in a
row. What's more the `times()` method can be called more than once in
a chain. So if you wanted to create a *grid* of 20 houses ( 4 x 5 ),
you would do so using the following statement...

    cottage().right(8).times(4).fwd(8).left(32).times(5);

... breaking it down...

 1. The first 3 calls in the chain ( `cottage()`, `right(8)`,
    `times(4)` ) build a single row of 4 cottages.

 2. The last 3 calls in the chain ( `fwd(8)`, `left(32)`, `times(5)` )
    move the drone forward 8 then left 32 blocks (4 x 8) to return to
    the original x coordinate, then everything in the chain is
    repeated again 5 times so that in the end, we have a grid of 20
    cottages, 4 x 5.  Normally this would require a nested loop but
    the `times()` method does away with the need for loops when
    repeating builds.

Another example: This statement creates a row of trees 2 by 3 ...

    oak().right(10).times(2).left(20).fwd(10).times(3)

... You can see the results below.

![times example 1](img/times-trees.png)

Drone.blocktype() method
========================
Creates the text out of blocks. Useful for large-scale in-game signs.

Parameters
----------
 
 * message - The message to create - (use `\n` for newlines)
 * foregroundBlock (default: black wool) - The block to use for the foreground
 * backgroundBlock (default: none) - The block to use for the background

Example
-------
To create a 2-line high message using glowstone...

    blocktype("Hello\nWorld",blocks.glowstone);

![blocktype example][imgbt1]

[imgbt1]: img/blocktype1.png

Drone.sphere() method
=====================
Creates a sphere.

Parameters
----------
 
 * block - The block the sphere will be made of.
 * radius - The radius of the sphere.

Example
-------
To create a sphere of Iron with a radius of 10 blocks...

    sphere( blocks.iron, 10);

![sphere example](img/sphereex1.png)

Spheres are time-consuming to make. You *can* make large spheres (250 radius) but expect the
server to be very busy for a couple of minutes while doing so.

Drone.sphere0() method
======================
Creates an empty sphere.

Parameters
----------
 
 * block - The block the sphere will be made of.
 * radius - The radius of the sphere.

Example
-------
To create a sphere of Iron with a radius of 10 blocks...

    sphere0( blocks.iron, 10);

Spheres are time-consuming to make. You *can* make large spheres (250 radius) but expect the
server to be very busy for a couple of minutes while doing so.

Drone.hemisphere() method
=========================
Creates a hemisphere. Hemispheres can be either north or south.

Parameters
----------

 * block - the block the hemisphere will be made of.
 * radius - the radius of the hemisphere
 * northSouth - whether the hemisphere is 'north' or 'south'

Example
-------
To create a wood 'north' hemisphere with a radius of 7 blocks...

    hemisphere(blocks.oak, 7, 'north');

![hemisphere example](img/hemisphereex1.png)

Drone.hemisphere0() method
=========================
Creates a hollow hemisphere. Hemispheres can be either north or south.

Parameters
----------

 * block - the block the hemisphere will be made of.
 * radius - the radius of the hemisphere
 * northSouth - whether the hemisphere is 'north' or 'south'

Example
-------
To create a glass 'north' hemisphere with a radius of 20 blocks...

    hemisphere0(blocks.glass, 20, 'north');

![hemisphere example](img/hemisphereex2.png)

Drone.rainbow() method
======================
Creates a Rainbow.

Parameters
----------

 * radius (optional - default:18) - The radius of the rainbow

Example
-------
    
    var d = new Drone();
    d.rainbow(30);

![rainbow example](img/rainbowex1.png)

Drone.spiral_stairs() method
============================
Constructs a spiral staircase with slabs at each corner.

Parameters
----------

 * stairBlock - The block to use for stairs, should be one of the following...
   - 'oak'
   - 'spruce'
   - 'birch'
   - 'jungle'
   - 'cobblestone'
   - 'brick'
   - 'stone'
   - 'nether'
   - 'sandstone'
   - 'quartz'
 * flights - The number of flights of stairs to build.

![Spiral Staircase](img/spiralstair1.png)

Example
-------
To construct a spiral staircase 5 floors high made of oak...

    spiral_stairs('oak', 5);

 
## The arrows mod adds fancy arrows to the game.
  
### Usage: 

    /js var arrows = require('./arrows/arrows')

  * `/js arrows.sign()` turns a targeted sign into a Arrows menu
  * `/js arrows.normal()` sets arrow type to normal.
  * `/js arrows.explosive()` - makes arrows explode.
  * `/js arrows.teleport()` - makes player teleport to where arrow has landed.
  * `/js arrows.flourish()` - makes a tree grow where the arrow lands.
  * `/js arrows.lightning()` - lightning strikes where the arrow lands.
  * `/js arrows.firework()` - A firework launches where the the arrow lands.

  All of the above functions can take an optional player object or name as 
  a parameter. E.g.
  
  `/js arrows.explosive('player23')` makes player23's arrows explosive.
 
Classroom Module
================
The `classroom` object contains a couple of utility functions for use
in a classroom setting. The goal of these functions is to make it
easier for tutors to facilitate ScriptCraft for use by students in a
classroom environment. Although granting ScriptCraft access to
students on a shared server is potentially risky (Students can
potentially abuse it), it is slighlty less risky than granting
operator privileges to each student. (Enterprising students will
quickly realise how to grant themselves and others operator privileges
once they have access to ScriptCraft).

The goal of this module is not so much to enforce restrictions
(security or otherwise) but to make it easier for tutors to setup a shared server
so students can learn Javascript.

classroom.allowScripting() function
===================================
Allow or disallow anyone who connects to the server (or is already
connected) to use ScriptCraft. This function is preferable to granting 'ops' privileges 
to every student in a Minecraft classroom environment.

Parameters
----------

 * canScript : true or false

Example
-------
To allow all players (and any players who connect to the server) to
use the `js` and `jsp` commands...

    /js classroom.allowScripting(true)

To disallow scripting (and prevent players who join the server from using the commands)...

    /js classroom.allowScripting(false)

Only ops users can run the classroom.allowScripting() function - this is so that students 
don't try to bar themselves and each other from scripting.

## Minigame: Guess the number

### Example
    
    /js Game_NumberGuess.start()

... Begins a number-guessing game where you must guess the number (between 1 and 10) chosen by the computer.  
   
 A basic number-guessing game that uses the Bukkit Conversation API.
