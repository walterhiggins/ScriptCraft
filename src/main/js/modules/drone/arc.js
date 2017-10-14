/*global require*/
'use strict';
/************************************************************************
### Drone.arc() method

The arc() method can be used to create 1 or more 90 degree arcs in the
horizontal or vertical planes. This method is called by cylinder() and
cylinder0() and the sphere() and sphere0() methods.

#### Parameters

arc() takes a single parameter - an object with the following named properties...

 * radius - The radius of the arc.
 * blockType - The type of block to use - this is the block Id only (no meta). See [Data Values][dv].
 * meta - The metadata value. See [Data Values][dv].
 * orientation (default: 'horizontal' ) - the orientation of the arc - can be 'vertical' or 'horizontal'.
 * stack (default: 1 ) - the height or length of the arc (depending on the orientation - if orientation is horizontal then this parameter refers to the height, if vertical then it refers to the length ).
 * strokeWidth (default: 1 ) - the width of the stroke (how many blocks) - if drawing nested arcs it's usually a good idea to set strokeWidth to at least 2 so that there are no gaps between each arc. The arc method uses a [bresenham algorithm][bres] to plot points along the circumference.
 * fill - If true (or present) then the arc will be filled in.
 * quadrants (default: `{topleft:true,topright:true,bottomleft:true,bottomright:true}` - An object with 4 properties indicating which of the 4 quadrants of a circle to draw. If the quadrants property is absent then all 4 quadrants are drawn.

#### Examples

To draw a 1/4 circle (top right quadrant only) with a radius of 10 and
stroke width of 2 blocks ...

    arc({blockType: blocks.iron, 
         meta: 0, 
         radius: 10,
         strokeWidth: 2,
         quadrants: { topright: true },
         orientation: 'vertical', 
         stack: 1,
         fill: false
         } );

![arc example 1](img/arcex1.png)

[bres]: http://en.wikipedia.org/wiki/Midpoint_circle_algorithm
[dv]: http://www.minecraftwiki.net/wiki/Data_values

***/
/*
 do the bresenham thing
 */
function bresenham( x0,y0,radius, setPixel, quadrants ) { 
  //
  // credit: Following code is copied almost verbatim from
  // http://en.wikipedia.org/wiki/Midpoint_circle_algorithm
  // Bresenham's circle algorithm
  //
  var f = 1 - radius;
  var ddF_x = 1;
  var ddF_y = -2 * radius;
  var x = 0;
  var y = radius;
  var defaultQuadrants = {topleft: true, topright: true, bottomleft: true, bottomright: true};
  quadrants = quadrants?quadrants:defaultQuadrants;
  /*
   II  | I
   ------------
   III | IV
   */
  if ( quadrants.topleft || quadrants.topright )
    setPixel(x0, y0 + radius ); // quadrant I/II topmost
  if ( quadrants.bottomleft || quadrants.bottomright )
    setPixel(x0, y0 - radius ); // quadrant III/IV bottommost
  if ( quadrants.topright || quadrants.bottomright )
    setPixel(x0 + radius, y0 ); // quadrant I/IV rightmost
  if ( quadrants.topleft || quadrants.bottomleft )
    setPixel(x0 - radius, y0 ); // quadrant II/III leftmost
  
  while ( x < y ) {
    if(f >= 0 ) {
      y--;
      ddF_y += 2;
      f += ddF_y;
    }
    x++;
    ddF_x += 2;
    f += ddF_x;    
    if ( quadrants.topright ) { 
      setPixel(x0 + x, y0 + y ); // quadrant I
      setPixel(x0 + y, y0 + x ); // quadrant I
    }
    if ( quadrants.topleft ) { 
      setPixel(x0 - x, y0 + y ); // quadrant II
      setPixel(x0 - y, y0 + x ); // quadrant II
    }
    if ( quadrants.bottomleft ) { 
      setPixel(x0 - x, y0 - y ); // quadrant III
      setPixel(x0 - y, y0 - x ); // quadrant III
    }
    if ( quadrants.bottomright ) { 
      setPixel(x0 + x, y0 - y ); // quadrant IV
      setPixel(x0 + y, y0 - x ); // quadrant IV
    }
  }
}

function getStrokeDir( x,y ) { 
  var absY = Math.abs(y );
  var absX = Math.abs(x );
  var strokeDir = 0;
  if ( y > 0 && absY >= absX )
    strokeDir = 0 ; //down
  else if ( y < 0 && absY >= absX )
    strokeDir = 1 ; // up
  else if ( x > 0 && absX >= absY )
    strokeDir = 2 ; // left
  else if ( x < 0 && absX >= absY )
    strokeDir = 3 ; // right
  return strokeDir;
}

/*
 The daddy of all arc-related API calls - 
 if you're drawing anything that bends it ends up here.
 */
function arcImpl( params ) {
  var drone = params.drone;
  var orientation = params.orientation?params.orientation:'horizontal';
  var quadrants = params.quadrants?params.quadrants:{
    topright:1,
    topleft:2,
    bottomleft:3,
    bottomright:4
  };
  var stack = params.stack?params.stack:1;
  var radius = params.radius;
  var strokeWidth = params.strokeWidth?params.strokeWidth:1;
  drone.chkpt('arc2' );
  var x0, y0, gotoxy,setPixel;
  
  if ( orientation == 'horizontal' ) { 
    gotoxy = function( x,y ) {  return drone.right(x ).fwd(y );};
    drone.right(radius ).fwd(radius ).chkpt('center' );
    switch ( drone.dir ) {
    case 0: // east
    case 2: // west
      x0 = drone.z;
      y0 = drone.x;
      break;
    case 1: // south
    case 3: // north
      x0 = drone.x;
      y0 = drone.z;
    }
    setPixel = function( x, y ) {
      x = ( x-x0 );
      y = ( y-y0 );
      if ( params.fill ) { 
        // wph 20130114 more efficient esp. for large cylinders/spheres
        if ( y < 0 ) { 
          drone
            .fwd( y ).right( x )
            .cuboidX( params.blockType, params.meta, 1, stack, Math.abs( y * 2 ) + 1 )
            .back( y ).left( x );
        }
      }else{
        if ( strokeWidth == 1 ) { 
          gotoxy(x,y )
            .cuboidX( params.blockType, params.meta,
              1, // width
              stack, // height
              strokeWidth // depth
            )
            .move('center' );
        } else {
          var strokeDir = getStrokeDir( x, y );
          var width = 1, depth = 1;
          switch ( strokeDir ) {
          case 0: // down
            y = y-( strokeWidth - 1 );
            depth = strokeWidth;
            break;
          case 1: // up
            depth = strokeWidth;
            break;
          case 2: // left
            width = strokeWidth;
            x = x-(strokeWidth-1 );
            break;
          case 3: // right
            width = strokeWidth;
            break;
          }
          gotoxy( x, y )
            .cuboidX( params.blockType, params.meta, width, stack, depth )
            .move( 'center' );

        }
      }
    };
  }else{
    // vertical
    gotoxy = function( x,y ) {  return drone.right(x ).up(y );};
    drone.right(radius ).up(radius ).chkpt('center' ); 
    switch ( drone.dir ) {
    case 0: // east
    case 2: // west
      x0 = drone.z;
      y0 = drone.y;
      break;
    case 1: // south
    case 3: // north
      x0 = drone.x;
      y0 = drone.y;
    }
    setPixel = function( x, y ) {
      x = ( x - x0 );
      y = ( y - y0 );
      if ( params.fill ) { 
        // wph 20130114 more efficient esp. for large cylinders/spheres
        if ( y < 0 ) { 
          drone
            .up( y ).right( x )
            .cuboidX( params.blockType, params.meta, 1, Math.abs( y * 2 ) + 1, stack )
            .down( y ).left( x );
        }
      }else{
        if ( strokeWidth == 1 ) { 
          gotoxy( x, y )
            .cuboidX( params.blockType, params.meta, strokeWidth, 1, stack )
            .move( 'center' );
        }else{
          var strokeDir = getStrokeDir( x,y );
          var width = 1, height = 1;
          switch ( strokeDir ) {
          case 0: // down
            y = y - ( strokeWidth - 1 );
            height = strokeWidth;
            break;
          case 1: // up
            height = strokeWidth;
            break;
          case 2: // left
            width = strokeWidth;
            x = x - ( strokeWidth - 1 );
            break;
          case 3: // right
            width = strokeWidth;
            break;
          }
          gotoxy(x,y )
            .cuboidX(params.blockType, params.meta, width, height, stack )
            .move('center' );
          
        }
      }
    };
  }
  /*
   setPixel assumes a 2D plane - need to put a block along appropriate plane
   */
  bresenham(x0,y0,radius,setPixel,quadrants );
  
  params.drone.move('arc2' );
}

module.exports = function(Drone){
  Drone.extend(function arc( params ) {
    params.drone = this;
    arcImpl( params );
  });
};
