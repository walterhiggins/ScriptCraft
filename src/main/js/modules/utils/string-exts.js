'use strict';
/************************************************************************
String class extensions
-----------------------
The following chat-formatting methods are added to the javascript String class..

    * aqua()
    * black()
    * blue()
    * bold()
    * brightgreen()
    * darkaqua()
    * darkblue()
    * darkgray()
    * darkgreen()
    * purple()
    * darkpurple()
    * darkred()
    * gold()
    * gray()
    * green()
    * italic()
    * lightpurple()
    * indigo()
    * green()
    * red()
    * pink()
    * yellow()
    * white()
    * strike()
    * random()
    * magic()
    * underline()
    * reset()

Example
-------

    /js var boldGoldText = "Hello World".bold().gold();
    /js echo(self, boldGoldText );

<p style="color:gold;font-weight:bold">Hello World</p>    

***/
var COLOR_CHAR = '\u00a7';
var formattingCodes = {
  aqua: 'b',
  black: '0',
  blue: '9',
  bold: 'l',
  brightgreen: 'a',
  darkaqua: '3',
  darkblue: '1',
  darkgray: '8',
  darkgreen: '2',
  purple: 'd',
  darkpurple: '5',
  darkred: '4',
  gold: '6',
  gray: '7',
  green: 'a',
  italic: 'o',
  lightpurple: 'd',
  indigo: '9',
  red: 'c',
  pink: 'd',
  yellow: 'e',
  white: 'f',
  strike: 'm',
  random: 'k',
  magic: 'k',
  underline: 'n',
  reset: 'r'
};
for ( var method in formattingCodes ) {
  String.prototype[method] = function( c ) {
    return function(){ return c + this; };
  }( COLOR_CHAR + formattingCodes[method] );
}
