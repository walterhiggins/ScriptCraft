var console = require('./console');
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

exports.plugin = _plugin;
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
      Reload all of the .js files in the given directory 
    */
    var _reload = function(pluginDir)
    {
        _loaded = [];
        var sourceFiles = [];
        _listSourceFiles(sourceFiles,pluginDir);

        var len = sourceFiles.length;
        if (config.verbose)
            console.info(len + " scriptcraft plugins found.");
        for (var i = 0;i < len; i++){
            var pluginPath = _canonize(sourceFiles[i]);
            if (config.verbose)
                console.info("Loading plugin: " + pluginPath);
            var module = {};
            try {
                module = require(pluginPath);
                for (var property in module){
                    /*
                      all exports in plugins become global
                    */
                    global[property] = module[property];
                }
            }catch (e){
                
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
