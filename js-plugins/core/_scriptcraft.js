var global = this;
var ScriptCraft = ScriptCraft || {};
ScriptCraft.core = ScriptCraft.core || {};
//
// private implementation
//
(function(){
    //
    // don't execute this more than once
    //
    if (typeof load == "function")
        return ;
    
    var _originalScript = __script;
    importPackage(java.io);
    var _canonize = function(file){
        return file.getCanonicalPath().replaceAll("\\\\","/");
    };
    var _load = function(filename){
        var file = new File(filename);
        print("loading " + _canonize(file));
        if (file.exists()){
            var parent = file.getParentFile();
            var reader = new FileReader(file);
            __engine.put("__script",_canonize(file));
            __engine.put("__folder",(parent?_canonize(parent):"")+"/");
            __engine.eval(reader);
        }else{
            print("Error: " + filename + " not found");
        }
    };
    var _listJsFiles = function(store,dir)
    {
        if (typeof dir == "undefined"){
            dir = new File(_originalScript).getParentFile().getParentFile();
        }
        var files = dir.listFiles();
        for (var i = 0;i < files.length; i++){
            if (files[i].isDirectory()){
                _listJsFiles(store,files[i]);
            }else{
                if (files[i].getCanonicalPath().endsWith(".js") &&
                   !(files[i].getName().startsWith("_")))
                {
                    store.push(files[i]);
                }
            }
        }
    };
    var _reload = function(pluginDir)
    {
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
        for (var i = 0;i < jsFiles.length; i++){
            load(_canonize(jsFiles[i]));
        }
    };
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
        if (_isJavaObject(o)){
            propertyLoop:
            for (var i in o){
                //
                // don't include standard Object methods
                //
                var isObjectMethod = false;
                for (var j = 0;j < _javaLangObjectMethods.length; j++)
                    if (_javaLangObjectMethods[j] == i)
                        continue propertyLoop;
                if (typeof o[i] == "function")
                    result.push(i+"()");
                else
                    result.push(i);
            }
        }else{
            for (var i in o){
                if (!o.hasOwnProperty(i))
                    continue;
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

    var __onTabComplete2 = function()
    {
        var _globalSymbols = _getProperties(global)
        var result = global.__onTC_result;
        var args = global.__onTC_args;
        var propsOfLastArg = [];
        var statement = args.join(" ");
		  statement = statement.replace(/^\s+/,"").replace(/\s+$/,"");
		  
        if (statement.length == 0){
				propsOfLastArg = _globalSymbols;
        }else{
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
                            propsOfLastArg.push(statement+objectProps[i]);;
                    }else{
								// it looks like this..
								// ScriptCraft.co
								//
								var li = statement.lastIndexOf(name);
								statement = statement.substring(0,li);

                        for (var i = 0; i < objectProps.length;i++){
                            if (objectProps[i].indexOf(name) == 0){
                                propsOfLastArg.push(statement + objectProps[i]);
                            }
                        }
                    }
                }else{
                    var objectProps = _getProperties(symbol);
                    for (var i = 0; i < objectProps.length; i++){
                        propsOfLastArg.push(statement + objectProps[i]);
                    }
                }
            }else{
                // loop thru globalSymbols looking for a good match
                for (var i = 0;i < _globalSymbols.length; i++){
                    if (_globalSymbols[i].indexOf(lastSymbol) == 0){
                        propsOfLastArg.push(statement.replace(lastSymbol,_globalSymbols[i]));
                    }
                }
            }
        }
        for (var i = 0;i < propsOfLastArg.length; i++){
            result.add(propsOfLastArg[i]);
        }
    };
    global._onTabComplete = __onTabComplete2;


    ScriptCraft.core.load = _load;
    ScriptCraft.core.reload = _reload;

    for (var f in ScriptCraft.core){
        global[f] = ScriptCraft.core[f];
    }
    ScriptCraft.core.initialized = true;
    //
    // assumes this was loaded from js-plugins/core/
    //
    reload(new File(__script).getParentFile().getParentFile());

}());



