'use strict';
/************************************************************************

## Modules in Scriptcraft

ScriptCraft has a simple module loading system. In ScriptCraft, files
and modules are in one-to-one correspondence. As an example, foo.js
loads the module circle.js in the same directory. 
*ScriptCraft now uses the same module system as Node.js - see [Node.js Modules][njsmod] for more details.*

[njsmod]: http://nodejs.org/api/modules.html

The contents of foo.js:

    var circle = require('./circle.js');
    console.log( 'The area of a circle of radius 4 is '
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
subdirectory is created in the craftbukkit/plugins directory. If your
craftbukkit directory is called 'craftbukkit' then the new
subdirectories will be ...

 * craftbukkit/plugins/scriptcraft/
 * craftbukkit/plugins/scriptcraft/plugins
 * craftbukkit/plugins/scriptcraft/modules
 * craftbukkit/plugins/scriptcraft/lib

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

    exports.greet = function(player) {
        player.sendMessage('Hello ' + player.name);
    };

... then `greet` becomes a global function and can be used at the
in-game (or server) command prompt like so...

    /js greet(self)

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

### plugins sub-directories

As of December 24 2013, the `scriptcraft/plugins` directory has the following sub-directories...

 * drone - Contains the drone module and drone extensions. Drone was the first scriptcraft module.
 * mini-games - Contains mini-games 
 * arrows - The arrows module - Changes the behaviour of Arrows: Explosive, Fireworks, Teleportation etc.
 * signs - The signs module (includes example signs) - create interactive signs.
 * chat - The chat plugin/module 
 * alias - The alias plugin/module - for creating custom aliases for commonly used commands.
 * home - The home module - for setting homes and visiting other homes.

## Global variables

There are a couple of special javascript variables available in ScriptCraft...
 
### __plugin variable
The ScriptCraft JavaPlugin object.

### server variable
The Minecraft Server object

### self variable
The current player. (Note - this value should not be used in
multi-threaded scripts or event-handling code - it's not
thread-safe). This variable is only safe to use at the in-game prompt
and should *never* be used in modules. For example you can use it here...

    /js console.log(self.name)

... but not in any javascript module you create yourself or in any
event handling code. `self` is a temporary short-lived variable which
only exists in the context of the in-game or server command prompts.

### config variable
ScriptCraft configuration - this object is loaded and saved at startup/shutdown.

### events variable
The events object is used to add new event handlers to Minecraft.

## Module variables
The following variables are available only within the context of Modules. (not available at in-game prompt).

### &#95;&#95;filename variable
The current file - this variable is only relevant from within the context of a Javascript module.

### &#95;&#95;dirname variable
The current directory - this variable is only relevant from within the context of a Javascript module.

## Global functions

ScripCraft provides some global functions which can be used by all plugins/modules...

### echo function

The `echo()` function displays a message on the in-game screen. The
message is displayed to the `self` player (this is usually the player
who issued the `/js` or `/jsp` command).

#### Example

    /js echo('Hello World')

For programmers familiar with Javascript web programming, an `alert`
function is also provided.  `alert` works exactly the same as `echo`
e.g. `alert('Hello World')`.

#### Notes

The `echo` and `alert` functions are provided as convenience functions
for beginning programmers. The use of these 2 functions is not
recommended in event-handling code or multi-threaded code. In such
cases, if you want to send a message to a given player then use the
Bukkit API's [Player.sendMessage()][plsm] function instead.

[plsm]: http://jd.bukkit.org/dev/apidocs/org/bukkit/command/CommandSender.html#sendMessage(java.lang.String)

### require() function

ScriptCraft's `require()` function is used to load modules. The
`require()` function takes a module name as a parameter and will try
to load the named module.

#### Parameters

 * modulename - The name of the module to be loaded. Can be one of the following...

   - A relative file path (with or without `.js` suffix)
   - An absolute file path (with or without `.js` suffix)
   - A relative directory path (uses node.js rules for directories)
   - An absolute directory path (uses node.js rules for directories)
   - A name of the form `'events'` - in which case the `lib` directory and `modules` directories are searched for the module.

#### Return

require() will return the loaded module's exports.

### scload() function 

#### No longer recommended for use by Plugin/Module developers (deprecated)

scload() should only be used to load .json data.

#### Parameters

 * filename - The name of the file to load.
 * warnOnFileNotFound (optional - default: false) - warn if the file was not found.

#### Returns

scload() will return the result of the last statement evaluated in the file.

#### Example

    scload("myFile.js"); // loads a javascript file and evaluates it.

    var myData = scload("myData.json"); // loads a javascript file and evaluates it - eval'd contents are returned.

##### myData.json contents...

    { players: {
        walterh: {
          h: ["jsp home {1}"],
          sunny:["time set 0",
                 "weather clear"]
        }
      }
    }

### scsave() function

The scsave() function saves an in-memory javascript object to a
specified file. Under the hood, scsave() uses JSON (specifically
json2.js) to save the object. Again, there will usually be no need to
call this function directly as all javascript plugins' state are saved
automatically if they are declared using the `plugin()` function.  Any
in-memory object saved using the `scsave()` function can later be
restored using the `scload()` function.

#### Parameters

 * objectToSave : The object you want to save.
 * filename : The name of the file you want to save it to.

#### Example

    var myObject = { name: 'John Doe',
                     aliases: ['John Ray', 'John Mee'],
                     date_of_birth: '1982/01/31' };
    scsave(myObject, 'johndoe.json');

##### johndoe.json contents...

    { "name": "John Doe", 
      "aliases": ["John Ray", "John Mee"], 
      "date_of_birth": "1982/01/31" 
    };

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
 * isPersistent (boolean - optional) : Specifies whether or not the
   plugin/object state should be loaded and saved by ScriptCraft.

#### Example

See chat/color.js for an example of a simple plugin - one which lets
players choose a default chat color. See also [Anatomy of a
ScriptCraft Plugin][anatomy].
 
[anatomy]: ./Anatomy-of-a-Plugin.md

### command() function

The `command()` function is used to expose javascript functions for
use by non-operators (regular players). Only operators should be
allowed use raw javascript using the `/js ` command because it is too
powerful for use by regular players and can be easily abused. However,
the `/jsp ` command lets you (the operator / server administrator /
plugin author) safely expose javascript functions for use by players.

#### Parameters
 
 * commandName : The name to give your command - the command will 
   be invoked like this by players `/jsp commandName`
 * commandFunction: The javascript function which will be invoked when
   the command is invoked by a player. The callback function in turn
   takes 2 parameters...

   * params : An Array of type String - the list of parameters 
     passed to the command.
   * sender : The [CommandSender][bukcs] object that invoked the
     command (this is usually a Player object but can be a Block
     ([BlockCommandSender][bukbcs]).

 * options (Array - optional) : An array of command options/parameters
   which the player can supply (It's useful to supply an array so that
   Tab-Completion works for the `/jsp ` commands.
 * intercepts (boolean - optional) : Indicates whether this command
   can intercept Tab-Completion of the `/jsp ` command - advanced
   usage - see alias/alias.js for example.

#### Example

See chat/colors.js or alias/alias.js or homes/homes.js for examples of
how to use the `command()` function.

### setTimeout() function

This function mimics the setTimeout() function used in browser-based
javascript.  However, the function will only accept a function
reference, not a string of javascript code.  Where setTimeout() in the
browser returns a numeric value which can be subsequently passed to
clearTimeout(), This implementation returns a [BukkitTask][btdoc]
object which can be subsequently passed to ScriptCraft's own
clearTimeout() implementation.

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

This function mimics the setInterval() function used in browser-based
javascript.  However, the function will only accept a function
reference, not a string of javascript code.  Where setInterval() in
the browser returns a numeric value which can be subsequently passed
to clearInterval(), This implementation returns a [BukkitTask][btdoc]
object which can be subsequently passed to ScriptCraft's own
clearInterval() implementation.

If Node.js supports setInterval() then it's probably good for
ScriptCraft to support it too.

[btdoc]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scheduler/BukkitTask.html

### clearInterval() function

A scriptcraft implementation of clearInterval().

### refresh() function

The refresh() function can be used to only reload the ScriptCraft
plugin (it's like the `reload` command except it only reloads
ScriptCraft). The refresh() function will ...

1. Disable the ScriptCraft plugin.
2. Unload all event listeners associated with the ScriptCraft plugin.
3. Enable the ScriptCraft plugin.

... refresh() can be used during development to reload only scriptcraft javascript files.
See [issue #69][issue69] for more information.

[issue69]: https://github.com/walterhiggins/ScriptCraft/issues/69

### addUnloadHandler() function

The addUnloadHandler() function takes a callback function as a
parameter. The callback will be called when the ScriptCraft plugin is
unloaded (usually as a result of a a `reload` command or server
shutdown).

This function provides a way for ScriptCraft modules to do any
required cleanup/housekeeping just prior to the ScriptCraft Plugin
unloading.

***/

/*
  wph 20130124 - make self, plugin and server public - these are far more useful now that tab-complete works.
*/
var global = this;
var server = org.bukkit.Bukkit.server;
/*
  private implementation
*/
function __onEnable (__engine, __plugin, __script)
{
    var File = java.io.File
    ,FileReader = java.io.FileReader
    ,BufferedReader = java.io.BufferedReader
    ,PrintWriter = java.io.PrintWriter
    ,FileWriter = java.io.FileWriter;

    var _canonize = function(file){ 
        return "" + file.getCanonicalPath().replaceAll("\\\\","/"); 
    };
    
    var libDir = __script.parentFile; // lib (assumes scriptcraft.js is in craftbukkit/plugins/scriptcraft/lib directory
    var jsPluginsRootDir = libDir.parentFile; // scriptcraft
    var jsPluginsRootDirName = _canonize(jsPluginsRootDir);
    var logger = __plugin.logger;

    /*
      Save a javascript object to a file (saves using JSON notation)
    */
    var _save = function(object, filename){
        var objectToStr = null;
        try{
            objectToStr = JSON.stringify(object,null,2);
        }catch(e){
            print("ERROR: " + e.getMessage() + " while saving " + filename);
            return;
        }
        var f = (filename instanceof File) ? filename : new File(filename);
        var out = new PrintWriter(new FileWriter(f));
        out.println( objectToStr );
        out.close();
    };
    /*
      make sure eval is present
     */
    if (typeof eval == 'undefined'){
        global.eval = function(str){
            return __engine.eval(str);
        };
    }
        
    /*
      Load the contents of the file and evaluate as javascript
     */
    var _load = function(filename,warnOnFileNotFound)
    {
        var result = null
        ,file = filename
        ,r = undefined;
        
        if (!(filename instanceof File))
            file = new File(filename);

        var canonizedFilename = _canonize(file);
        
        if (file.exists()) {
            var parent = file.getParentFile();
            var reader = new FileReader(file);
            var br = new BufferedReader(reader);
            var code = "";
            var wrappedCode;
            try{
                while ((r = br.readLine()) !== null) 
                    code += r + "\n";

                wrappedCode = "(" + code + ")";
                result = __engine.eval(wrappedCode);
                // issue #103 avoid side-effects of || operator on Mac Rhino
            }catch (e){
                logger.severe("Error evaluating " + canonizedFilename + ", " + e );
            }
            finally {
                try {
                    reader.close();
                }catch (re){
                    // fail silently on reader close error
                }
            }
        }else{
            if (warnOnFileNotFound) 
                logger.warning(canonizedFilename + " not found");
        }
        return result;
    };
    /*
      now that load is defined, use it to load a global config object
     */
    var config = _load(new File(jsPluginsRootDir, 'data/global-config.json' ));
    if (!config)
        config = {verbose: false};
    global.config = config;
    global.__plugin = __plugin;
    /*
      wph 20131229 Issue #103 JSON is not bundled with javax.scripting / Rhino on Mac.
     */
    var jsonLoaded = __engine["eval(java.io.Reader)"](new FileReader(new File(jsPluginsRootDirName + '/lib/json2.js')));

    /*
      Unload Handlers
    */
    var unloadHandlers = [];
    var _addUnloadHandler = function(f) {
        unloadHandlers.push(f);
    };
    var _runUnloadHandlers = function() {
        for (var i = 0; i < unloadHandlers.length; i++) {
            unloadHandlers[i]();
        }
    };

    global.refresh = function(){
        __plugin.pluginLoader.disablePlugin(__plugin);
        __plugin.pluginLoader.enablePlugin(__plugin);
    };
    
    var _echo = function (msg) {
        if (typeof self == "undefined"){
            return;
        }
        self.sendMessage(msg);
    };

    global.echo = _echo;
    global.alert = _echo;
    global.scload = _load;
    global.scsave = _save;
    
    global.addUnloadHandler = _addUnloadHandler;

    var configRequire = _load(jsPluginsRootDirName + '/lib/require.js',true);
    /*
      setup paths to search for modules
     */
    var modulePaths = [jsPluginsRootDirName + '/lib/',
                       jsPluginsRootDirName + '/modules/'];

    if (config.verbose){
        logger.info('Setting up CommonJS-style module system. Root Directory: ' + jsPluginsRootDirName);
        logger.info('Module paths: ' + JSON.stringify(modulePaths));
    }
    var requireHooks = {
        loading: function(path){
            if (config.verbose)
                logger.info('loading ' + path);
        },
        loaded: function(path){
            if (config.verbose)
                logger.info('loaded  ' + path);
        }
    };
    global.require = configRequire(jsPluginsRootDirName, modulePaths,requireHooks );

    require('js-patch')(global);
    global.console = require('console');
    /*
      setup persistence
     */
    require('persistence')(jsPluginsRootDir,global);

    global.command = require('command').command;
    var plugins = require('plugin');
    global.__onTabComplete = require('tabcomplete');
    global.plugin = plugins.plugin;

    var events = require('events');
    events.on('server.PluginDisableEvent',function(l,e){
        // save config
        _save(global.config, new File(jsPluginsRootDir, 'data/global-config.json' ));

        _runUnloadHandlers();
        org.bukkit.event.HandlerList['unregisterAll(org.bukkit.plugin.Plugin)'](__plugin);
    });
    // wph 20131226 - make events global as it is used by many plugins/modules
    global.events = events;


    global.__onCommand = function( sender, cmd, label, args) {
        var jsArgs = [];
        var i = 0;
        for (;i < args.length; i++) jsArgs.push('' + args[i]);
 
        var result = false;
        var cmdName = ('' + cmd.name).toLowerCase();
        if (cmdName == 'js')
        {
            result = true;
            var fnBody = jsArgs.join(' ');
            global.self = sender;
            global.__engine = __engine;
            try { 
                var jsResult = __engine.eval(fnBody);
                if (jsResult)
                    sender.sendMessage(jsResult);
            }catch (e){
                logger.severe("Error while trying to evaluate javascript: " + fnBody + ", Error: "+ e);
                throw e;
            }finally{
                delete global.self;
                delete global.__engine;
            }
        }
        if (cmdName == 'jsp'){
            command.exec(jsArgs, sender);
            result = true;
        }
        return result;
    };

    plugins.autoload(jsPluginsRootDir);
    /*
      wph 20140102 - warn if legacy 'craftbukkit/js-plugins' or 'craftbukkit/scriptcraft' directories are present
     */
    var cbPluginsDir = jsPluginsRootDir.parentFile;
    var cbDir = new File(cbPluginsDir.canonicalPath).parentFile;
    var legacyDirs = [
        new File(cbDir, 'js-plugins'), 
        new File(cbDir, 'scriptcraft')
    ];
    var legacyExists = false;
    for (var i = 0; i < legacyDirs.length; i++){
        if (legacyDirs[i].exists() && legacyDirs[i].isDirectory()){
            legacyExists = true;
            console.warn('Legacy ScriptCraft directory %s was found. This directory is no longer used.',
                         legacyDirs[i].canonicalPath);
        }
    }
    if (legacyExists){
        console.info('Please note that the working directory for %s is %s', 
                     __plugin, jsPluginsRootDir.canonicalPath);
    }
}
