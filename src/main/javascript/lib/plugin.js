var File = java.io.File;
var FileWriter = java.io.FileWriter;
var PrintWriter = java.io.PrintWriter;

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
    var f = (filename instanceof File) ? filename : new File(filename);
    var out = new PrintWriter(new FileWriter(f));
    out.println( objectToStr );
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

    if (isPersistent){
        if (!moduleObject.store){
            moduleObject.store = {};
        }
        var loadedStore = load(dataDir.canonicalPath + "/" + moduleName + "-store.json");
        if (loadedStore){
            for (var i in loadedStore){
                moduleObject.store[i] = loadedStore[i];
            }
        }
    }
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
exports.commands = _commands;
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
            var result = null;
            try { 
                result =  func(params);
            }catch (e){
                logger.severe("Error while trying to execute command: " + JSON.stringify(params));
                throw e;
            }
            return result;
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

exports.plugin = _plugin;
exports.command = _command;
exports.save = _save;

var scriptCraftDir = null;
var pluginDir = null;
var dataDir = null;

exports.autoload = function(dir) {

    scriptCraftDir = dir;
    pluginDir = new File(dir, "plugins");
    dataDir = new File(dir, "data");

    var _canonize = function(file){ 
        return "" + file.getCanonicalPath().replaceAll("\\\\","/"); 
    };
    /*
      recursively walk the given directory and return a list of all .js files 
    */
    var _listSourceFiles = function(store,dir)
    {
        var files = dir.listFiles();
        for (var i = 0;i < files.length; i++) {
            var file = files[i];
            if (file.isDirectory()){
                _listSourceFiles(store,file);
            }else{
                if ((file.getCanonicalPath().endsWith(".js") 
                     || file.getCanonicalPath().endsWith(".coffee")) 
                   ) {
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

        //sourceFiles.sort(sortByModule);

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
        if (config.verbose)
            logger.info(len + " scriptcraft plugins found.");
        for (var i = 0;i < len; i++){
            var pluginPath = _canonize(sourceFiles[i]);
            if (config.verbose)
                logger.info("Loading plugin: " + pluginPath);
            var module = require(pluginPath);
            for (var property in module){
                /*
                  all exports in plugins become global
                 */
                global[property] = module[property];
            }
        }
    };
    _reload(pluginDir);
};
addUnloadHandler(function(){
    //
    // save all plugins which have persistent data
    //
    for (var moduleName in _plugins){
        var pluginData = _plugins[moduleName];
        if (pluginData.persistent)
            _save(pluginData.module.store, dataDir.canonicalPath + "/" + moduleName + "-store.json");
    }
});
