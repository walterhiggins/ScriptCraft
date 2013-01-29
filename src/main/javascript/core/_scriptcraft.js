/*
  This file defines commonly used functions by all plugins...
  
  load (filename) - loads and evaluates a javascript file, returning the evaluated object.
  
  save (object, filename) - saves an object to a file.

  plugin (name, interface, isPersistent) 
  - defines a new plugin. If isPersistent is true then
    the plugin doesn't have to worry about loading and saving
    state - that will be done by the framework. Just make sure 
    that anything you want to save (and restore) is in the 'store'
    property - this will be created automatically if not already defined.
    (its type is object {} )
    
  ready (function) - specifies code to be executed only when all the plugins have loaded.

  command (name, function) - defines a command that can be used by non-operators.
  
*/
var global = this;
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
            return;

        if (verbose)
            print("loading " + canonizedFilename);

        if (file.exists()){
            var parent = file.getParentFile();
            var reader = new java.io.FileReader(file);
            __engine.put("__script",canonizedFilename);
            __engine.put("__folder",(parent?_canonize(parent):"")+"/");
            try{
                result = __engine.eval(reader);
                _loaded[canonizedFilename] = true;
            }catch (e){
                __plugin.logger.severe("Error evaluating " + filename + ", " + e );
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
    var _listJsFiles = function(store,dir)
    {
        if (typeof dir == "undefined"){
            dir = new java.io.File(_originalScript).getParentFile().getParentFile();
        }
        var files = dir.listFiles();
        for (var i = 0;i < files.length; i++){
            var file = files[i];
            if (file.isDirectory()){
                _listJsFiles(store,file);
            }else{
                if (file.getCanonicalPath().endsWith(".js") &&
                   !(file.getName().startsWith("_")) &&
                    file.exists())
                {
                    store.push(file);
                }
            }
        }
    };
    /*
      Reload all of the .js files in the given directory 
    */
    var _reload = function(pluginDir)
    {
        _loaded = [];
        var jsFiles = [];
        _listJsFiles(jsFiles,pluginDir);
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
        var len = jsFiles.length;
        for (var i = 0;i < len; i++){
            load(_canonize(jsFiles[i]),true);
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
            return;

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
                if (typeof o[i] == "function" )
                    result.push(i+"()");
                else
                    result.push(i);
            }
        }else{
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
        var propsOfLastArg = [];
        var statement = args.join(" ");
        statement = statement.replace(/^\s+/,"").replace(/\s+$/,"");
        
        if (statement.length == 0)
            propsOfLastArg = _globalSymbols;
        else{
            var statementSyms = statement.split(/[^a-zA-Z0-9_\.]/);
            var lastSymbol = statementSyms[statementSyms.length-1];
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
                if (typeof symbol == "undefined"){
                    //
                    // look up partial matches against last good symbol
                    //
                    var objectProps = _getProperties(lastGoodSymbol);
                    if (name == ""){
                        // if the last symbol looks like this.. 
                        // ScriptCraft.
                        //
                        for (var i =0;i < objectProps.length;i++)
                            propsOfLastArg.push(statement+objectProps[i]);
                        
                    }else{
                        // it looks like this..
                        // ScriptCraft.co
                        //
                        var li = statement.lastIndexOf(name);
                        statement = statement.substring(0,li);

                        for (var i = 0; i < objectProps.length;i++)
                            if (objectProps[i].indexOf(name) == 0)
                                propsOfLastArg.push(statement + objectProps[i]);
                        
                    }
                }else{
                    var objectProps = _getProperties(symbol);
                    for (var i = 0; i < objectProps.length; i++)
                        propsOfLastArg.push(statement + objectProps[i]);
                }
            }else{
                // loop thru globalSymbols looking for a good match
                for (var i = 0;i < _globalSymbols.length; i++)
                    if (_globalSymbols[i].indexOf(lastSymbol) == 0)
                        propsOfLastArg.push(statement.replace(lastSymbol,_globalSymbols[i]));
                
            }
        }
        for (var i = 0;i < propsOfLastArg.length; i++)
            result.add(propsOfLastArg[i]);
    };

    /* 
       utility function - convert a Location to a string
     */
    var _locToString = function(location){
        return JSON.stringify([""+location.world.name,location.x, location.y, location.z]);
    };

    var _getPlayerObject = function(player){
        if (typeof player == "undefined")
            return self;
        if (typeof player == "string")
            return org.bukkit.Bukkit.getPlayer(player);
        return player;
    };
    global.load = _load;
    global.save = _save;
    global.plugin = _plugin;
    global.ready = _ready;
    global.command = _command;
    global._onTabComplete = __onTabCompleteJS;
    global.locationToString = _locToString;
    global.getPlayerObject = _getPlayerObject;
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
    });
    
}());



