load(__folder + "drone.js");
/*
  Creates a Rainbow
*/
Drone.extend('rainbow', function(radius){
    if (typeof radius == "undefined")
        radius = 12;
    
    this.chkpt('rainbow');
    this.down(radius);
    var colors = [blocks.wool.red,
                  blocks.wool.orange,
                  blocks.wool.yellow,
                  blocks.wool.lime,
                  blocks.wool.blue,
                  blocks.wool.purple];

    for (var i = 0;i < colors.length; i++) {

        var bm = this._getBlockIdAndMeta(colors[i]);
        
        this.arc({
            blockType: bm[0],
            meta: bm[1],
            radius: radius-i,
            strokeWidth: 2,
            quadrants: {topright: true,
                        topleft: true},
            orientation: 'vertical'}).right().up();
    }
    return this.move('rainbow');
});
