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
    /js self.sendMessage(boldGoldText);

<p style="color:gold;font-weight:bold">Hello World</p>    

***/
var c = org.bukkit.ChatColor;
var formattingCodes = {
    aqua: c.AQUA,
    black: c.BLACK,
    blue: c.BLUE,
    bold: c.BOLD,
    brightgreen: c.GREEN,
    darkaqua: c.DARK_AQUA,
    darkblue: c.DARK_BLUE,
    darkgray: c.DARK_GRAY,
    darkgreen: c.DARK_GREEN,
    purple: c.LIGHT_PURPLE,
    darkpurple: c.DARK_PURPLE,
    darkred: c.DARK_RED,
    gold: c.GOLD,
    gray: c.GRAY,
    green: c.GREEN,
    italic: c.ITALIC,
    lightpurple: c.LIGHT_PURPLE,
    indigo: c.BLUE,
    red: c.RED,
    pink: c.LIGHT_PURPLE,
    yellow: c.YELLOW,
    white: c.WHITE,
    strike: c.STRIKETHROUGH,
    random: c.MAGIC,
    magic: c.MAGIC,
    underline: c.UNDERLINE,
    reset: c.RESET
};
for (var method in formattingCodes){
    String.prototype[method] = function(c){
        return function(){return c+this;};
    }(formattingCodes[method]);
}
