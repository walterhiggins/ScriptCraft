/**
* Creates a tile pattern of given block types and size
*
* Paramters:
*	whiteBlock - blockId used for the traditional white portion of the chessboard
*	blackBlock - blockId used for the traditional black portion of the chessboard
*	width - width of the chessboard
*	height - height of the chessboard
*/
load(__folder + "drone.js");

Drone.extend("chessboard", function(whiteBlock, blackBlock, width, depth) {
	this.chkpt('chessboard-start');

	var dep = depth || width;
	
	for(var i = 0; i < width; ++i) {
		for(var j = 0; j < dep; ++j) {
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
