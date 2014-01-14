'use strict';
var console = require('./console');
var File = java.io.File;
var FileWriter = java.io.FileWriter;
var PrintWriter = java.io.PrintWriter;
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
    if (typeof moduleObject.store == 'undefined')
        moduleObject.store = {};

    _plugins[moduleName] = pluginData;

    if (isPersistent){
        moduleObject.store = persist(moduleName, moduleObject.store);
    }
    return moduleObject;
};

exports.plugin = _plugin;

var scriptCraftDir = null;
var pluginDir = null;
var dataDir = null;

exports.autoload = function(dir) {

    scriptCraftDir = dir;
    pluginDir = new File(dir, "plugins");
    dataDir = new File(dir, "data");

    var _canonize = function(file){ 
        return '' + file.canonicalPath.replaceAll("\\\\","/"); 
    };
    /*
      recursively walk the given directory and return a list of all .js files 
    */
    var _listSourceFiles = function(store,dir)
    {
        var files = dir.listFiles();
        if (!files)
            return;
        for (var i = 0;i < files.length; i++) {
            var file = files[i];
            if (file.isDirectory()){
                _listSourceFiles(store,file);
            }else{
                if ( file.canonicalPath.endsWith('.js') ){
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
        var sourceFiles = [];
        _listSourceFiles(sourceFiles,pluginDir);

        var len = sourceFiles.length;
        if (config.verbose)
            console.info(len + ' scriptcraft plugins found.');
        for (var i = 0;i < len; i++){
            var pluginPath = _canonize(sourceFiles[i]);
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

