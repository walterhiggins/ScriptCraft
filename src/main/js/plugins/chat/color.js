/*************************************************************************
## chat Plugin

This plugin lets players choose a text color to use when chatting. Players can list colors by typing...

    /jsp list_colors

... and can set the color to use when chatting by typing...

    /jsp chat_color {color}

... where {color} is one of the following colors...

 * black
 * blue
 * darkgreen
 * darkaqua
 * darkred
 * purple
 * gold
 * gray
 * darkgray
 * indigo
 * brightgreen
 * aqua
 * red
 * pink
 * yellow
 * white

This plugin's source code is useful to study because it is short and demonstrates use of the `plugin()`, and `command()` functions, persistence and event handling.

***/
var _store = { players: { } },
  colorCodes = {},
  i,
  colors = [
    'black', 
    'blue', 
    'darkgreen', 
    'darkaqua', 
    'darkred',
    'purple', 
    'gold', 
    'gray', 
    'darkgray', 
    'indigo',
    'brightgreen', 
    'aqua', 
    'red', 
    'pink', 
    'yellow', 
    'white'
  ],
  foreach = require('utils').foreach;

/*
  declare a new javascript plugin for changing chat text color
*/
exports.chat = plugin( 'chat', {
  /*
   set the color of text for a given player
   */
  setColor: function( player, color ) {
    _store.players[ player.name ] = color;
  },

  store: _store

},true);

foreach( colors, function ( color, i ) {
  colorCodes[color] = i.toString( 16 );
} );

events.on( 'player.AsyncPlayerChatEvent', function( l, e ) {
  var player = e.player;
  var playerChatColor = _store.players[ player.name ];
  if ( playerChatColor ) {
    e.message = '§' + colorCodes[ playerChatColor ] + e.message;
  }
});

var listColors = function( params, sender ) {
  var colorNamesInColor = [];
  foreach (colors, function( color ) { 
    colorNamesInColor.push( '§' + colorCodes[color] + color );
  } );
  sender.sendMessage( 'valid chat colors are ' + colorNamesInColor.join( ', ') );
};

command( 'list_colors', listColors );
command( 'chat_color', function( params, sender ) {
  var color = params[0];
  if ( colorCodes[color] ) {
    chat.setColor( sender, color );
  } else {
    sender.sendMessage( color + ' is not a valid color' );
    listColors();
  }
}, colors );

