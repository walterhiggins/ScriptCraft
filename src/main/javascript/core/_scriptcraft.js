/************************************************************************
# ScriptCraft API Reference

Walter Higgins

[walter.higgins@gmail.com][email]

[email]: mailto:walter.higgins@gmail.com?subject=ScriptCraft_API_Reference

## Module Loading

At server startup the ScriptCraft Java plugin is loaded and once
loaded the Java plugin will in turn begin loading all of the
javascript (.js) files it finds in the js-plugins directory (in the
current working directory).  If this is the first time the ScriptCraft
plugin is loaded, then the js-plugins directory will not yet exist, it
will be created and all of the bundled javascript files will be
unzipped into it from a bundled resource within the Java plugin.  The
very first javascript file to load will always be
js-plugins/core/_scriptcraft.js. Then all other javascript files are
loaded except for filenames begin with `_` (underscore), such files
are considered to be private modules and will not be automatically
loaded at startup.

### Directory structure

The js-plugins directory is loosely organised into subdirectories -
one for each module. Each subdirectory in turn can contain one or more
javascript files. Within each directory, a javascript file with the
same filename as the directory will always be loaded before all other
files in the same directory. So for example, drone/drone.js will
always load before any other files in the drone/ directory. Similarly
utils/utils.js will always load before any other files in the utils/
directory.

### Directories 

As of February 10 2013, the js-plugins directory has the following sub-directories...

 * core - Contains javascript files containing Core functionality crucial to ScriptCraft and modules which use it.
 * drone - Contains the drone module and drone extensions. Drone was the first scriptcraft module.
 * ext - Contains external 3rd party javascript libraries (e.g. json2.js - the JSON lib)
 * mini-games - Contains mini-games 
 * arrows - The arrows module
 * signs - The signs module
 * chat - The chat plugin/module
 * alias - The alias plugin/module

## Core Module

This module defines commonly used functions by all plugins...
  
 * load (filename,warnOnFileNotFound) - loads and evaluates a javascript file, returning the evaluated object.
  
 * save (object, filename) - saves an object to a file.

 * plugin (name, interface, isPersistent) - defines a new plugin. If
   isPersistent is true then the plugin doesn't have to worry about
   loading and saving state - that will be done by the framework. Just
   make sure that anything you want to save (and restore) is in the plugin's
   'store' property - this will be created automatically if not
   already defined.  (its type is object {} ) . More on plugins below.
    
 * ready (function) - specifies code to be executed only when all the plugins have loaded.

 * command (name, function) - defines a command that can be used by
   non-operators. The `command` function provides a way for plugin
   developers to provide new commands for use by players.

### load() function

The load() function is used by ScriptCraft at startup to load all of
the javascript modules and data.  You normally wouldn't need to call
this function directly. If you put a javascript file anywhere in the
craftbukkit/js-plugins directory tree it will be loaded automatically
when craftbukkit starts up. The exception is files whose name begins
with an underscore `_` character. These files will not be
automatically loaded at startup as they are assumed to be files
managed / loaded by plugins.

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
managed by Scriptcraft is `state` - this special member will be
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

***/

var global = this;


/*************************************************************************
Core Module - Special Variables
===============================
There are a couple of special javascript variables available in ScriptCraft...
 
 * __folder - The current working directory - this variable is only to be used within the main body of a .js file.
 * __plugin - The ScriptCraft JavaPlugin object.
 * server - The Minecraft Server object.
 * self - the current player. (Note - this value should not be used in multi-threaded scripts - it's not thread-safe)

***/
var verbose = verbose || false;
/*
  wph 20130124 - make self, plugin and server public - these are far more useful now that tab-complete works.
*/
var server = org.bukkit.Bukkit.server;
//
// private implementation
//
(function(){
    //
    // don't execute this more than once
    //
    if (typeof load == "function")
        return ;

    var _canonize = function(file){ return file.getCanonicalPath().replaceAll("\\\\","/"); };
    
    var _originalScript = __script;
    var parentFileObj = new java.io.File(__script).getParentFile();
    var jsPluginsRootDir = parentFileObj.getParentFile();
    var jsPluginsRootDirName = _canonize(jsPluginsRootDir);

    /*
      wph 20131215 Experimental 
     */
    var _loadedModules = {};
    var _require = function(path)
    {
        var file = new java.io.File(path);
        if (!file.exists()){
            if (path.match(/\.js$/i)){
                __plugin.logger.warning('require("' + path + '") failed. File not found');
                return;
            }else{
                path = path + '.js';
                file = new java.io.File(path);
                if (!file.exists()){
                    __plugin.logger.warning('require("' + path + '") failed. File not found');
                    return;
                }
            }
        }
        if (file.isDirectory()){
            __plugin.logger.warning('require("' + path + '") directories not yet supported.');
            return;
        }
        var canonizedFilename = _canonize(file);
        if (_loadedModules[canonizedFilename]){
            return _loadedModules[canonizedFilename];
        }
        if (verbose){
            print("loading module " + canonizedFilename);
        }
        var reader = new java.io.FileReader(file);
        var br = new java.io.BufferedReader(reader);
        var code = "";
        var module = {id: canonizedFilename};
        while ((r = br.readLine()) !== null) code += r + "\n";

        var head = "var result = {};(function(exports,module){ ";
        var tail = "; return exports;}(result," + JSON.stringify(module) + "))";
        code = head + code + tail;

        _loadedModules[canonizedFilename] = __engine.eval(code);

        return _loadedModules[canonizedFilename];
    };
    global.require = _require;


    var _loaded = {};
    /*
      Load the contents of the file and evaluate as javascript
     */
    var _load = function(filename,warnOnFileNotFound)
    {
        var result = null;
        
        var file = new java.io.File(filename);
        var canonizedFilename = _canonize(file);
        //
        // wph 20130123 don't load the same file more than once.
        //
        if (_loaded[canonizedFilename])
            return _loaded[canonizedFilename];
        
        if (verbose)
            print("loading " + canonizedFilename);
        
        if (file.exists()) {
            var parent = file.getParentFile();
            var reader = new java.io.FileReader(file);
            var br = new java.io.BufferedReader(reader);
            __engine.put("__script",canonizedFilename);
            __engine.put("__folder",(parent?_canonize(parent):"")+"/");
            
            var code = "";
            try{
                if (file.getCanonicalPath().endsWith(".coffee")) {
                    var r = undefined;
                    while ((r = br.readLine()) !== null) code += "\"" + r + "\" +\n";
                    code += "\"\"";
                    var code = "load(__folder + \"../core/_coffeescript.js\"); var ___code = "+code+"; eval(CoffeeScript.compile(___code, {bare: true}))";
                } else {
                    while ((r = br.readLine()) !== null) code += r + "\n";
                }
                
                result = __engine.eval(code);
                _loaded[canonizedFilename] = result || true;
            }catch (e){
                __plugin.logger.severe("Error evaluating " + canonizedFilename + ", " + e );
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
                __plugin.logger.warning(canonizedFilename + " not found");
        }
        return result;
    };
    /*
      recursively walk the given directory and return a list of all .js files 
     */
    var _listSourceFiles = function(store,dir)
    {
        if (typeof dir == "undefined"){
            dir = new java.io.File(_originalScript).getParentFile().getParentFile();
        }
        var files = dir.listFiles();
        for (var i = 0;i < files.length; i++){
            var file = files[i];
            if (file.isDirectory()){
                _listSourceFiles(store,file);
            }else{
                if ((file.getCanonicalPath().endsWith(".js") || file.getCanonicalPath().endsWith(".coffee")) &&
                   !(file.getName().startsWith("_")) &&
                    file.exists())
                {
                    store.push(file);
                }
            }
        }
    };
    /*
      sort so that .js files with same name as parent directory appear before
      other files in the same directory
     */
    var sortByModule = function(a,b){
        a = _canonize(a);
        b = _canonize(b);
        var aparts = (""+a).split(/\//);
        var bparts = (""+b).split(/\//);
        //var adir = aparts[aparts.length-2];
        var adir = aparts.slice(0,aparts.length-1).join("/");
        var afile = aparts[aparts.length-1];
        //var bdir = bparts[bparts.length-2];
        var bdir = bparts.slice(0,bparts.length-1).join("/");
        var bfile = bparts[bparts.length-1];
        
        if(adir<bdir) return -1;
        if(adir>bdir) return 1;

        afile = afile.match(/[a-zA-Z0-9\-_]+/)[0];

        if (adir.match(new RegExp(afile + "$")))
            return -1;
        else
            return 1;
    };
    /*
      Reload all of the .js files in the given directory 
    */
    var _reload = function(pluginDir)
    {
        _loaded = [];
        var sourceFiles = [];
        _listSourceFiles(sourceFiles,pluginDir);

        sourceFiles.sort(sortByModule);

        //
        // script files whose name begins with _ (underscore)
        // will not be loaded automatically at startup.
        // These files are assumed to be dependencies/private to plugins
        // 
        // E.g. If you have a plugin called myMiniGame.js in the myMiniGame directory
        // and which in addition to myMiniGame.js also includes _myMiniGame_currency.js _myMiniGame_events.js etc.
        // then it's assumed that _myMiniGame_currency.js and _myMiniGame_events.js will be loaded
        // as dependencies by myMiniGame.js and do not need to be loaded via js reload
        //
        var len = sourceFiles.length;
        for (var i = 0;i < len; i++){
            load(_canonize(sourceFiles[i]),true);
        }
    };

    /*
      Save a javascript object to a file (saves using JSON notation)
    */
    var _save = function(object, filename){
        var objectToStr = null;
        try{
            objectToStr = JSON.stringify(object);
        }catch(e){
            print("ERROR: " + e.getMessage() + " while saving " + filename);
            return;
        }
        var f = new java.io.File(filename);
        var out = new java.io.PrintWriter(new java.io.FileWriter(f));
        out.println("__data = " + objectToStr);
        out.close();
    };
    /*
      plugin management
    */
    var _plugins = {};
    var _plugin = function(/* String */ moduleName, /* Object */ moduleObject, isPersistent)
    {
        //
        // don't load plugin more than once
        //
        if (typeof _plugins[moduleName] != "undefined")
            return _plugins[moduleName].module;

        var pluginData = {persistent: isPersistent, module: moduleObject};
        moduleObject.store = moduleObject.store || {};
        _plugins[moduleName] = pluginData;

        if (isPersistent)
            moduleObject.store = load(jsPluginsRootDirName + "/" + moduleName + "-store.txt") || {};
        
        global[moduleName] = moduleObject;
        return moduleObject;
    };
    /*
      allow for deferred execution (once all modules have loaded)
     */
    var _deferred = [];
    var _ready = function( func ){
        _deferred.push(func);
    };
    var _cmdInterceptors = [];
    /* 
       command management - allow for non-ops to execute approved javascript code.
     */
    var _commands = {};
    var _command = function(name,func,options,intercepts)
    {
        if (typeof name == "undefined"){
            // it's an invocation from the Java Plugin!
            if (__cmdArgs.length === 0)
                throw new Error("Usage: jsp command-name command-parameters");
            var name = __cmdArgs[0];
            var cmd = _commands[name];
            if (typeof cmd === "undefined"){
                // it's not a global command - pass it on to interceptors
                var intercepted = false;
                for (var i = 0;i < _cmdInterceptors.length;i++){
                    if (_cmdInterceptors[i](__cmdArgs))
                        intercepted = true;
                }
                if (!intercepted)
                    self.sendMessage("Command '" + name + "' is not recognised");
            }else{
                func = cmd.callback;
                var params = [];
                for (var i =1; i < __cmdArgs.length;i++){
                    params.push("" + __cmdArgs[i]);
                }
            return func(params);
            }
        }else{
            if (typeof options == "undefined")
                options = [];
            _commands[name] = {callback: func, options: options};
            if (intercepts)
                _cmdInterceptors.push(func);
            return func;
        }
    };
    var _rmCommand = function(name){
        delete _commands[name];
    };
    /*
      Tab Completion of the /js and /jsp commands
    */
    var _isJavaObject = function(o){
        var result = false;
        try {
            o.hasOwnProperty("testForJava");
        }catch (e){
            // java will throw an error when an attempt is made to access the
            // hasOwnProperty method. (it won't exist for Java objects)
            result = true;
        }
        return result;
    };
    var _javaLangObjectMethods = ["equals","getClass","class","getClass","hashCode","notify","notifyAll","toString","wait","clone","finalize"];
    
    var _getProperties = function(o)
    {
        var result = [];
        if (_isJavaObject(o))
        {
            propertyLoop:
            for (var i in o)
            {
                //
                // don't include standard Object methods
                //
                var isObjectMethod = false;
                for (var j = 0;j < _javaLangObjectMethods.length; j++)
                    if (_javaLangObjectMethods[j] == i)
                        continue propertyLoop;
                var typeofProperty = null;
                try { 
                    typeofProperty = typeof o[i];
                }catch( e ){
                    if (e.message == "java.lang.IllegalStateException: Entity not leashed"){
                        // wph 20131020 fail silently for Entity leashing in craftbukkit
                    }else{
                        throw e;
                    }
                }
                if (typeofProperty == "function" )
                    result.push(i+"()");
                else
                    result.push(i);
            }
        }else{
            if (o.constructor == Array)
                return result;

            for (var i in o){
                if (i.match(/^[^_]/)){
                    if (typeof o[i] == "function")
                        result.push(i+"()");
                    else
                        result.push(i);
                }
            }
        }
        return result.sort();
    };
    /*
      Tab completion for the /jsp commmand
    */
    var __onTabCompleteJSP = function() {
        var result = global.__onTC_result;
        var args = global.__onTC_args;
        var cmdInput = args[0];
        var cmd = _commands[cmdInput];
        if (cmd){
            var opts = cmd.options;
            var len = opts.length;
            if (args.length == 1){
                for (var i = 0;i < len; i++)
                    result.add(opts[i]);
            }else{
                // partial e.g. /jsp chat_color dar
                for (var i = 0;i < len; i++){
                    if (opts[i].indexOf(args[1]) == 0){
                        result.add(opts[i]);
                    }
                }
            }
        }else{
            if (args.length == 0){
                for (var i in _commands)
                    result.add(i);
            }else{
                // partial e.g. /jsp al 
                // should tabcomplete to alias 
                //
                for (var c in _commands){
                    if (c.indexOf(cmdInput) == 0){
                        result.add(c);
                    }
                }
            }
        }
        return result;
    };
    /*
      Tab completion for the /js command
    */
    var __onTabCompleteJS = function()
    {
        if (__onTC_cmd.name == "jsp")
            return __onTabCompleteJSP()

        var _globalSymbols = _getProperties(global)
        var result = global.__onTC_result;
        var args = global.__onTC_args;
        var lastArg = args.length?args[args.length-1]+"":null;
        var propsOfLastArg = [];
        var statement = args.join(" ");

        statement = statement.replace(/^\s+/,"").replace(/\s+$/,"");

        
        if (statement.length == 0)
            propsOfLastArg = _globalSymbols;
        else{
            var statementSyms = statement.split(/[^\$a-zA-Z0-9_\.]/);
            var lastSymbol = statementSyms[statementSyms.length-1];
            //print("DEBUG: lastSymbol=[" + lastSymbol + "]");
            //
            // try to complete the object ala java IDEs.
            //
            var parts = lastSymbol.split(/\./);
            var name = parts[0];
            var symbol = global[name];
            var lastGoodSymbol = symbol;
            if (typeof symbol != "undefined")
            {
                for (var i = 1; i < parts.length;i++){
                    name = parts[i];
                    symbol = symbol[name];
                    if (typeof symbol == "undefined")
                        break;
                    lastGoodSymbol = symbol;
                }
                //print("debug:name["+name+"]lastSymbol["+lastSymbol+"]symbol["+symbol+"]");
                if (typeof symbol == "undefined"){
                    //
                    // look up partial matches against last good symbol
                    //
                    var objectProps = _getProperties(lastGoodSymbol);
                    if (name == ""){
                        // if the last symbol looks like this.. 
                        // ScriptCraft.
                        //

                        for (var i =0;i < objectProps.length;i++){
                            var candidate = lastSymbol + objectProps[i];
                            var re = new RegExp(lastSymbol + "$","g");
                            propsOfLastArg.push(lastArg.replace(re,candidate));
                        }
                        
                    }else{
                        // it looks like this..
                        // ScriptCraft.co
                        //
                        //print("debug:case Y: ScriptCraft.co");

                        var li = statement.lastIndexOf(name);
                        for (var i = 0; i < objectProps.length;i++){
                            if (objectProps[i].indexOf(name) == 0)
                            {
                                var candidate = lastSymbol.substring(0,lastSymbol.lastIndexOf(name));
                                candidate = candidate + objectProps[i];
                                var re = new RegExp(lastSymbol+ "$","g");
                                //print("DEBUG: re=" + re + ",lastSymbol="+lastSymbol+",lastArg=" + lastArg + ",candidate=" + candidate);
                                propsOfLastArg.push(lastArg.replace(re,candidate));
                            }
                        }
                        
                    }
                }else{
                    //print("debug:case Z:ScriptCraft");
                    var objectProps = _getProperties(symbol);
                    for (var i = 0; i < objectProps.length; i++){
                        var re = new RegExp(lastSymbol+ "$","g");
                        propsOfLastArg.push(lastArg.replace(re,lastSymbol + "." + objectProps[i]));
                    }
                }
            }else{
                //print("debug:case AB:ScriptCr");
                // loop thru globalSymbols looking for a good match
                for (var i = 0;i < _globalSymbols.length; i++){
                    if (_globalSymbols[i].indexOf(lastSymbol) == 0){
                        var possibleCompletion = _globalSymbols[i];
                        var re = new RegExp(lastSymbol+ "$","g");
                        propsOfLastArg.push(lastArg.replace(re,possibleCompletion));
                    }
                }
                
            }
        }
        for (var i = 0;i < propsOfLastArg.length; i++)
            result.add(propsOfLastArg[i]);
    };

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

/*************************************************************************
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

***/
    global.setTimeout = function( callback, delayInMillis){
        //
        // javascript programmers familiar with setTimeout know that it expects
        // a delay in milliseconds. However, bukkit's scheduler expects a delay in ticks 
        // (where 1 tick = 1/20th second)
        //
        var bukkitTask = server.scheduler.runTaskLater(__plugin, callback, delayInMillis/50);
        return bukkitTask;
    };
    
/*************************************************************************
### clearTimeout() function

A scriptcraft implementation of clearTimeout().

***/
    global.clearTimeout = function(bukkitTask){
        bukkitTask.cancel();
    };

/*************************************************************************
### setInterval() function

This function mimics the setInterval() function used in browser-based javascript.
However, the function will only accept a function reference, not a string of javascript code.
Where setInterval() in the browser returns a numeric value which can be subsequently passed to 
clearInterval(), This implementation returns a [BukkitTask][btdoc] object which can be subsequently passed to ScriptCraft's own clearInterval() implementation.

If Node.js supports setInterval() then it's probably good for ScriptCraft to support it too.

[btdoc]: http://jd.bukkit.org/beta/apidocs/org/bukkit/scheduler/BukkitTask.html

***/
    global.setInterval = function(callback, intervalInMillis){
        var delay = intervalInMillis/ 50;
        var bukkitTask = server.scheduler.runTaskTimer(__plugin, callback, delay, delay);
        return bukkitTask;
    };
/*************************************************************************
### clearInterval() function

A scriptcraft implementation of clearInterval().

***/
    global.clearInterval = function(bukkitTask){
        bukkitTask.cancel();
    };

/*************************************************************************
### refresh() function

The refresh() function will ...

1. Disable the ScriptCraft plugin.
2. Unload all event listeners associated with the ScriptCraft plugin.
3. Enable the ScriptCraft plugin.

... refresh() can be used during development to reload only scriptcraft javascript files.
See [issue #69][issue69] for more information.

[issue69]: https://github.com/walterhiggins/ScriptCraft/issues/69

***/
    global.refresh = function(){
        __plugin.pluginLoader.disablePlugin(__plugin);
        __plugin.pluginLoader.enablePlugin(__plugin);
    };


    global.load = _load;
    global.save = _save;
    global.plugin = _plugin;
    global.ready = _ready;
    global.command = _command;
    global._onTabComplete = __onTabCompleteJS;
    global.addUnloadHandler = _addUnloadHandler;


    //
    // assumes this was loaded from js-plugins/core/
    // load all of the plugins.
    //
    _reload(jsPluginsRootDir);

    // 
    // all modules have loaded
    //
    for (var i =0;i < _deferred.length;i++)
        _deferred[i]();
    
    events.on("server.PluginDisableEvent",function(l,e){
        //
        // save all plugins which have persistent data
        //
        for (var moduleName in _plugins){
            var pluginData = _plugins[moduleName];
            if (pluginData.persistent)
                save(pluginData.module.store, jsPluginsRootDirName + "/" + moduleName + "-store.txt");
        }
         _runUnloadHandlers();
        org.bukkit.event.HandlerList["unregisterAll(org.bukkit.plugin.Plugin)"](__plugin);
    });
}());



