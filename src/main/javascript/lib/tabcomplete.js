'use strict';
var tabCompleteJSP = require('tabcomplete-jsp');
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
var _javaLangObjectMethods = [
    'equals'
    ,'getClass'
    ,'class'
    ,'getClass'
    ,'hashCode'
    ,'notify'
    ,'notifyAll'
    ,'toString'
    ,'wait'
    ,'clone'
    ,'finalize'
];
    
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
                if (e.message == 'java.lang.IllegalStateException: Entity not leashed'){
                    // wph 20131020 fail silently for Entity leashing in craftbukkit
                }else{
                    throw e;
                }
            }
            if (typeofProperty == 'function' )
                result.push(i+'()');
            else
                result.push(i);
        }
    }else{
        if (o.constructor == Array)
            return result;
        
        for (var i in o){
            if (i.match(/^[^_]/)){
                if (typeof o[i] == 'function')
                    result.push(i+'()');
                else
                    result.push(i);
            }
        }
    }
    return result.sort();
};

var onTabCompleteJS = function( result, cmdSender, pluginCmd, cmdAlias, cmdArgs) {

    cmdArgs = Array.prototype.slice.call(cmdArgs, 0);

    if (pluginCmd.name == 'jsp')
        return tabCompleteJSP( result, cmdSender, pluginCmd, cmdAlias, cmdArgs );

    global.self = cmdSender; // bring in self just for autocomplete

    var _globalSymbols = _getProperties(global)

    var lastArg = cmdArgs.length?cmdArgs[cmdArgs.length-1]+'':null;
    var propsOfLastArg = [];
    var statement = cmdArgs.join(' ');
    
    statement = statement.replace(/^\s+/,'').replace(/\s+$/,'');
    
    
    if (statement.length == 0)
        propsOfLastArg = _globalSymbols;
    else{
        var statementSyms = statement.split(/[^\$a-zA-Z0-9_\.]/);
        var lastSymbol = statementSyms[statementSyms.length-1];
        //print('DEBUG: lastSymbol=[' + lastSymbol + ']');
        //
        // try to complete the object ala java IDEs.
        //
        var parts = lastSymbol.split(/\./);
        var name = parts[0];
        var symbol = global[name];
        var lastGoodSymbol = symbol;
        if (typeof symbol != 'undefined')
        {
            for (var i = 1; i < parts.length;i++){
                name = parts[i];
                symbol = symbol[name];
                if (typeof symbol == 'undefined')
                    break;
                lastGoodSymbol = symbol;
            }
            //print('debug:name['+name+']lastSymbol['+lastSymbol+']symbol['+symbol+']');
            if (typeof symbol == 'undefined'){
                //
                // look up partial matches against last good symbol
                //
                var objectProps = _getProperties(lastGoodSymbol);
                if (name == ''){
                    // if the last symbol looks like this.. 
                    // ScriptCraft.
                    //
                    
                    for (var i =0;i < objectProps.length;i++){
                        var candidate = lastSymbol + objectProps[i];
                        var re = new RegExp(lastSymbol + '$','g');
                        propsOfLastArg.push(lastArg.replace(re,candidate));
                    }
                    
                }else{
                    // it looks like this..
                    // ScriptCraft.co
                    //
                    //print('debug:case Y: ScriptCraft.co');
                    
                    var li = statement.lastIndexOf(name);
                    for (var i = 0; i < objectProps.length;i++){
                        if (objectProps[i].indexOf(name) == 0)
                        {
                            var candidate = lastSymbol.substring(0,lastSymbol.lastIndexOf(name));
                            candidate = candidate + objectProps[i];
                            var re = new RegExp(lastSymbol+ '$','g');
                            //print('DEBUG: re=' + re + ',lastSymbol='+lastSymbol+',lastArg=' + lastArg + ',candidate=' + candidate);
                            propsOfLastArg.push(lastArg.replace(re,candidate));
                        }
                    }
                    
                }
            }else{
                //print('debug:case Z:ScriptCraft');
                var objectProps = _getProperties(symbol);
                for (var i = 0; i < objectProps.length; i++){
                    var re = new RegExp(lastSymbol+ '$','g');
                    propsOfLastArg.push(lastArg.replace(re,lastSymbol + '.' + objectProps[i]));
                }
            }
        }else{
            //print('debug:case AB:ScriptCr');
            // loop thru globalSymbols looking for a good match
            for (var i = 0;i < _globalSymbols.length; i++){
                if (_globalSymbols[i].indexOf(lastSymbol) == 0){
                    var possibleCompletion = _globalSymbols[i];
                    var re = new RegExp(lastSymbol+ '$','g');
                    propsOfLastArg.push(lastArg.replace(re,possibleCompletion));
                }
            }
                
        }
    }
    for (var i = 0;i < propsOfLastArg.length; i++)
        result.add(propsOfLastArg[i]);

    delete global.self; // delete self when no longer needed for autocomplete
};
module.exports = onTabCompleteJS;
