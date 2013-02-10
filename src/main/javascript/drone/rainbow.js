/************************************************************************
Drone.rainbox() method
======================
Creates a Rainbow.

Parameters
----------

 * radius (optional - default:18) - The radius of the rainbow

Example
-------
    
    var d = new Drone();
    d.rainbow(30);

![rainbow example](img/rainbowex1.png)

***/
Drone.extend('rainbow', function(radius){
    if (typeof radius == "undefined")
        radius = 18;
    
    this.chkpt('rainbow');
    this.down(radius);
    var colors = [blocks.wool.red,
                  blocks.wool.orange,
                  blocks.wool.yellow,
                  blocks.wool.lime,
                  blocks.wool.lightblue,
                  blocks.wool.blue,
                  blocks.wool.purple,
                  blocks.air];

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
