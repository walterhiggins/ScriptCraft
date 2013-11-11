/**
* Creates a tile pattern of given block types and size
*
* Paramters:
*  whiteBlock - blockId used for the traditional white portion of the chessboard
*  blackBlock - blockId used for the traditional black portion of the chessboard
*  width - width of the chessboard
*  height - height of the chessboard
*/
Drone.extend("chessboard", function(whiteBlock, blackBlock, width, depth) {
    this.chkpt('chessboard-start');
    if (typeof width == "undefined")
        width = 8;
    if (typeof depth == "undefined")
        depth = width;
    blackBlock = blackBlock || blocks.wool.black;
    whiteBlock = whiteBlock || blocks.wool.white;

    for(var i = 0; i < width; ++i) {
        for(var j = 0; j < depth; ++j) {
            var block = blackBlock;
            if((i+j)%2 == 1) {
                block = whiteBlock;
            }
            this.box(block);
            this.right();
        }
        this.move('chessboard-start').fwd(i+1);
    }
    
    return this.move('chessboard-start');
});
