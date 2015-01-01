'use strict';
/*global persist,exports,config,__plugin,require*/
var File = java.io.File,
  FileWriter = java.io.FileWriter,
  PrintWriter = java.io.PrintWriter;
/*
  plugin management
*/
var _plugins = {};

var _plugin = function(/* String */ moduleName, /* Object */ moduleObject, isPersistent ) {
  //
  // don't load plugin more than once
  //
  if ( typeof _plugins[moduleName] != 'undefined' ) {
    return _plugins[moduleName].module;
  }

  var pluginData = { persistent: isPersistent, module: moduleObject };
  if ( typeof moduleObject.store == 'undefined' ) {
    moduleObject.store = {};
  }
  _plugins[moduleName] = pluginData;

  if ( isPersistent ) {
    moduleObject.store = persist( moduleName, moduleObject.store );
  }
  return moduleObject;
};

exports.plugin = _plugin;

exports.autoload = function( context, pluginDir, options ) {
  var _canonize = function( file ) { 
    return '' + file.canonicalPath.replaceAll('\\\\','/'); 
  };
  /*
   recursively walk the given directory and return a list of all .js files 
   */
  var _listSourceFiles = function( store, dir ) {
    var files = dir.listFiles(),
      file;
    if ( !files ) {
      return;
    }
    for ( var i = 0; i < files.length; i++ ) {
      file = files[i];
      if ( file.isDirectory( ) ) {
        _listSourceFiles( store, file );
      }else{
        if ( file.canonicalPath.endsWith( '.js' ) ) {
          store.push( file );
        }
      }
    }
  };
  /*
   Reload all of the .js files in the given directory 
   */
  (function( pluginDir ) {
    var sourceFiles = [],
      property,
      module,
      pluginPath;
    _listSourceFiles( sourceFiles, pluginDir );

    var len = sourceFiles.length;
    if ( config && config.verbose ) {
      console.info( len + ' scriptcraft plugins found in ' + pluginDir );
    }

    for ( var i = 0; i < len; i++ ) {

      pluginPath = _canonize( sourceFiles[i] );
      module = {};

      try {
        module = require( pluginPath , options);
        for ( property in module ) {
          /*
           all exports in plugins become members of context object
           */
          context[property] = module[property];
        }
      } catch ( e ) {
	var msg = 'Plugin ' + pluginPath + ' ' + e ;
	console.error( msg );
      }
    }
  }(pluginDir));
};

