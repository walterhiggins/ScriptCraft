/************************************************************************
String class extensions
-----------------------
The following chat-formatting methods are added to the javascript String class..

 * black()
 * darkblue()
 * blue()
 * darkgreen()
 * darkaqua()
 * darkred()
 * purple()
 * gold()
 * gray()
 * darkgray()
 * indigo()
 * brightgreen()
 * green()
 * aqua()
 * red()
 * pink()
 * yellow()
 * white()
 * bold()
 * random()
 * strike()
 * underline()
 * italic()
 * reset()

Example
-------

    var boldGoldText = "Hello World".bold().gold();
    self.sendMessage(boldGoldText);

<p style="color:gold;font-weight:bold">Hello World</p>    

***/
(function(){
    var formattingCodes = {
        black: 0,
        darkblue: 1,
        blue: 1,
        darkgreen: 2,
        darkaqua: 3,
        darkred: 4,
        purple: 5,
        gold: 6,
        gray: 7,
        darkgray: 8,
        indigo: 9,
        brightgreen: 'a',
        green: 'a',
        aqua: 'b',
        red: 'c',
        pink: 'd',
        yellow: 'e',
        white: 'f',
        bold: 'l',
        random:'k',
        strike: 'm',
        underline: 'n',
        italic: 'o',
        reset: 'r'
    };
    for (var method in formattingCodes){
        String.prototype[method] = function(m,c){
            return function(){ return "§"+c + this;};
        }(method,formattingCodes[method]);
    }
}());
