/*************************************************************************
## Require - Node.js-style module loading in ScriptCraft

#### (Experimental as of 2013-12-21)

Node.js is a server-side javascript environment with an excellent
module loading system based on CommonJS. Modules in Node.js are really
simple. Each module is in its own javascript file and all variables
and functions within the file are private to that file/module only.
There is a very concise explanation of CommonJS modules at...

[http://wiki.commonjs.org/wiki/Modules/1.1.1.][cjsmodules]

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

Right now, the base directory is for relative modules is 'js-plugins'.
Modules can be loaded using relative or absolute paths. Per the CommonJS
module specification, the '.js' suffix is optional.

[cjsmodules]: http://wiki.commonjs.org/wiki/Modules/1.1.1.

***/
(function(__plugin, __engine, verbose){
    /*
      wph 20131215 Experimental 
    */
    var _loadedModules = {};
    
    var _require = function(parentFile, path)
    {
        var _canonize = function(file){ 
            return "" + file.canonicalPath.replaceAll("\\\\","/"); 
        };
        
        var file = new java.io.File(parentFile, path);
        if (!file.exists())
        {
            if (path.match(/\.js$/i)){
                __plugin.logger.warning('require("' + path + '") failed. File [' + file.canonicalPath + '] not found');
                return;
            }else{
                path = path + '.js';
                file = new java.io.File(parentFile, path);
                if (!file.exists()){
                    __plugin.logger.warning('require("' + path + '") failed. File [' + file.canonicalPath + '] not found');
                    return;
                }
            }
        }
        if (file.isDirectory()){
            __plugin.logger.warning('require("' + path + '") directories not yet supported. ' + file.canonicalPath);
            return;
        }
        var canonizedFilename = _canonize(file);
        
        var moduleInfo = _loadedModules[canonizedFilename];
        if (moduleInfo){
            return moduleInfo;
        }
        if (verbose){
            print("loading module " + canonizedFilename);
        }
        var reader = new java.io.FileReader(file);
        var br = new java.io.BufferedReader(reader);
        var code = "";
        while ((r = br.readLine()) !== null) code += r + "\n";

        var head = "(function(exports,module,require,__filename,__dirname){ ";

        moduleInfo = {
            loaded: false,
            id: canonizedFilename,
            exports: {}
        };
        var tail = "})";
        code = head + code + tail;

        _loadedModules[canonizedFilename] = moduleInfo;
        moduleInfo.main = __engine.eval(code);
        moduleInfo.main(moduleInfo.exports, 
                        moduleInfo, 
                        _requireClosure(file.parentFile), 
                        canonizedFilename, 
                        "" + parentFile?parentFile.canonicalPath:"");
        moduleInfo.loaded = true;
        return moduleInfo;
    };

    var _requireClosure = function(parent){
        return function(path){
            var module = _require(parent, path);
            return module.exports;
        };
    };
    return _requireClosure(new java.io.File("./"));
})
