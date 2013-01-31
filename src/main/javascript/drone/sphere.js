load(__folder + "drone.js");

Drone.extend('sphere', function(block,radius)
{
    var lastRadius = radius;
    var slices = [[radius,0]];
    var diameter = radius*2;
    var world = this._getWorld();
    var bm = this._getBlockIdAndMeta(block);

    var r2 = radius*radius;
    for (var i = 0; i <= radius;i++){
        var newRadius = Math.round(Math.sqrt(r2 - i*i));
        if (newRadius == lastRadius)
            slices[slices.length-1][1]++;
        else
            slices.push([newRadius,1]);
        lastRadius = newRadius;
    }
    this.chkpt('sphere');
    //
    // mid section
    //
    this.up(radius - slices[0][1])
        .cylinder(block,radius,(slices[0][1]*2)-1,{blockType: bm[0],meta: bm[1],world: world})
        .down(radius-slices[0][1]);
    
    var yOffset = -1;
    for (var i = 1; i < slices.length;i++)
    {
        yOffset += slices[i-1][1];
        var sr = slices[i][0];
        var sh = slices[i][1];
        var v = radius + yOffset, h = radius-sr;
        // northern hemisphere
        this.up(v).fwd(h).right(h)
            .cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1],world: world})
            .left(h).back(h).down(v);
        
        // southern hemisphere
        v = radius - (yOffset+sh+1);
        this.up(v).fwd(h).right(h)
            .cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1],world: world})
            .left(h).back(h). down(v);
    }
    return this.move('sphere');
});
//
// sphere0 creates an empty sphere but the code needs work
// - there are gaps in the sphere due to rasterization.
//
Drone.extend('sphere0', function(block,radius)
{
    return this.sphere(block,radius)
        .fwd().right().up()
        .sphere(0,radius-1)
        .back().left().down();
});
