var Drone = require( 'drone' ).Drone,
    blocks = require('blocks');

var rainboway = function( height, length ) {
    var rainbowColors = [blocks.wool.red, blocks.wool.orange, blocks.wool.yellow, blocks.wool.lime, blocks.wool.lightblue, blocks.wool.blue, blocks.wool.purple];
    if ( typeof height == 'undefined' ) {
	height = 1;
    }
    if ( typeof length == 'undefined' ) {
	length = 30;
    }
    this.chkpt( 'rainboway' );
    this.boxa( rainbowColors, 7, height, length );
    return this.move( 'rainboway' );
};

exports.rainboway = rainboway;

