'use strict';
/*global module*/
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
function sphere( block, radius ) {
  var lastRadius = radius,
    slices = [ [ radius , 0 ] ],
    bm = this.getBlockIdAndMeta( block ),
    r2 = radius * radius,
    i = 0,
    newRadius,
    yOffset,
    sr,
    sh,
    v,
    h;

  if ( radius > 127 ) { 
    throw new Error('Sphere radius must be less than 128 blocks');
  }
  for ( i = 0; i <= radius; i++ ) {
    newRadius = Math.round( Math.sqrt( r2 - i * i ) );
    if ( newRadius == lastRadius ) {
      slices[ slices.length - 1 ][ 1 ]++;
    } else {
      slices.push( [ newRadius , 1 ] );
    }
    lastRadius = newRadius;
  }
  this.chkpt( 'sphere' );
  //
  // mid section
  //
  this.up( radius - slices[0][1] )
    .cylinder( block, radius, ( slices[0][1]*2 ) - 1, { blockType: bm[0], meta: bm[1] } )
    .down( radius - slices[0][1] );
  
  yOffset = -1;
  for ( i = 1; i < slices.length; i++ ) {
    yOffset += slices[i-1][1];
    sr = slices[i][0];
    sh = slices[i][1];
    v = radius + yOffset;
    h = radius - sr;
    // northern hemisphere
    this.up( v )
      .fwd( h )
      .right( h )
      .cylinder( block, sr, sh, { blockType: bm[0], meta: bm[1] } )
      .left( h )
      .back( h )
      .down( v );
    
    // southern hemisphere
    v = radius - ( yOffset + sh + 1 );
    this.up( v )
      .fwd( h )
      .right( h )
      .cylinder( block, sr, sh, { blockType: bm[0], meta: bm[1]} )
      .left( h )
      .back( h )
      .down( v );
  }
  return this.move( 'sphere' );
}
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
function sphere0(block,radius)
{
  var lastRadius = radius,
    slices = [ [ radius, 0 ] ],
    bm = this.getBlockIdAndMeta( block ),
    r2 = radius*radius,
    i,
    newRadius,
    sr,
    sh,
    v,
    h,
    len,
    yOffset;

  if ( radius > 127 ) { 
    throw new Error('Sphere radius must be less than 128 blocks');
  }

  for ( i = 0; i <= radius; i++ ) {
    newRadius = Math.round( Math.sqrt( r2 - i * i ) );
    if ( newRadius == lastRadius ) {
      slices[ slices.length - 1 ][ 1 ]++;
    } else {
      slices.push( [ newRadius, 1 ] );
    }
    lastRadius = newRadius;
  }
  this.chkpt( 'sphere0' );
  //
  // mid section
  //
  this.up( radius - slices[0][1] )
    .arc({ blockType: bm[0], 
      meta: bm[1], 
      radius: radius, 
      strokeWidth: 2,
      stack: (slices[0][1]*2)-1,
      fill: false
    })
    .down( radius - slices[0][1] );
  
  yOffset = -1;
  len = slices.length;
  for ( i = 1; i < len; i++ ) {
    yOffset += slices[i-1][1];
    sr = slices[i][0];
    sh = slices[i][1];
    v = radius + yOffset;
    h = radius-sr;
    // northern hemisphere
    // .cylinder(block,sr,sh,{blockType: bm[0],meta: bm[1]})
    this.up( v ).fwd( h ).right( h )
      .arc({
        blockType: bm[0],
        meta: bm[1],
        radius: sr,
        stack: sh,
        fill: false,
        strokeWidth: i < len - 1 ? 1 + ( sr - slices[ i + 1 ][ 0 ] ) : 1
      })
      .left( h ).back( h ).down( v );
    
    // southern hemisphere
    v = radius - ( yOffset + sh + 1 );
    this.up( v ).fwd( h ).right( h )
      .arc({
        blockType: bm[0],
        meta: bm[1],
        radius: sr,
        stack: sh,
        fill: false,
        strokeWidth: i < len - 1 ? 1 + ( sr - slices[ i + 1 ][ 0 ] ) : 1
      })
      .left( h ).back( h ). down( v );
  }
  this.move( 'sphere0' );

  return this;

}
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
function hemisphere( block, radius, northSouth ) {
  var lastRadius = radius,
    slices = [ [ radius, 0 ] ],
    bm = this.getBlockIdAndMeta(block),
    r2 = radius * radius,
    i = 0,
    newRadius;

  if ( radius > 255 ) { 
    throw new Error('Hemisphere radius must be less than 256 blocks');
  }

  for ( i = 0; i <= radius; i++ ) {
    newRadius = Math.round( Math.sqrt( r2 - i * i ) );
    if ( newRadius == lastRadius ) {
      slices[ slices.length - 1 ][ 1 ]++;
    } else {
      slices.push( [ newRadius, 1 ] );
    }
    lastRadius = newRadius;
  }
  this.chkpt( 'hsphere' );
  //
  // mid section
  //
  if ( northSouth == 'north' ) {
    this.cylinder( block, radius, slices[0][1], { blockType: bm[0], meta: bm[1] } );
  } else {
    this.up( radius - slices[0][1] )
      .cylinder( block, radius, slices[0][1], { blockType: bm[0], meta: bm[1] } )
      .down( radius - slices[0][1] );
  }
  
  var yOffset = -1;
  for ( i = 1; i < slices.length; i++ ) {
    yOffset += slices[i-1][1];
    var sr = slices[i][0];
    var sh = slices[i][1];
    var v = yOffset, h = radius-sr;
    if ( northSouth == 'north' ) {
      // northern hemisphere
      this.up( v ).fwd( h ).right( h )
        .cylinder( block, sr, sh, { blockType: bm[0], meta: bm[1] } )
        .left( h ).back( h ).down( v );
    } else {
      // southern hemisphere
      v = radius - ( yOffset + sh + 1 );
      this.up( v ).fwd( h ).right( h )
        .cylinder( block, sr, sh, { blockType: bm[0], meta: bm[1] } )
        .left( h ).back( h ).down( v );
    }
  }
  return this.move( 'hsphere' );
}
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
function hemisphere0( block, radius, northSouth ) {

  if ( radius > 255 ) { 
    throw new Error('Hemisphere radius must be less than 256 blocks');
  }

  var lastRadius = radius,
    slices = [ [ radius, 0 ] ],
    bm = this.getBlockIdAndMeta(block),
    r2 = radius * radius,
    i = 0,
    len,
    newRadius;

  if ( radius > 255 ) { 
    throw new Error('Hemisphere radius must be less than 256 blocks');
  }


  for ( i = 0; i <= radius; i++ ) {
    newRadius = Math.round( Math.sqrt( r2 - i * i ) );
    if ( newRadius == lastRadius ) {
      slices[ slices.length - 1 ][ 1 ]++;
    } else {
      slices.push( [ newRadius, 1 ] );
    }
    lastRadius = newRadius;
  }
  this.chkpt( 'hsphere0' );
  //
  // mid section
  //
  if ( northSouth == 'north' ) {

    this.arc({ 
      blockType: bm[0], 
      meta: bm[1],
      radius: radius,
      strokeWidth: 1,
      stack: slices[0][1],
      fill: false
    });
  } else {
    this.up( radius - slices[0][1] );

    this.arc({
      blockType: bm[0],
      meta: bm[1],
      radius: radius,
      strokeWidth: 1,
      stack: slices[0][1],
      fill: false
    });

    this.down( radius - slices[0][1] );
  }
  
  var yOffset = -1;
  len = slices.length;
  for ( i = 1; i < slices.length; i++ ) {
    yOffset += slices[i-1][1];
    var sr = slices[i][0];
    var sh = slices[i][1];
    var v = yOffset, h = radius-sr;
    if ( northSouth == 'north' ) {
      // northern hemisphere
      this.up( v )
        .fwd( h )
        .right( h );

      this.arc( { 
        blockType: bm[0],
        meta: bm[1],
        radius: sr,
        stack: sh,
        fill: false,
        strokeWidth: i < len - 1 ? 1 + ( sr - slices[ i + 1 ][ 0 ] ) : 1
      } );

      this.left( h )
        .back( h )
        .down( v );
    } else {
      // southern hemisphere
      v = radius - ( yOffset + sh + 1 );
      this.up( v )
        .fwd( h )
        .right( h );

      this.arc({
        blockType: bm[0],
        meta: bm[1],
        radius: sr,
        stack: sh,
        fill: false,
        strokeWidth: i < len - 1 ? 1 + ( sr - slices[ i + 1 ][ 0 ] ) : 1
      });

      this.left( h )
        .back( h )
        .down( v );
    }
  }
  return this.move( 'hsphere0' );

}
module.exports = function(Drone){
  Drone.extend( sphere );
  Drone.extend( sphere0 );
  Drone.extend( hemisphere );
  Drone.extend( hemisphere0 );
};
