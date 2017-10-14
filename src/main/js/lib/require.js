/*************************************************************************
## require - Node.js-style module loading in ScriptCraft

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

```javascript
exports.add = function(a,b){
    return a + b;
}
```

### inc.js

```javascript
var math = require('./math');
exports.increment = function(n){
    return math.add(n, 1);
}
```

### program.js

```javascript
var inc = require('./inc').increment;
var a = 7;
a = inc(a);
print(a);
```

You can see from the above sample code that programs can use modules
and modules themeselves can use other modules. Modules have full
control over what functions and properties they want to provide to
others.

### Important

Although ScriptCraft now supports Node.js style modules, it does not
support node modules. Node.js and Rhino are two very different
Javascript environments. ScriptCraft uses Rhino Javascript, not
Node.js. Standard Node.js modules such as `'fs'` are not available in ScriptCraft.

Modules can be loaded using relative or absolute paths. Per the CommonJS
module specification, the '.js' suffix is optional.

[cjsmodules]: http://wiki.commonjs.org/wiki/Modules/1.1.1.

***/
(function ( rootDir, modulePaths, hooks, evaluate ) {

  var File = java.io.File,
    FileReader = java.io.FileReader,
    BufferedReader = java.io.BufferedReader;

  function fileExists( file ) {
    if ( file.isDirectory() ) {
      return readModuleFromDirectory( file );
    } else {
      return file;
    }
  }

  function _canonize(file){ 
    return '' + file.canonicalPath.replaceAll('\\\\','/'); 
  }
    
  function readModuleFromDirectory( dir ) {

    // look for a package.json file
    var pkgJsonFile = new File( dir, './package.json' );
    if ( pkgJsonFile.exists() ) {
      var pkg = scload( pkgJsonFile );
      var mainFile = new File( dir, pkg.main );
      if ( mainFile.exists() ) {
        return mainFile;
      } else {
        return null;
      }
    } else {
      // look for an index.js file
      var indexJsFile = new File( dir, './index.js' );
      if ( indexJsFile.exists() ) {
        return indexJsFile;
      } else { 
        return null;
      }
    }
  }


  /**********************************************************************
### module name resolution

When resolving module names to file paths, ScriptCraft uses the following rules...

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

***/
  function resolveModuleToFile( moduleName, parentDir ) {
    var file = new File(moduleName),
      i = 0,
      resolvedFile;
    if ( file.exists() ) {
      return fileExists(file);
    }
    if ( moduleName.match( /^[^\.\/]/ ) ) {
      // it's a module named like so ... 'events' , 'net/http'
      //
      for ( ; i < modulePaths.length; i++ ) {
        resolvedFile = new File(modulePaths[i] + moduleName);
        if ( resolvedFile.exists() ) {
          return fileExists(resolvedFile);
        } else {
          // try appending a .js to the end
          resolvedFile = new File(modulePaths[i] + moduleName + '.js');
          if ( resolvedFile.exists() ) {
            return resolvedFile;
          }
        }
      }
    } else {
      if ((file = new File(parentDir, moduleName)).exists()) {
        return fileExists(file);
      } else if ((file = new File(parentDir, moduleName + '.js')).exists()) { // try .js extension
        return file;
      } else if ((file = new File(parentDir, moduleName + '.json')).exists()) { // try .json extension
        return file;
      }
    }
    return null;
  }
  /*
   require() function implementation
   */
  function _require( parentFile, path, options ) {
    var file,
      canonizedFilename,
      moduleInfo,
      buffered,
      head = '(function(exports,module,require,__filename,__dirname){ ',
      code = '',
      line = null;

    if ( typeof options == 'undefined' ) { 
      options = { cache: true };
    } else { 
      if ( typeof options.cache == 'undefined' ) {
        options.cache = true;
      }
    }

    file = resolveModuleToFile(path, parentFile);
    if ( !file ) {
      var errMsg = '' + _format('require() failed to find matching file for module \'%s\' ' + 
                                'in working directory \'%s\' ', [path, parentFile.canonicalPath]);
      if (! ( (''+path).match( /^\./ ) ) ) {
        errMsg = errMsg + ' and not found in paths ' + JSON.stringify(modulePaths);
      }
      var find = _require(parentFile, 'find').exports;
      var allJS = [];
      for (var i = 0;i < modulePaths.length; i++){
        var js = find( modulePaths[i] );
        for (var j = 0;j < js.length; j++){
          if (js[j].match(/\.js$/)){
            allJS.push( js[j].replace(modulePaths[i],'') );
          }
        }
      }
      var pathL = path.toLowerCase();
      var candidates = [];
      for (i = 0;i < allJS.length;i++){
        var filenameparts = allJS[i];
        var candidate = filenameparts.replace(/\.js/,'') ;
        var lastpart = candidate.toLowerCase();
        if (pathL.indexOf(lastpart) > -1 || lastpart.indexOf(pathL) > -1){
          candidates.push(candidate);
        }
      }
      if (candidates.length > 0){
        errMsg += '\nBut found module/s named: ' + candidates.join(',') + ' - is this what you meant?';
      }
      throw new Error(errMsg);
    }
    canonizedFilename = _canonize(file);
  
    moduleInfo = _loadedModules[canonizedFilename];
    if ( moduleInfo ) {
      if ( options.cache ) { 
        return moduleInfo;
      }
    }
    if ( hooks ) {
      hooks.loading( canonizedFilename );
    }
    buffered = new BufferedReader(new FileReader(file));
    while ( (line = buffered.readLine()) !== null ) {
      code += line + '\n';
    }
    buffered.close(); // close the stream so there's no file locks

    if(canonizedFilename.toLowerCase().substring(canonizedFilename.length - 5) === '.json') // patch code when it is json
      code = 'module.exports = (' + code + ');';
    
    moduleInfo = {
      loaded: false,
      id: canonizedFilename,
      exports: {},
      require: _requireClosure(file.parentFile)
    };
    var tail = '})';
    code = head + code + tail;

    if ( options.cache ) {
      _loadedModules[canonizedFilename] = moduleInfo;
    }
    var compiledWrapper = null;
    try {
      compiledWrapper = evaluate(code);
    } catch (e) {
      /*
       wph 20140313 JRE8 (nashorn) gives misleading linenumber of evaluating code not evaluated code.
       This can be fixed by instead using __engine.eval 
       */
      throw new Error( 'Error evaluating module ' + path
          + ' line #' + e.lineNumber
          + ' : ' + e.message, canonizedFilename, e.lineNumber );
    }
    var __dirname = '' + file.parentFile.canonicalPath;
    var parameters = [
      moduleInfo.exports, /* exports */
      moduleInfo,         /* module */
      moduleInfo.require, /* require */
      canonizedFilename,  /* __filename */
      __dirname           /* __dirname */
    ];
    try {
      compiledWrapper
        .apply(moduleInfo.exports,  /* this */
          parameters);   
    } catch (e) {
      var snippet = '';
      if ((''+e.lineNumber).match(/[0-9]/)){
        var lines = code.split(/\n/);
        if (e.lineNumber > 1){
          snippet = ' ' + lines[e.lineNumber-2] + '\n';
        }
        snippet += '> ' + lines[e.lineNumber-1] + '\n';
        if (e.lineNumber < lines.length){
          snippet += ' ' + lines[e.lineNumber] + '\n';
        }
      }
      throw new Error( 'Error executing module ' + path
        + ' line #' + e.lineNumber
        + ' : ' + e.message + (snippet?('\n' + snippet):''), canonizedFilename, e.lineNumber );
    }
    if ( hooks ) { 
      hooks.loaded( canonizedFilename );
    }
    moduleInfo.loaded = true;
    return moduleInfo;
  }

  function _requireClosure( parentFile ) {
    var _boundRequire = function requireBoundToParent( path, options ) {
      var module = _require( parentFile, path , options);
      return module.exports;
    };

    _boundRequire.resolve = function resolveBoundToParent ( path ) {
      return resolveModuleToFile(path, parentFile);
    };
    _boundRequire.cache = _loadedModules;

    return _boundRequire;
  }
  var _loadedModules = {};
  var _format = java.lang.String.format;
  return _requireClosure( new java.io.File(rootDir) );
  // last line deliberately has no semicolon!
  /* eslint semi: off*/
})
