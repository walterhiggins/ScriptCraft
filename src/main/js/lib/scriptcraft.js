'use strict';
/*global require*/
/************************************************************************

## Modules in Scriptcraft

 ScriptCraft has a simple module loading system. In ScriptCraft, files
 and modules are in one-to-one correspondence. As an example, foo.js
 loads the module circle.js in the same directory.
 *ScriptCraft now uses the same module system as Node.js - see [Node.js Modules][njsmod] for more details.*

 [njsmod]: http://nodejs.org/api/modules.html

 The contents of foo.js:

 ```javascript
 var circle = require('./circle.js');
 console.log( 'The area of a circle of radius 4 is '
             + circle.area(4));
 ```

 The contents of circle.js:

 ```javascript
 var PI = Math.PI;
 exports.area = function (r) {
   return PI * r * r;
 };
 exports.circumference = function (r) {
   return 2 * PI * r;
 };
 ```

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
 `scriptcraft` subdirectory is created. If your minecraft server
 directory is called 'mcserver' then the new subdirectories will be ...

 * mcserver/scriptcraft/
 * mcserver/scriptcraft/plugins
 * mcserver/scriptcraft/modules
 * mcserver/scriptcraft/lib

 ... The `plugins`, `modules` and `lib` directories each serve a different purpose.

### The `plugins` directory

 At server startup the ScriptCraft Java plugin is loaded and begins
 automatically loading and executing all of the modules (JavaScript
 files with the extension `.js`) it finds in the `scriptcraft/plugins`
 directory. All modules in the plugins directory are automatically
 loaded into the `global` namespace. What this means is that anything a
 module in the `plugins` directory exports becomes a global
 variable. For example, if you have a module greeting.js in the plugins
 directory....

 ```javascript
 exports.greet = function(player) {
   echo(player, 'Hello ' + player.name);
 };
 ```

 ... then `greet` becomes a global function and can be used at the
 in-game (or server) command prompt like so...

 /js greet(self)

 ... This differs from how modules (in NodeJS and CommonJS
 environments) normally work. If you want your module to be exported
 globally, put it in the `plugins` directory. If you don't want your
 module to be exported globally but only want it to be used by other
 modules, then put it in the `modules` directory instead. If you've
 used previous versions of ScriptCraft and have put your custom
 JavaScript modules in the `js-plugins` directory, then put them in the
 `scriptcraft/plugins` directory. To summarise, modules in this directory are ...

 * Automatically loaded and run at server startup.
 * Anything exported by modules becomes a global variable.

### The `modules` directory

 The `scriptcraft/modules` directory is where you should place your modules if you
 don't want to export globally. In JavaScript, it's considered best
 practice not to have too many global variables, so if you want to
 develop modules for others to use, or want to develop more complex
 mods then your modules should be placed in the `modules` directory.
 *Modules in the `modules` directory are not automatically loaded at
 startup*, instead, they are loaded and used by other modules/plugins
 using the standard `require()` function. This is the key difference
 between modules in the `plugins` directory and modules in the
 `modules` directory. Modules in the `plugins` directory are
 automatically loaded and exported in to the global namespace at server
 startup, modules in the `modules` directory are not.

 To be clear, the modules and plugins directories don't contain scripts based
 on what they do, but based on when they are required to load. When looking for
 the source code for specific functionality, look in both directories for related files.
 Some functionality, like the Drone, is split into *both* `plugins` and `modules`.

### The `lib` directory

 Modules in the `scriptcraft/lib` directory are for use by ScriptCraft and some
 core functions for use by module and plugin developers are also
 provided. The `lib` directory is for internal use by ScriptCraft.
 Modules in this directory are not automatically loaded nor are they
 globally exported.

### The `plugins` directory contents

 The `scriptcraft/plugins` directory includes the following sub-directories and
 individual .js files.

 * alias folder - For creating custom aliases for commonly-used commands.
 * commando folder - commando is a plugin which can be used to add completely new commands
 to Minecraft. Be sure the look at the documentation and code for commando.
 * drone - Contains the drone module and drone extensions. Drone was the first
 ScriptCraft module. Note that there is a drone folder under plugins, which is loaded
 at startup, and another drone folder with scripts that get loaded only as required.
 * arrows - The arrows.js file contains a module that changes the behaviour of
 Arrows: Explosive, Fireworks, Teleportation etc.
 * homes - For setting homes and visiting other homes.
 * mini-games - Currently contains NumberGuess and cow-clicker. Look at the code and have some
 fun while learning how the code works.
 * signs - Contains examples for the signs functionality defined in
 * scriptcraft/modules/signs.

## Global variables

 There are a few special JavaScript variables available in ScriptCraft...

### `__plugin` variable
 The ScriptCraft JavaPlugin object.

### `server` variable
 The Minecraft Server object

### `self` variable
 The current player. (Note - this value should not be used in multi-threaded scripts
 or event-handling code - it's not thread-safe). This variable is only safe to use
 at the in-game prompt and should *never* be used in modules. For example you
 can use it here...

 `/js console.log(self.name)`

 ... but not in any JavaScript module you create yourself or in any
 event handling code. `self` is a temporary short-lived variable which
 only exists in the context of the in-game or server command prompts.

### `config` variable
 ScriptCraft configuration - this JSON object is loaded and saved at startup/shutdown.

### `events` variable
 The events object is used to add new event handlers to Minecraft.

## Module variables
 The following variables are available only within the context of Modules. (not available at in-game prompt).

### `__filename` variable
 The name of the current .js file - this variable is only relevant from within the context of a JavaScript module.

### `__dirname` variable
 The current directory - this variable is only relevant from within the context of a JavaScript module.

## Global functions

 ScriptCraft provides some global functions which can be used by all plugins/modules...

### `echo()` function

 The `echo()` function displays a message on the in-game screen.

#### Example

 /js echo( self, 'Hello World')

 For programmers familiar with JavaScript web programming, an `alert`
 function is also provided.  `alert` works exactly the same as `echo`
 e.g. `alert( self, 'Hello World')`.

### `require()` function

 ScriptCraft's `require()` function is used to load modules. The `require()`
 function takes a module name as a parameter and will try to load the named module.

#### Parameters

 * modulename - The name of the module to be loaded. Can be one of the following...

 - A relative file path (with or without `.js` suffix)
 - An absolute file path (with or without `.js` suffix)
 - A relative directory path (uses node.js rules for directories)
 - An absolute directory path (uses node.js rules for directories)
 - A name of the form `'events'` (quoted name) - in which case the `lib` directory and `modules` directories are searched for the module.

#### Return

 require() will return the loaded module's exports.

### command() function

 The `command()` function is used to expose JavaScript functions for use by
 non-operators (regular players). Only operators should be allowed use raw
 JavaScript using the `/js` command because it is too powerful for use by
 regular players and can be easily abused. However, the command() function and
 the `/jsp` command let you (the operator / server administrator / plugin author)
 safely expose JavaScript functions for use by players.

#### Parameters

 In prior versions there were three parameters: Name, Options, Intercepts.
 There are now optionally four parameters: Name, Function, Options, Intercepts.

 * Name : The named JavaScript function which will be invoked when the
 command is invoked by a player. In earlier versions, without the second Function
 parameter, the name of the function would be used as the command name. So it
 was important to name the function accordingly.
 * Function : If the second option is a Function (in-line anonymous, or reference),
 then this function will be called when the Name is requested. See the example below.
 * Options (Array|Function - optional) : An array of command options/parameters
 which the player can supply (It's useful to supply an array so that Tab-Completion
 works for the `/jsp` commands. If a function is supplied instead of an array then
 the function will be invoked at TAB-completion time and should return an array of strings.
 * Intercepts (boolean - optional) : If this option is true, then the function goes into
 a list of backup handlers. When an unrecognized /jsp command is entered, all of the
 intercept functions are executed in the order in which they were registered. Any or all
 of these functions can return a value of true to indicate that they processed the command.
 All intercepts are executed regardless of whether any of them returned a true value. See
 the example below.

#### The callback function

 When the `/jsp` command is invoked, the callback function itself takes 2 parameters...

 * params : An Array of type String - the list of parameters passed to the command.
 * sender : The [CommandSender][bukcs] object that invoked the command (this is
 usually a Player object but can be a Block ([BlockCommandSender][bukbcs]).

#### Examples

 ```javascript
 // javascript code
 function boo( params, sender) {
   echo( sender, params[0] );
 }
 command( boo );
 ```

##### in-game execution

 /jsp boo Hi!
 > Hi!

 To use a callback for options (TAB-Completion) ...

 ```javascript
 var utils = require('utils');
 function boo( params, sender ) {
   var receiver = server.getPlayer( params[0] );
   if ( receiver ){
     echo( receiver, sender.name + ' says boo!');
   }
 }
 command( boo, utils.playerNames );
 ```

 Anonymous function with different name:

 ```javascript
 function hello(args,invoker) { echo( invoker, 'Hi Back'); }
 var myCmd = command( 'hi',
   function(  params, invoker ) { echo( invoker, 'Hi Back'); }
 );
 ```

 Function with different name:

 ```javascript
 function hello(args,invoker) { echo( invoker, 'Hi Back'); }
 var myCmd = command( 'hi', hello,'',false);
 ```

 Intercept example:

 ```javascript
 function handleit(args,invoker) {
   // decide whether to
   return true;
   // or
   return false;
 }
 command(handleit,'',true); // no name so other params shift down one
 ```

 Now if a player enters "/jsp BLAH aaa bbb ccc". There is no callback named BLAH,
 so all intercepts are executed. The handleit function is a registered intercept and
 will get the arguments from the command line as well as the player object. If this
 function doesn't know what to do with the data, it can return false. If all intercepts
 return false, then the player will see 'Command BLAH is not recognised'. If any of
 the interecepts return true then no extra message is returned. It is up to the developer
 and/or server administrator to decide which intercepts handle various kinds of requests,
 and related intercepts might need a way to exchange data to ensure more than one does
 not handle a single request, if that is in line with the desired functionality.

 See alias/alias.js or homes/homes.js for more examples of how to use the `command()` function.

### setTimeout() function

 This function mimics the setTimeout() function used in browser-based JavaScript. However,
 the function will only accept a function reference, not a string of JavaScript code.
 Where setTimeout() in the browser returns a numeric value which can be subsequently
 passed to clearTimeout(), this implementation returns an object which can be subsequently
 passed to ScriptCraft's own clearTimeout() implementation.

 If Node.js supports setTimeout() then it's probably good for ScriptCraft to support it too.

#### Example

 ```javascript
 //
 // start a storm in 5 seconds
 //
 setTimeout( function() {
   var world = server.worlds.get(0);
   world.setStorm(true);
 }, 5000);
 ```

### clearTimeout() function

 A ScriptCraft implementation of clearTimeout().

### setInterval() function

 This function mimics the setInterval() function used in browser-based JavaScript. However,
 the function will only accept a function reference, not a string of JavaScript code.
 Where setInterval() in the browser returns a numeric value which can be subsequently
 passed to clearInterval(), this implementation returns an object which can be subsequently
 passed to ScriptCraft's own clearInterval() implementation.

### clearInterval() function

 A ScriptCraft implementation of clearInterval().

### refresh() function

 The refresh() function can be used to only reload the ScriptCraft plugin (it's like
 the `reload` command except it only reloads ScriptCraft). The refresh() function will ...

 1. Disable the ScriptCraft plugin.
 2. Unload all event listeners associated with the ScriptCraft plugin.
 3. Cancel all timed tasks (created by `setInterval` & `setTimeout`)
 4. Enable the ScriptCraft plugin.

 ... refresh() can be used during development to reload only ScriptCraft JavaScript files.
 See [issue #69][issue69] for more information.

 By default, if `self` is defined at runtime, it checks, whether `self` is server
 operator, otherwise fails with message. This behavivor can be modified using
 `skipOpCheck` parameter (useful, if you are doing some custom premission checks
 before calling this function).

#### Parameters

 * skipOpCheck (boolean - optional) : If true, the function won't check if `self` is a server operator.

 [issue69]: https://github.com/walterhiggins/ScriptCraft/issues/69

### addUnloadHandler() function

 The addUnloadHandler() function takes a callback function as a parameter. The
 callback will be called when the ScriptCraft plugin is unloaded (usually as a
 result of a a `reload` command or server shutdown).

 This function provides a way for ScriptCraft modules to do any required
 cleanup/housekeeping just prior to the ScriptCraft Plugin unloading.

### isOp() function

 This function takes a single parameter and returns true if it's an operator or has operator-level privileges.


# Deprecated functions

 "Deprecated" means "no longer used". The code remains and may even work but it is no
 longer maintained and should not be used for future development. Deprecated code
 may be removed in the future causing old code that used it to break.

 The documentation here describes how the code works/worked because there is still old
 code in the field that will be found with these functions. Authors are encouraged
 to replace deprecated code wherever it is found with the latest supported functionality.

### `scload()` function

#### Deprecated
 No longer recommended for use by Plugin/Module developers.

 scload() was only used to load .json data.

#### Parameters

 * filename - The name of the file to load.
 * warnOnFileNotFound (optional - default: false) - warn if the file was not found.

#### Returns

 scload() will return the result of the last statement evaluated in the file.

#### Example

 scload("myFile.js"); // loads a JavaScript file and evaluates it.

 var myData = scload("myData.json"); // loads a JavaScript file and evaluates it - eval'd contents are returned.

##### myData.json contents...

 { players: {
     walterh: {
       h: ["jsp home {1}"],
       sunny:["time set 0","weather clear"]
     }
   }
 }

 **Remember: Use persistence for loading and saving data, not scload() or scsave().**

### `scsave()` function

#### Deprecated
 No longer recommended for use by Plugin/Module developers.

 The scsave() function saves an in-memory JavaScript object to a
 specified file. Under the hood, scsave() uses JSON (specifically
 json2.js) to save the object. There will usually be no need to call
 this function directly - If you want to have a JavaScript object
 automatically loaded at startup and saved on shutdown then use the
 `persist()` module. The `persist()` module uses scsave and scload
 under the hood.  Any in-memory object saved using the `scsave()`
 function can later be restored using the `scload()` function.

#### Parameters

 * objectToSave : The object you want to save.
 * filename : The name of the file you want to save it to.

#### Example

 ```javascript
 var myObject = { name: 'John Doe',
                  aliases: ['John Ray', 'John Mee'],
                  date_of_birth: '1982/01/31' };
 scsave(myObject, 'johndoe.json');
 ```

##### johndoe.json contents...

 { "name": "John Doe",
   "aliases": ["John Ray", "John Mee"],
   "date_of_birth": "1982/01/31"
 };

 **Remember: Use persistence for loading and saving data, not scload() or scsave().**

### `plugin()` function

#### Internal Use Only
 No longer recommended for use by Plugin/Module developers.

 Please refer to [Anatomy of a ScriptCraft Plugin][anatomy] for an up-to-date
 step-by-step guide to creating a plugin which uses persistence (loading and saving data).

 The `plugin()` function is used internally to declare a JavaScript module
 whose state you want to have managed by ScriptCraft - that is - a
 Module whose state will be loaded at start up and saved at shut down.
 A plugin is just a regular JavaScript object whose state is managed by
 ScriptCraft. The only member of the plugin which whose persistence is
 managed by ScriptCraft is `store` - this special member will be
 automatically saved at shutdown and loaded at startup by
 ScriptCraft. This makes it easier to write plugins which need to
 persist data.

#### Parameters

 * pluginName (String) : The name of the plugin - this becomes a global variable.
 * pluginDefinition (Object) : The various functions and members of the plugin object.
 * isPersistent (boolean - optional) : Specifies whether or not the
 plugin/object state should be loaded and saved by ScriptCraft.

#### Example

 See also [Anatomy of a ScriptCraft Plugin][anatomy].

 // TODO Need example

 The chat/color.js was an example here of a simple plugin - one which lets
 players choose a default chat color. that module has temporarily (?) been removed.

 **Remember: Use persistence for loading and saving data.**

 [anatomy]: ./Anatomy-of-a-Plugin.md

***/
/*
 wph 20130124 - make self, plugin and server public - these are far more useful now that tab-complete works.
 */
var global = this;
var server;
global.nashorn = typeof Java !== 'undefined';
/*
 private implementation
 */
var __onDisableImpl;

function __onDisable(__engine, __plugin) {
    __onDisableImpl(__engine, __plugin);
}

function __onEnable(__engine, __plugin, __script) {
    function _echo() {
        var sender, msg;
        if(arguments.length == 2) {
            sender = arguments[0];
            msg = arguments[1];
        } else {
            if(typeof self == 'undefined') {
                return;
            }
            sender = self;
            msg = arguments[0];
        }
        if(__plugin.canary) {
            sender.message(msg);
        } else if(__plugin.bukkit) {
            sender.sendMessage(msg);
        } else {
            logger.info(CORE_UNKNOWN);
        }
    } // end echo()
    function _canonize(file) {
        return '' + file.getCanonicalPath().replaceAll('\\\\', '/');
    }
    /*
     Save a JavaScript object to a file (saves using JSON notation)
     */
    function _save(objToSave, filename) {
        var objectToStr = null,
            f,
            out;
        try {
            objectToStr = JSON.stringify(objToSave, null, 2);
        } catch(e) {
            console.error('ERROR: ' + e.getMessage() + ' while saving ' + filename);
            return;
        }
        f = (filename instanceof File) ? filename : new File(filename);
        out = new PrintWriter(new FileWriter(f));
        out.println(objectToStr);
        out.close();
    }

    function _loadJSON(filename) {
        var result = null,
            file = filename,
            r,
            reader,
            br,
            contents;
        if(!(filename instanceof File)) {
            file = new File(filename);
        }
        var canonizedFilename = _canonize(file);
        if(file.exists()) {
            reader = new FileReader(file);
            br = new BufferedReader(reader);
            contents = '';
            try {
                while((r = br.readLine()) !== null) {
                    contents += r + '\n';
                }
                result = JSON.parse(contents);
            } catch(e) {
                logError('Error evaluating ' + canonizedFilename + ', ' + e);
            } finally {
                try {
                    reader.close();
                } catch(re) {
                    // fail silently on reader close error
                }
            }
        }
        return result;
    }
    /*
     Load the contents of the file and evaluate as JavaScript
     */
    function _load(filename, warnOnFileNotFound) {
        var result = null,
            file = filename,
            r,
            parent,
            reader,
            br,
            code,
            wrappedCode;
        if(!(filename instanceof File)) {
            file = new File(filename);
        }
        var canonizedFilename = _canonize(file);
        if(file.exists()) {
            reader = new FileReader(file);
            br = new BufferedReader(reader);
            code = '';
            try {
                while((r = br.readLine()) !== null) {
                    code += r + '\n';
                }
                wrappedCode = '(' + code + ')';
                result = __engine.eval(wrappedCode);
                // issue #103 avoid side-effects of || operator on Mac Rhino
            } catch(e) {
                logError('Error evaluating ' + canonizedFilename + ', ' + e);
            } finally {
                try {
                    reader.close();
                } catch(re) {
                    // fail silently on reader close error
                }
            }
        } else {
            if(warnOnFileNotFound) {
                logWarn(canonizedFilename + ' not found');
            }
        }
        return result;
    } // end _load()
    function _isOp(sender) {
        if(__plugin.canary) {
            return sender.receiverType.name() == 'SERVER' || Canary.ops().isOpped(sender);
        } else if(__plugin.bukkit) {
            return sender.op;
        } else {
            logger.info(CORE_UNKNOWN);
        }
    }

    function _refresh(skipOpCheck) {
        if(!skipOpCheck && typeof self !== 'undefined') {
            if(!_isOp(self)) return echo(self, 'Only operators can refresh()');
        }
        if(__plugin.canary) {
            var pluginName = __plugin.name;
            Canary.manager().disablePlugin(pluginName);
            Canary.manager().enablePlugin(pluginName);
        } else if(__plugin.bukkit) {
            __plugin.pluginLoader.disablePlugin(__plugin);
            org.bukkit.event.HandlerList["unregisterAll(org.bukkit.plugin.Plugin)"](__plugin);
            server.scheduler.cancelTasks(__plugin);
            __plugin.pluginLoader.enablePlugin(__plugin);
        } else {
            logger.info(CORE_UNKNOWN);
        }
    } // end _refresh()
    function _onDisable(evt) {
        // save config
        _save(global.config, new File(jsPluginsRootDir, 'data/global-config.json'));
        _runUnloadHandlers();
    }

    function _addUnloadHandler(f) {
        unloadHandlers.push(f);
    }

    function _runUnloadHandlers() {
        for(var i = 0; i < unloadHandlers.length; i++) {
            unloadHandlers[i]();
        }
    }

    function __onCommand() {
        var jsArgs = [],
            i = 0,
            jsResult,
            result,
            cmdName,
            sender,
            args,
            cmd,
            label,
            fnBody;
        if(__plugin.canary) {
            sender = arguments[0];
            args = arguments[1];
            cmdName = ('' + args[0]).toLowerCase().replace(/^\//, '');
            for(i = 1; i < args.length; i++) {
                jsArgs.push('' + args[i]);
            }
        } else if(__plugin.bukkit) {
            sender = arguments[0];
            cmd = arguments[1];
            label = arguments[2];
            args = arguments[3];
            cmdName = ('' + cmd.name).toLowerCase();
            for(; i < args.length; i++) {
                jsArgs.push('' + args[i]);
            }
        } else {
            logger.info(CORE_UNKNOWN);
        }
        result = false;
        if(cmdName == 'js') {
            result = true;
            fnBody = jsArgs.join(' ');
            global.self = sender;
            global.__engine = __engine;
            try {
                // cannot rely on native eval in jre7 and jre8
                // because ...
                // js var hearts
                // js hearts
                // ... throws an execption ('hearts' is not defined). vars are not sticky in native eval .
                //
                jsResult = __engine.eval(fnBody);
                if(typeof jsResult != 'undefined') {
                    if(jsResult == null) {
                        // engine eval will return null even if the result should be undefined
                        // this can be confusing so I think it's better to omit output for this case
                        // sender.sendMessage('(null)');
                    } else {
                        try {
                            if(isJavaObject(jsResult) || typeof jsResult === 'function') {
                                echo(sender, jsResult);
                            } else {
                                var replacer = function replacer(key, value) {
                                    return this[key] instanceof java.lang.Object ? '' + this[key] : value;
                                };
                                echo(sender, JSON.stringify(jsResult, replacer, 2));
                            }
                        } catch(displayError) {
                            logError('Error while trying to display result: ' + jsResult + ', Error: ' + displayError);
                        }
                    }
                }
            } catch(e) {
                logError('Error while trying to evaluate JavaScript: ' + fnBody + ', Error: ' + e);
                echo(sender, 'Error while trying to evaluate JavaScript: ' + fnBody + ', Error: ' + e);
                throw e;
            } finally {
                /*
                 wph 20140312 don't delete self on nashorn until https://bugs.openjdk.java.net/browse/JDK-8034055 is fixed
                 */
                if(!nashorn) {
                    delete global.self;
                    delete global.__engine;
                }
            }
        }
        if(cmdName == 'jsp') {
            cmdModule.exec(jsArgs, sender);
            result = true;
        }
        return result;
    } // end __onCommand() function
    var Bukkit = null;
    var Canary = null;
    var logger = null;
    if(__plugin.canary) {
        Canary = Packages.net.canarymod.Canary;
        server = Canary.server;
        logger = __plugin.logman;
    } else if(__plugin.bukkit) {
        Bukkit = Packages.org.bukkit.Bukkit;
        server = Bukkit.server;
        logger = __plugin.logger;
    } else {
        logger.info(CORE_UNKNOWN);
    }

    function logError(msg) {
        __plugin.canary ? logger.error(msg) : logger.severe(msg);
    }

    function logWarn(msg) {
        __plugin.canary ? logger.warn(msg) : logger.warning(msg);
    }
    var File = java.io.File,
        FileReader = java.io.FileReader,
        BufferedReader = java.io.BufferedReader,
        PrintWriter = java.io.PrintWriter,
        FileWriter = java.io.FileWriter,
        // assumes scriptcraft.js is in mcserver/plugins/scriptcraft/lib directory
        jsPluginsRootDir = __script.parentFile.parentFile,
        jsPluginsRootDirName = _canonize(jsPluginsRootDir),
        unloadHandlers = [];
    /*
     make sure eval is present: it's present on JRE 6, 7, and 8 on Linux
     */
    if(typeof eval == 'undefined') {
        global.eval = function(str) {
            return __engine.eval(str);
        };
    }
    /*
     now that load is defined, use it to load a global config object
     */
    var configFile = new File(jsPluginsRootDir, 'data/');
    configFile.mkdirs();
    configFile = new File(configFile, 'global-config.json');
    var config = _load(configFile);
    if(!config) {
        config = {
            verbose: false
        };
    }
    global.config = config;
    global.__plugin = __plugin;
    /*
     wph 20131229 Issue #103 JSON is not bundled with javax.scripting / Rhino on Mac.
     // TODO: Is this still necessary with Java 1.8+?
     */
    (function() {
        var jsonFileReader = new FileReader(new File(jsPluginsRootDirName + '/lib/json2.js'));
        var jsonLoaded = __engine['eval(java.io.Reader)'](jsonFileReader);
    }());
    global.addUnloadHandler = _addUnloadHandler;
    global.refresh = _refresh;
    global.echo = _echo;
    global.alert = _echo;
    global.scload = _load;
    global.scsave = _save;
    global.scloadJSON = _loadJSON;
    global.isOp = _isOp;
    var configRequire = _load(jsPluginsRootDirName + '/lib/require.js', true);
    /*
     setup paths to search for modules
     */
    var modulePaths = [jsPluginsRootDirName + '/lib/',
        jsPluginsRootDirName + '/modules/'
    ];
    if(config.verbose) {
        logger.info('Setting up CommonJS-style module system. Root Directory: ' + jsPluginsRootDirName);
        logger.info('Module paths: ' + JSON.stringify(modulePaths));
    }
    var requireHooks = {
        loading: function(path) {
            if(config.verbose) {
                logger.info('loading ' + path);
            }
        },
        loaded: function(path) {
            if(config.verbose) {
                logger.info('loaded  ' + path);
            }
        }
    };
    global.require = configRequire(jsPluginsRootDirName, modulePaths, requireHooks, function(code) {
        return __engine.eval(code);
    });
    var testJSPatch = require('js-patch')(global);
    var console = require('console')(logger);
    global.console = console;
    testJSPatch(console);
    /*
     setup persistence
     */
    require('persistence')(jsPluginsRootDir, global);
    var isJavaObject = require('java-utils').isJavaObject;
    var cmdModule = require('command');
    global.command = cmdModule.command;
    var plugins = require('plugin');
    global.__onTabComplete = require('tabcomplete');
    global.plugin = plugins.plugin;
    var events = require('events');
    // wph 20131226 - make events global as it is used by many plugins/modules
    global.events = events;
    if(__plugin.canary) {
        // canary plugin doesn't get to handle its own plugin disable event
    } else if(__plugin.bukkit) {
        events.pluginDisable(_onDisable);
    } else {
        logger.info(CORE_UNKNOWN);
    }
    __onDisableImpl = _onDisable;
    global.__onCommand = __onCommand;
    plugins.autoload(global, new File(jsPluginsRootDir, 'plugins'));
    require('legacy-check')(jsPluginsRootDir);
}