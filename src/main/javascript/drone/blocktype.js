load(__folder + "drone.js");

(function(){
 
    var bitmaps = {
        raw: {
            '0':' ### '+
                ' # # '+
                ' # # '+
                ' # # '+
                ' ### ',
            
            '1':'  #  '+
                ' ##  '+
                '  #  '+
                '  #  '+
                ' ### ',
            
            '2':' ### '+
                '   # '+
                ' ### '+
                ' #   '+
                ' ### ',
            
            '3':' ### '+
                '   # '+
                '  ## '+
                '   # '+
                ' ### ',

            '4':'   # '+
                '  ## '+
                ' # # '+
                ' ### '+
                '   # ',
            
            '5':' ### '+
                ' #   '+
                ' ### '+
                '   # '+
                ' ### ',
            
            '6':' ### '+
                ' #   '+
                ' ### '+
                ' # # '+
                ' ### ',
            
            '7':' ### '+
                '   # '+
                '  #  '+
                '  #  '+
                '  #  ',

            '8':' ### '+
                ' # # '+
                ' ### '+
                ' # # '+
                ' ### ',

            '9':' ### '+
                ' # # '+
                ' ### '+
                '   # '+
                ' ### ',

            'a':' ### '+
                ' # # '+
                ' ### '+
                ' # # '+
                ' # # ',

            'b':' ##  '+
                ' # # '+
                ' ##  '+
                ' # # '+
                ' ##  ',
            
            'c':'  ## '+
                ' #   '+
                ' #   '+
                ' #   '+
                '  ## ',

            'd':' ##  '+
                ' # # '+
                ' # # '+
                ' # # '+
                ' ##  ',

            'e':' ### '+
                ' #   '+
                ' ##  '+
                ' #   '+
                ' ### ',

            'f':' ### '+
                ' #   '+
                ' ##  '+
                ' #   '+
                ' #   ',

            'g':' ### '+
                ' #   '+
                ' #   '+
                ' # # '+
                ' ### ',

            'h':' # # '+
                ' # # '+
                ' ### '+
                ' # # '+
                ' # # ',

            'i':' ### '+
                '  #  '+
                '  #  '+
                '  #  '+
                ' ### ',
            
            'j':' ### '+
                '  #  '+
                '  #  '+
                '  #  '+
                ' #   ',
            
            'k':' #   '+
                ' # # '+
                ' ##  '+
                ' # # '+
                ' # # ',
            
            'l':' #   '+
                ' #   '+
                ' #   '+
                ' #   '+
                ' ### ',
            
            'm':' # # '+
                ' ### '+
                ' # # '+
                ' # # '+
                ' # # ',

            'n':' ##  '+
                ' # # '+
                ' # # '+
                ' # # '+
                ' # # ',

            'o':'  #  '+
                ' # # '+
                ' # # '+
                ' # # '+
                '  #  ',

            'p':' ### '+
                ' # # '+
                ' ### '+
                ' #   '+
                ' #   ',
            
            'q':' ### '+
                ' # # '+
                ' # # '+
                ' ### '+
                '   # ',

            'r':' ##  '+
                ' # # '+
                ' ##  '+
                ' # # '+
                ' # # ',

            's':'  ## '+
                ' #   '+
                ' ### '+
                '   # '+
                ' ##  ',

            't':' ### '+
                '  #  '+
                '  #  '+
                '  #  '+
                '  #  ',

            'u':' # # '+
                ' # # '+
                ' # # '+
                ' # # '+
                ' ### ',

            'v':' # # '+
                ' # # '+
                ' # # '+
                ' # # '+
                '  #  ',

            'w':' # # '+
                ' # # '+
                ' # # '+
                ' ### '+
                ' # # ',

            'x':' # # '+
                ' # # '+
                '  #  '+
                ' # # '+
                ' # # ',

            'y':' # # '+
                ' # # '+
                ' # # '+
                '  #  '+
                '  #  ',
            
            'z':' ### '+
                '   # '+
                '  #  '+
                ' #   '+
                ' ### ',
            
            '!':' # '+
                ' # '+
                ' # '+
                '   '+
                ' # ',

            ':':'   '+
                ' # '+
                '   '+
                ' # '+
                '   ',

            ';':'    '+
                '  # '+
                '    '+
                '  # '+
                ' #  ',

            ',':'    '+
                '    '+
                '    '+
                '  # '+
                ' #  ',

            '/':'  # '+
                '  # '+
                '  # '+
                ' #  '+
                ' #  ',

            '+':'     '+
                '  #  '+
                ' ### '+
                '  #  '+
                '     ',
            
            '-':'     '+
                '     '+
                ' ### '+
                '     '+
                '     ',

            '.':'   '+
                '   '+
                '   '+
                '   '+
                ' # ',

            "'":' # '+
                ' # '+
                '   '+
                '   '+
                '   ',
            
            ' ':'   '+
                '   '+
                '   '+
                '   '+
                '   '
        },
        computed: {}
    };
    /*
      wph 20130121 compute the width, and x,y coords of pixels ahead of time
     */
    for (var c in bitmaps.raw){
        var bits = bitmaps.raw[c];
        var width = bits.length/5;
        var bmInfo = {"width": width,"pixels":[]}
        bitmaps.computed[c] = bmInfo;
        for (var j = 0; j < bits.length; j++){
            if (bits.charAt(j) != ' '){
                bmInfo.pixels.push([j%width,Math.ceil(j/width)]);
            }
        }
    }
    //
    // Creates the text out of blocks
    //
    // message
    //   string with text to be displayed
    // fg
    //   foreground material. The material the text will be in.
    // bg
    //   background material, optional. The negative space within the bounding box of the text.
    //
    Drone.extend('blocktype', function(message,fg,bg){

        this.chkpt('blocktext');

        var bmfg = this._getBlockIdAndMeta(fg);
        var bmbg = null;
        if (typeof bg != "undefined")
            bmbg = this._getBlockIdAndMeta(bg);
        var lines = message.split("\n");
        var lineCount = lines.length;    
        for (var h = 0;h < lineCount; h++) {
            var line = lines[h];
            line = line.toLowerCase().replace(/[^0-9a-z \.\-\+\/\;\'\:\!]/g,"");
            this.up(7*(lineCount-(h+1)));
            
            for (var i =0;i < line.length; i++)  {
                var ch = line.charAt(i)
                var bits = bitmaps.computed[ch];
                if (typeof bits == "undefined"){
                    bits = bitmaps.computed[' '];
                }
                var charWidth = bits.width;
                if (typeof bg != "undefined")
                    this.cuboidX(bmbg[0],bmbg[1],charWidth,7,1);
                for (var j = 0;j < bits.pixels.length;j++){
                    this.chkpt('btbl');
                    var x = bits.pixels[j][0];
                    var y = bits.pixels[j][1];
                    this.up(6-y).right(x).cuboidX(bmfg[0],bmfg[1]);
                    this.move('btbl');
                }
                this.right(charWidth-1);
            }
            this.move('blocktext');
        }
        
        return this.move('blocktext');
    });
}());


