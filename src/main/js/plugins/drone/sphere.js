var Drone = require('./drone').Drone;

/************************************************************************
### Drone.sphere() method

Creates a sphere.

#### Parameters
 
 * block - The block the sphere will be made of.
 * radius - The radius of the sphere.

#### Example

To create a sphere of Iron with a radius of 10 blocks...

    sphere( blocks.iron, 10);

![sphere example](img/sphereex1.png)

Spheres are time-consuming to make. You *can* make large spheres (250 radius) but expect the
server to be very busy for a couple of minutes while doing so.

***/
Drone.extend('sphere', function(block,radius)
{
    var lastRadius = radius;
    var slices = [[radius,0]];
    var diameter = radius*2;
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
        .cylinder(block,radius,(slices[0][1]*2)-1,{blockType: bm[0],meta: bm[1]})
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
            .cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1]})
            .left(h).back(h).down(v);
        
        // southern hemisphere
        v = radius - (yOffset+sh+1);
        this.up(v).fwd(h).right(h)
            .cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1]})
            .left(h).back(h). down(v);
    }
    return this.move('sphere');
});
/************************************************************************
### Drone.sphere0() method

Creates an empty sphere.

#### Parameters
 
 * block - The block the sphere will be made of.
 * radius - The radius of the sphere.

#### Example

To create a sphere of Iron with a radius of 10 blocks...

    sphere0( blocks.iron, 10);

Spheres are time-consuming to make. You *can* make large spheres (250 radius) but expect the
server to be very busy for a couple of minutes while doing so.

***/
Drone.extend('sphere0', function(block,radius)
{
/*
    this.sphere(block,radius)
        .fwd().right().up()
        .sphere(0,radius-1)
        .back().left().down();

*/

    var lastRadius = radius;
    var slices = [[radius,0]];
    var diameter = radius*2;
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
    this.chkpt('sphere0');
    //
    // mid section
    //
    //.cylinder(block,radius,(slices[0][1]*2)-1,{blockType: bm[0],meta: bm[1]})
    this.up(radius - slices[0][1])
        .arc({blockType: bm[0], 
              meta: bm[1], 
              radius: radius, 
              strokeWidth: 2,
              stack: (slices[0][1]*2)-1,
              fill: false
             })
        .down(radius-slices[0][1]);
    
    var yOffset = -1;
    var len = slices.length;
    for (var i = 1; i < len;i++)
    {
        yOffset += slices[i-1][1];
        var sr = slices[i][0];
        var sh = slices[i][1];
        var v = radius + yOffset, h = radius-sr;
        // northern hemisphere
        // .cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1]})
        this.up(v).fwd(h).right(h)
            .arc({
                blockType: bm[0],
                meta: bm[1],
                radius: sr,
                stack: sh,
                fill: false,
                strokeWidth: i<len-1?1+(sr-slices[i+1][0]):1
            })
            .left(h).back(h).down(v);
        
        // southern hemisphere
        v = radius - (yOffset+sh+1);
        //.cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1]})
        this.up(v).fwd(h).right(h)
            .arc({
                blockType: bm[0],
                meta: bm[1],
                radius: sr,
                stack: sh,
                fill: false,
                strokeWidth: i<len-1?1+(sr-slices[i+1][0]):1
            })
            .left(h).back(h). down(v);
    }
    this.move('sphere0');

    return this;

});
/************************************************************************
### Drone.hemisphere() method

Creates a hemisphere. Hemispheres can be either north or south.

#### Parameters

 * block - the block the hemisphere will be made of.
 * radius - the radius of the hemisphere
 * northSouth - whether the hemisphere is 'north' or 'south'

#### Example

To create a wood 'north' hemisphere with a radius of 7 blocks...

    hemisphere(blocks.oak, 7, 'north');

![hemisphere example](img/hemisphereex1.png)

***/
Drone.extend('hemisphere', function(block,radius, northSouth){
    var lastRadius = radius;
    var slices = [[radius,0]];
    var diameter = radius*2;
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
    this.chkpt('hsphere');
    //
    // mid section
    //
    if (northSouth == "north"){
        this.cylinder(block,radius,slices[0][1],{blockType: bm[0],meta: bm[1]});
    } else {
        this.up(radius - slices[0][1])
        .cylinder(block,radius,slices[0][1],{blockType: bm[0],meta: bm[1]})
        .down(radius - slices[0][1]);
    }
    
    var yOffset = -1;
    for (var i = 1; i < slices.length;i++)
    {
        yOffset += slices[i-1][1];
        var sr = slices[i][0];
        var sh = slices[i][1];
        var v = yOffset, h = radius-sr;
        if (northSouth == "north") {
            // northern hemisphere
            this.up(v).fwd(h).right(h)
            .cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1]})
            .left(h).back(h).down(v);
        }else{
            // southern hemisphere
            v = radius - (yOffset+sh+1);
            this.up(v).fwd(h).right(h)
                .cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1]})
                .left(h).back(h). down(v);
        }
    }
    return this.move('hsphere');
    
});
/************************************************************************
### Drone.hemisphere0() method

Creates a hollow hemisphere. Hemispheres can be either north or south.

#### Parameters

 * block - the block the hemisphere will be made of.
 * radius - the radius of the hemisphere
 * northSouth - whether the hemisphere is 'north' or 'south'

#### Example

To create a glass 'north' hemisphere with a radius of 20 blocks...

    hemisphere0(blocks.glass, 20, 'north');

![hemisphere example](img/hemisphereex2.png)

***/
Drone.extend('hemisphere0', function(block,radius,northSouth){
    return this.hemisphere(block,radius,northSouth)
        .fwd().right().up(northSouth=="north"?0:1)
        .hemisphere(0,radius-1,northSouth)
        .back().left().down(northSouth=="north"?0:1);
});
