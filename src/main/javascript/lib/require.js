/*************************************************************************
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

***/
( function (logger, evaluator, verbose, rootDir, modulePaths) {

    if (verbose){
        logger.info("Setting up 'require' module system. Root Directory: " + rootDir);
        logger.info("Module paths: " + JSON.stringify(modulePaths));
    }

    var File = java.io.File;
    
    var readModuleFromDirectory = function(dir){

        // look for a package.json file
        var pkgJsonFile = new File(dir, './package.json');
        if (pkgJsonFile.exists()){
            var pkg = load(pkgJsonFile);
            var mainFile = new File(dir, pkg.main);
            if (mainFile.exists()){
                return mainFile;
            } else {
                return null;
            }
        }else{
            // look for an index.js file
            var indexJsFile = new File(dir + './index.js');
            if (indexJsFile.exists()){
                return indexJsFile;
            } else { 
                return null;
            }
        }
    };

    var resolveModuleToFile = function(moduleName, parentDir) {
/**********************************************************************
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

***/

        var file = new File(moduleName);

        var fileExists = function(file) {

            if (file.isDirectory()){
                return readModuleFromDirectory(file);
            }else {
                return file;
            }
        };

        if (file.exists()){
            return fileExists(file);
        }
        if (moduleName.match(/^[^\.\/]/)){
            // it's a module named like so ... 'events' , 'net/http'
            //
            var resolvedFile;
            for (var i = 0;i < modulePaths.length; i++){
                resolvedFile = new File(modulePaths[i] + moduleName);
                if (resolvedFile.exists()){
                    return fileExists(resolvedFile);
                }else{
                    // try appending a .js to the end
                    resolvedFile = new File(modulePaths[i] + moduleName + '.js');
                    if (resolvedFile.exists())
                        return resolvedFile;
                }
                if (verbose){
                    logger.info("Module " + moduleName + " not found in " + modulePaths[i]);
                }
            }
        } else {
            // it's of the form ./path
            file = new File(parentDir, moduleName);
            if (file.exists()){
                if (file.isDirectory()){
                    return readModuleFromDirectory(file);
                }else {
                    return file;
                }
            }else { 

                // try appending a .js to the end
                var pathWithJSExt = file.canonicalPath + '.js';
                file = new File( parentDir, pathWithJSExt);
                if (file.exists())
                    return file;
                else{

                    file = new File(pathWithJSExt);
                    if (file.exists())
                        return file;
                }
                    
            }
        }
        return null;
    };
    /*
      wph 20131215 Experimental 
    */
    var _loadedModules = {};
    
    var _require = function(parentFile, path)
    {
        var _canonize = function(file){ 
            return "" + file.canonicalPath.replaceAll("\\\\","/"); 
        };

        var file = resolveModuleToFile(path, parentFile);
        if (!file){
            throw new Error("require('" + path + "'," + parentFile.canonicalPath + ") failed");
        }
        var canonizedFilename = _canonize(file);
        
        var moduleInfo = _loadedModules[canonizedFilename];
        if (moduleInfo){
            return moduleInfo;
        }
        if (verbose){
            logger.info("loading module " + canonizedFilename);
        }
        var reader = new java.io.FileReader(file);
        var br = new java.io.BufferedReader(reader);
        var code = "";
        var r = null;
        while ((r = br.readLine()) !== null) 
            code += r + "\n";

        var head = "(function(exports,module,require,__filename,__dirname){ ";

        moduleInfo = {
            loaded: false,
            id: canonizedFilename,
            exports: {}
        };
        var tail = "})";
        code = head + code + tail;

        _loadedModules[canonizedFilename] = moduleInfo;
        var compiledWrapper = null;
        try {
            compiledWrapper = evaluator.eval(code);
        }catch (e){
            logger.severe("Error:" + e + " while evaluating module " + canonizedFilename);
            throw e;
        }
        var __dirname = file.parentFile.canonicalPath;
        try {
            compiledWrapper.apply(moduleInfo.exports, 
                                  [moduleInfo.exports, 
                                   moduleInfo, 
                                   _requireClosure(file.parentFile), 
                                   canonizedFilename, 
                                   "" + __dirname]);
        } catch (e){
            logger.severe("Error:" + e + " while executing module " + canonizedFilename);
            throw e;
        }
        if (verbose)
            logger.info("loaded module " + canonizedFilename);

        moduleInfo.loaded = true;
        return moduleInfo;
    };

    var _requireClosure = function(parent){
        return function(path){
            var module = _require(parent, path);
            return module.exports;
        };
    };
    return _requireClosure(new java.io.File(rootDir));
})
