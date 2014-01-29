'use strict';
var tabCompleteJSP = require('tabcomplete-jsp');
/*
  Tab Completion of the /js and /jsp commands
*/
var _isJavaObject = function(o){
    var result = false;
    try {
        o.hasOwnProperty( 'testForJava' );
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

var _getProperties = function( o ) {
  var result = [], 
    i,
    j,
    isObjectMethod,
    typeofProperty;
  if ( _isJavaObject( o ) ) {
    propertyLoop:
    for ( i in o ) {
      //
      // don't include standard Object methods
      //
      isObjectMethod = false;
      for ( j = 0; j < _javaLangObjectMethods.length; j++ ) {
        if ( _javaLangObjectMethods[j] == i ) {
          continue propertyLoop;
	}
      }
      typeofProperty = null;
      try { 
        typeofProperty = typeof o[i];
      } catch( e ) {
        if ( e.message == 'java.lang.IllegalStateException: Entity not leashed' ) {
          // wph 20131020 fail silently for Entity leashing in craftbukkit
        } else {
          throw e;
        }
      }
      if ( typeofProperty == 'function' ) {
        result.push( i+'()' );
      } else {
        result.push( i );
      }
    }
  } else {
    if ( o.constructor == Array ) {
      return result;
    }
    for ( i in o ) {
      if ( i.match( /^[^_]/ ) ) {
        if ( typeof o[i] == 'function' ) {
          result.push( i+'()' );
	} else {
          result.push( i );
	}
      }
    }
  }
  return result.sort();
};

var onTabCompleteJS = function( result, cmdSender, pluginCmd, cmdAlias, cmdArgs ) {

  var _globalSymbols,
    lastArg,
    propsOfLastArg,
    statement,
    statementSyms,
    lastSymbol,
    parts, 
    name,
    symbol,
    lastGoodSymbol,
    i,
    objectProps,
    candidate,
    re,
    li,
    possibleCompletion;

  cmdArgs = Array.prototype.slice.call( cmdArgs, 0 );

  if ( pluginCmd.name == 'jsp' ) {
    return tabCompleteJSP( result, cmdSender, pluginCmd, cmdAlias, cmdArgs );
  }
  global.self = cmdSender; // bring in self just for autocomplete

  _globalSymbols = _getProperties(global);

  lastArg = cmdArgs.length?cmdArgs[cmdArgs.length-1]+'':null;
  propsOfLastArg = [];
  statement = cmdArgs.join(' ');
  
  statement = statement.replace(/^\s+/,'').replace(/\s+$/,'');
  
  if ( statement.length == 0 ) { 
    propsOfLastArg = _globalSymbols;
  } else {
    statementSyms = statement.split(/[^\$a-zA-Z0-9_\.]/);
    lastSymbol = statementSyms[statementSyms.length-1];
    //print('DEBUG: lastSymbol=[' + lastSymbol + ']');
    //
    // try to complete the object ala java IDEs.
    //
    parts = lastSymbol.split(/\./);
    name = parts[0];
    symbol = global[name];
    lastGoodSymbol = symbol;
    if ( typeof symbol != 'undefined' ) {
      for ( i = 1; i < parts.length; i++ ) {
        name = parts[i];
        symbol = symbol[name];
        if ( typeof symbol == 'undefined' ) {
          break;
	}
        lastGoodSymbol = symbol;
      }
      //print('debug:name['+name+']lastSymbol['+lastSymbol+']symbol['+symbol+']');
      if ( typeof symbol == 'undefined' ) {
        //
        // look up partial matches against last good symbol
        //
        objectProps = _getProperties( lastGoodSymbol );
        if ( name == '' ) {
          // if the last symbol looks like this.. 
          // ScriptCraft.
          //
          
          for ( i =0; i < objectProps.length; i++ ) {
            candidate = lastSymbol + objectProps[i];
            re = new RegExp( lastSymbol + '$', 'g' );
            propsOfLastArg.push( lastArg.replace( re, candidate ) );
          }
          
        } else {
          // it looks like this..
          // ScriptCraft.co
          //
          //print('debug:case Y: ScriptCraft.co');
          
	  li = statement.lastIndexOf(name);
	  for ( i = 0; i < objectProps.length; i++ ) {
            if ( objectProps[i].indexOf(name) == 0 ) {
              candidate = lastSymbol.substring( 0, lastSymbol.lastIndexOf( name ) );
              candidate = candidate + objectProps[i];
              re = new RegExp( lastSymbol + '$', 'g' );
              propsOfLastArg.push( lastArg.replace( re, candidate ) );
            }
          }
        }
      } else {
        objectProps = _getProperties( symbol );
        for ( i = 0; i < objectProps.length; i++ ) {
          re = new RegExp( lastSymbol+ '$', 'g' );
          propsOfLastArg.push( lastArg.replace( re, lastSymbol + '.' + objectProps[i] ) );
        }
      }
    } else {
      for ( i = 0; i < _globalSymbols.length; i++ ) {
        if ( _globalSymbols[i].indexOf(lastSymbol) == 0 ) {
          possibleCompletion = _globalSymbols[i];
          re = new RegExp( lastSymbol+ '$', 'g' );
          propsOfLastArg.push( lastArg.replace( re, possibleCompletion ) );
        }
      }
    }
  }
  for ( i = 0; i < propsOfLastArg.length; i++ ) {
    result.add( propsOfLastArg[i] );
  }

  delete global.self; // delete self when no longer needed for autocomplete
};
module.exports = onTabCompleteJS;
