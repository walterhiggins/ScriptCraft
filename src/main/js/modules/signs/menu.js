'use strict';
var utils = require('utils'),
  store = persist('signs',{});

require('utils/string-exts');
/*
  Define the signs module - signs are persistent 
  (that is - a menu sign will still be a menu after the
  server has shut down and started up) plugins now have persistent state - Yay!
*/
var signs = { };
var hasSign = null;
module.exports = function(hs){
  hasSign = hs;
  return signs;
};

var setLine = null;
if (__plugin.canary){
  setLine = function(sign, i, text){
    sign.setTextOnLine( text, i);
  };
}
if (__plugin.bukkit){
  setLine = function(sign, i, text){
    sign.setLine( i, text);
  };
}

/*
  redraw a menu sign 
*/
var _redrawMenuSign = function( p_sign, p_selectedIndex, p_displayOptions ) {
  var optLen = p_displayOptions.length,
    i,
    text;
  // the offset is where the menu window begins
  var offset = Math.max( 0, Math.min( optLen-3, Math.floor( p_selectedIndex/3 ) * 3) );
  for ( i = 0;i < 3; i++ ) {
    text = '';
    if ( offset+i < optLen ) {
      text = p_displayOptions[offset+i];
    }
    if ( offset+i == p_selectedIndex ) {
      text = ('' + text).replace(/^ /,'>');
    }
    setLine(p_sign, i+1, text);
  }
  if (__plugin.canary){
    p_sign.update();
  }
  if (__plugin.bukkit){
    p_sign.update( true );
  }
};

var _updaters = {};
/*
  construct an interactive menu to be subsequently attached to 
  one or more Signs.
*/
signs.menu = signMenu;

function signMenu( label, options, callback,  selectedIndex ) {
  
  if ( typeof selectedIndex == 'undefined' ) {
    selectedIndex = 0;
  }
  //
  // variables common to all instances of this menu can go here
  //
  var labelPadding =  '---------------';
  var optionPadding = '              ';
  var i;
  var paddedLabel = ( labelPadding + label + labelPadding)
    .substr( ( ( label.length+30 ) / 2 ) - 7, 15 );
  var optLen = options.length;
  var displayOptions = [];
  for ( i = 0; i < options.length; i++ ) {
    displayOptions[i] = (' ' + options[i] + optionPadding).substring(0,15);
  }
  /*
   this function is returned by signs.menu and when it is invoked it will
   attach menu behaviour to an existing sign in the world.
   signs.menu is for use by Plugin Authors. 
   The function returned by signs.menu is for use by admins/ops.
   */
  var convertToMenuSign = function(/* Sign */ sign, save) {
    if (typeof save == 'undefined') {
      save = true;
    }
    //
    // per-sign variables go here
    //
    var cSelectedIndex = selectedIndex;
    setLine(sign, 0, paddedLabel.bold());
    var _updateSign = function( p_player, p_sign ) {
      cSelectedIndex = ( cSelectedIndex + 1 ) % optLen;
      _redrawMenuSign( p_sign, cSelectedIndex, displayOptions );
      var signSelectionEvent = {
        player: p_player,
        sign: p_sign,
        text: options[ cSelectedIndex ], 
        number: cSelectedIndex
      };
      callback( signSelectionEvent );
    };

    /* 
     get a unique ID for this particular sign instance
     */
    var signLoc = sign.block.location;
    var menuSignSaveData = utils.locationToJSON( signLoc );
    var menuSignUID = JSON.stringify( menuSignSaveData );
    /*
     keep a reference to the update function for use by the event handler
     */
    _updaters[ menuSignUID ] = _updateSign;

    // initialize the sign
    _redrawMenuSign( sign, cSelectedIndex, displayOptions );

    /*
     whenever a sign is placed somewhere in the world
     (which is what this function does)
     save its location for loading and initialization 
     when the server starts up again.
     */
    if ( save ) {
      if ( typeof store.menus == 'undefined') {
        store.menus = {};
      }
      var signLocations = store.menus[label];
      if ( typeof signLocations == 'undefined' ) {
        signLocations = store.menus[label] = [];
      }
      signLocations.push( menuSignSaveData );
    }
    return sign;
  }; // end of convertToMenuSign function

  /*
   a new sign definition - need to store (in-memory only)
   its behaviour and bring back to life other signs of the 
   same type in the world. Look for other static signs in the 
   world with this same label and make dynamic again.
   */

  if ( store.menus && store.menus[label] ) {
    var signsOfSameLabel = store.menus[ label ];
    var defragged = [];
    var len = signsOfSameLabel.length;
    for ( i = 0; i < len; i++ ) {
      var loc = utils.locationFromJSON(signsOfSameLabel[i]);
      var block = utils.blockAt(loc);
      var sign = hasSign(block);
      if ( sign) {
        convertToMenuSign( sign, false );
        defragged.push( loc );
      }
    }
    /*
     remove data for signs which no longer exist.
     */
    if ( defragged.length != len ) {
      store.menus[label] = defragged;
    }
  }
  return convertToMenuSign;
}

/*
if (__plugin.canary){
  console.warn('signs/menu is not yet supported in CanaryMod');
  return;
}
*/
if (__plugin.canary){
  events.blockRightClick( function( event ){
    var sign = hasSign(event.blockClicked);
    if (! sign){
      // it's not a sign
      return;
    }
    var evtLocStr = utils.locationToString(event.blockClicked.location);
    var signUpdater = _updaters[evtLocStr];
    if ( signUpdater ) { 
      signUpdater( event.player,  sign);
    }
    
  });
}
if (__plugin.bukkit){
  //
  // update it every time player interacts with it.
  //
  events.playerInteract( function( event ) {
    /*
     look up our list of menu signs. If there's a matching location and there's
     a sign, then update it.
     */
    var sign = hasSign(event.clickedBlock);
    if ( ! sign ) {
      return;
    }
    var evtLocStr = utils.locationToString(event.clickedBlock.location);
    var signUpdater = _updaters[evtLocStr];
    if ( signUpdater ) { 
      signUpdater( event.player, sign );
    }
  });
}


