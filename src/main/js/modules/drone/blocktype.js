var blocks = require('blocks');

/************************************************************************
### Drone.blocktype() method

Creates the text out of blocks. Useful for large-scale in-game signs.

#### Parameters
 
 * message - The message to create - (use `\n` for newlines)
 * foregroundBlock (default: black wool) - The block to use for the foreground
 * backgroundBlock (default: none) - The block to use for the background

#### Example

To create a 2-line high message using glowstone...

    blocktype('Hello\nWorld', blocks.glowstone);

![blocktype example][imgbt1]

[imgbt1]: img/blocktype1.png

***/
 
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

    '\'':' # '+
            ' # '+
            '   '+
            '   '+
            '   ',

    '(': '  #  '+
            ' #   '+
            ' #   '+
            ' #   '+
            '  #  ',

    ')': '  #  '+
            '   # '+
            '   # '+
            '   # '+
            '  #  ',
        
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
var c,
  bits,
  width,
  bmInfo,
  j;
for ( c in bitmaps.raw ) {
  bits = bitmaps.raw[c];
  width = bits.length/5;
  bmInfo = { width: width, pixels:[] };
  bitmaps.computed[c] = bmInfo;
  for ( j = 0; j < bits.length; j++ ) {
    if ( bits.charAt(j) != ' ' ) {
      bmInfo.pixels.push( [ 
        j % width, 
        Math.ceil( j / width ) 
      ] );
    }
  }
}
function blocktype( message, fg, bg, immediate ) {

  var bmfg,
    bmbg,
    lines,
    lineCount,
    h,
    line,
    i,
    x,
    y,
    ch,
    bits,
    charWidth,
    j;

  this.chkpt('blocktext');

  if ( typeof fg == 'undefined' ) {
    fg = blocks.wool.black;
  }

  bmfg = this.getBlockIdAndMeta( fg );
  bmbg = null;
  if ( typeof bg != 'undefined' ) {
    bmbg = this.getBlockIdAndMeta( bg );
  }
  lines = (''+ message).split( '\n' );
  lineCount = lines.length;    

  for ( h = 0; h < lineCount; h++) {

    line = lines[h];
    line = line.toLowerCase().replace( /[^0-9a-z \.\-\+\/;':!]/g, '' );
    this.up( 7 * ( lineCount - ( h + 1 ) ) );
    
    for ( i =0; i < line.length; i++) {

      ch = line.charAt( i );
      bits = bitmaps.computed[ ch ];

      if ( typeof bits == 'undefined' ) {
        bits = bitmaps.computed[' '];
      }
      charWidth = bits.width;

      if ( typeof bg != 'undefined' ) {
        this.cuboidX( bmbg[0], bmbg[1], charWidth, 7, 1 , immediate);
      }

      for ( j = 0; j < bits.pixels.length; j++ ) {

        this.chkpt( 'btbl' );
        x = bits.pixels[ j ][ 0 ];
        y = bits.pixels[ j ][ 1] ;
        this.up( 6 - y ).right( x ).cuboidX( bmfg[ 0 ], bmfg[ 1 ], 1, 1, 1, immediate);
        this.move( 'btbl' );

      }
      this.right( charWidth - 1 );

    }
    this.move( 'blocktext' );
  }
  
  return this.move( 'blocktext' );
}
module.exports = function(Drone){
  Drone.extend(blocktype);
};



