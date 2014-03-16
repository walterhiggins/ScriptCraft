'use strict';
var tabCompleteJSP = require('tabcomplete-jsp');
/*
  Tab Completion of the /js and /jsp commands
*/
var _isJavaObject = function(o){
    var result = false;
    try {
        o.hasOwnProperty( 'testForJava' );
    } catch (e) {
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
    /*
     fix for issue #115 - java objects are not iterable
     see: http://mail.openjdk.java.net/pipermail/nashorn-dev/2014-March/002790.html
     */
    if ( typeof Object.bindProperties === 'function' ) { 
      var placeholder = {};
      Object.bindProperties(placeholder, o);
      o = placeholder;
    }
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
    lastArgProp,
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

  lastArg = cmdArgs.length ? cmdArgs[ cmdArgs.length - 1 ] + '' : null;
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

    //print('DEBUG: name=' + name + ',symbol=' + symbol);

    lastGoodSymbol = symbol;
    if ( typeof symbol !== 'undefined' ) {
      for ( i = 1; i < parts.length; i++ ) {
        name = parts[i];
        if ( !name ) { // fix issue #115
          break;
        }
        symbol = symbol[name]; // this causes problem in jre8 if name is ''
        if ( typeof symbol == 'undefined' ) {
          break;
        }
        // nashorn - object[missingProperty] returns null not undefined
        if ( symbol == null ) {
          break;
        }
        lastGoodSymbol = symbol;
      }
      if ( typeof symbol == 'undefined' || symbol === null) {
        //
        // look up partial matches against last good symbol
        //
        objectProps = _getProperties( lastGoodSymbol );
        if ( name == '' ) {
          // if the last symbol looks like this.. 
          // server.
          //
          //print('debug:case Y1: server.');
          
          for ( i = 0; i < objectProps.length; i++ ) {
            candidate = lastSymbol + objectProps[i];
            re = new RegExp( lastSymbol + '$', 'g' );
            propsOfLastArg.push( lastArg.replace( re, candidate ) );
          }
          
        } else {
          // it looks like this..
          // server.wo
          //
          //print('debug:case Y2: server.wo');
          
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
	//print('debug:case Y3: server');
        objectProps = _getProperties( symbol );
        for ( i = 0; i < objectProps.length; i++ ) {
          re = new RegExp( lastSymbol+ '$', 'g' );
          lastArgProp = lastArg.replace( re, lastSymbol + '.' + objectProps[i] ) ;
          lastArgProp = lastArgProp.replace(/\.\./g,'.');
          propsOfLastArg.push( lastArgProp );
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
