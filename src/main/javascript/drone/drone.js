var global = this;
load(__folder + "../core/_primitives.js",true);

/*********************************************************************
Drone Module
============
The Drone is a convenience class for building. It can be used for...

 1. Building
 2. Copying and Pasting

It uses a fluent interface which means all of the Drone's methods return `this` and can 
be chained together like so...

    var theDrone = new Drone();
    theDrone.up().left().box(blocks.oak).down().fwd(3).cylinder0(blocks.lava,8); 

TLDNR; (Just read this if you're impatient)
===========================================
At the in-game command prompt type...
     
    /js box(blocks.oak)  
    
... creates a single wooden block at the cross-hairs or player location
    
    /js box(5).right(2).box('35:15',4,9,1)
    
... creates a single wooden block and a 2001 black obelisk that is 4
wide x 9 tall x 1 long in size.  If you want to see what else
ScriptCraft's Drone can do, read on...

Constructing a Drone Object
===========================

Drones can be created in 3 ways...
    
 1. Calling any one of the methods listed below will return a Drone object. For example...
         
        var d = box(blocks.oak)

   ... creates a 1x1x1 wooden block at the cross-hairs or player's location and returns a Drone
   object. This might look odd (if you're familiar with Java's Object-dot-method syntax) but all 
   of the Drone class's methods are also global functions that return new Drone objects. 
   This is short-hand for creating drones and is useful for playing around with Drones at the in-game 
   command prompt. It's shorter than typing ...
    
        var d = new Drone().box(5) 
        
   ... All of the Drone's methods return `this` (self) so you can chain operations together like this...
        
        var d = box(5).up().box(5,3,1,3).down().fwd(2).box(5).turn().fwd(2).box(5).turn().fwd(2).box(5)
    
 2. Using the following form...

        d = new Drone()
    
    ...will create a new Drone. If the cross-hairs are pointing at a
    block at the time then, that block's location becomes the drone's
    starting point.  If the cross-hairs are _not_ pointing at a block,
    then the drone's starting location will be 2 blocks directly in
    front of the player.  TIP: Building always happens right and front
    of the drone's position...
    
    Plan View:

        ^
        |
        |
        D---->
      
    For convenience you can use a _corner stone_ to begin building.
    The corner stone should be located just above ground level.  If
    the cross-hair is point at or into ground level when you create a
    new Drone(), then building begins at that point. You can get
    around this by pointing at a 'corner stone' just above ground
    level or alternatively use the following statement...
    
        d = new Drone().up()
          
    ... which will move the drone up one block as soon as it's created.

    ![corner stone](img/cornerstone1.png)

 3. Or by using the following form...
    
        d = new Drone(x,y,z,direction)

    This will create a new Drone at the location you specified using
    x, y, z In minecraft, the X axis runs west to east and the Z axis runs
    north to south.  The direction parameter says what direction you want
    the drone to face: 0 = east, 1 = south, 2 = west, 3 = north.  If the
    direction parameter is omitted, the player's direction is used
    instead.

Parameters
----------
 * x (optional) : The x coordinate of the Drone
 * y (optional) : The y coordinate of the Drone
 * z (optional) : The z coordinate of the Drone
 * direction (optional) : The direction in which the Drone is
   facing. Possible values are 0 (east), 1 (south), 2 (west) or 3 (north)

***/
var Drone = function(/* number */ x, /* number */ y, /* number */ z, /* number */ direction){};
/************************************************************************
Drone.box() method
==================
the box() method is a convenience method for building things. (For the more performance-oriented method - see cuboid)

parameters
----------
 * b - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * w (optional - default 1) - the width of the structure 
 * h (optional - default 1) - the height of the structure 
 * d (optional - default 1) - the depth of the structure - NB this is
   not how deep underground the structure lies - this is how far
   away (depth of field) from the drone the structure will extend.

Example
-------
To create a black structure 4 blocks wide, 9 blocks tall and 1 block long...
    
    box(blocks.black, 4, 9, 1);

... or the following code does the same but creates a variable that can be used for further methods...

    var drone = new Drone();
    drone.box(blocks.black, 4, 9, 1);

![box example 1](img/boxex1.png)
    
Drone.box0() method
===================
Another convenience method - this one creates 4 walls with no floor or ceiling.

Parameters
----------
 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * width (optional - default 1) - the width of the structure 
 * height (optional - default 1) - the height of the structure 
 * length (optional - default 1) - the length of the structure - how far
   away (depth of field) from the drone the structure will extend.

Example
-------
To create a stone building with the insided hollowed out 7 wide by 3 tall by 6 long...

    box0( blocks.stone, 7, 3, 6);

![example box0](img/box0ex1.png)
   
Drone.boxa() method
===================
Construct a cuboid using an array of blocks.

Parameters
----------
 * blocks - An array of blocks - each block in the array will be placed in turn.
 * width
 * height
 * length

Example
-------
Construct a rainbow-colored road 100 blocks long...

    var rainbowColors = [blocks.wool.red, blocks.wool.orange, blocks.wool.yellow, blocks.wool.lime,
                   blocks.wool.lightblue, blocks.wool.blue, blocks.wool.purple];
    boxa(rainbowColors,5,1,98);

![boxa example](img/boxaex1.png)

***/
Drone.prototype.box = function(block,width,height,depth){};
Drone.prototype.box0 = function(block,width,height,length){};
Drone.prototype.boxa = function(/* [string] */ width, height, length){};

/************************************************************************
Drone Movement
==============
Drones can move freely in minecraft's 3-D world. You control the
Drone's movement using any of the following methods..

 * up()
 * down()
 * left()
 * right()
 * fwd()
 * back()
 * turn()

... Each of these methods takes a single optional parameter
`numBlocks` - the number of blocks to move in the given direction. If
no parameter is given, the default is 1.

to change direction use the `turn()` method which also takes a single
optional parameter (numTurns) - the number of 90 degree turns to make.
Turns are always clock-wise. If the drone is facing north, then
drone.turn() will make the turn face east. If the drone is facing east
then drone.turn(2) will make the drone turn twice so that it is facing
west.

***/
Drone.prototype.up = function(numBlocks){};
Drone.prototype.down = function(numBlocks){};
Drone.prototype.left = function(numBlocks){};
Drone.prototype.right = function(numBlocks){};
Drone.prototype.fwd = function(numBlocks){};
Drone.prototype.back = function(numBlocks){};
Drone.prototype.turn = function(numTurns){};

/************************************************************************
Drone Markers
=============
Markers are useful when your Drone has to do a lot of work. You can
set a check-point and return to the check-point using the move()
method.  If your drone is about to undertake a lot of work -
e.g. building a road, skyscraper or forest you should set a
check-point before doing so if you want your drone to return to its
current location.  

A 'start' checkpoint is automatically created when the Drone is first created.

Markers are created and returned to using the followng two methods...

 * chkpt - Saves the drone's current location so it can be returned to later.
 * move - moves the drone to a saved location.

Parameters
----------
 * name - the name of the checkpoint to save or return to.

Example
-------

    drone.chkpt('town-square');
    //
    // the drone can now go off on a long excursion
    //
    for (i = 0; i< 100; i++){ 
        drone.fwd(12).box(6); 
    }
    //
    // return to the point before the excursion
    //
    drone.move('town-square');

***/
Drone.prototype.chkpt = function(checkpoint_name){};
Drone.prototype.move = function(checkpoint_name){};

/************************************************************************
Drone.prism() method
====================
Creates a prism. This is useful for roofs on houses.

Parameters
----------

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * width - the width of the prism
 * length - the length of the prism (will be 2 time its height)

Example
-------

    prism(blocks.oak,3,12);

![prism example](img/prismex1.png)

Drone.prism0() method
=====================
A variation on `prism` which hollows out the inside of the prism. It uses the same parameters as `prism`.

***/
Drone.prototype.prism = function(block,width,depth){};
Drone.prototype.prism0 = function(block,width,depth){};
/************************************************************************
Drone.cylinder() method
=======================
A convenience method for building cylinders. Building begins radius blocks to the right and forward.

Parameters
----------

 * block - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
   Alternatively you can use any one of the `blocks` values e.g. `blocks.sapling.birch`
 * radius 
 * height

Example
-------

    cylinder(blocks.iron, 7 , 1);

![cylinder example](img/cylinderex1.png)

Drone.cylinder0() method
========================
A version of cylinder that hollows out the middle.

Example
-------

    cylinder0(blocks.iron, 7, 1);

![cylinder0 example](img/cylinder0ex1.png)

***/
Drone.prototype.cylinder = function(block,radius,height){};
Drone.prototype.cylinder0 = function(block,radius,height){};
/************************************************************************
Drone.arc() method
==================
The arc() method can be used to create 1 or more 90 degree arcs in the horizontal or vertical planes.
This method is called by cylinder() and cylinder0() and the sphere() and sphere0() methods.

Parameters
----------
arc() takes a single parameter - an object with the following named properties...

 * radius - The radius of the arc.
 * blockType - The type of block to use - this is the block Id only (no meta). See [Data Values][dv].
 * meta - The metadata value. See [Data Values][dv].
 * orientation (default: 'horizontal') - the orientation of the arc - can be 'vertical' or 'horizontal'.
 * stack (default: 1) - the height or length of the arc (depending on
   the orientation - if orientation is horizontal then this parameter
   refers to the height, if vertical then it refers to the length).
 * strokeWidth (default: 1) - the width of the stroke (how many
   blocks) - if drawing nested arcs it's usually a good idea to set
   strokeWidth to at least 2 so that there are no gaps between each
   arc. The arc method uses a [bresenham algorithm][bres] to plot
   points along the circumference.
 * fill - If true (or present) then the arc will be filled in.
 * quadrants (default:
   `{topleft:true,topright:true,bottomleft:true,bottomright:true}` - An
   object with 4 properties indicating which of the 4 quadrants of a
   circle to draw. If the quadrants property is absent then all 4
   quadrants are drawn.

Examples
--------
To draw a 1/4 circle (top right quadrant only) with a radius of 10 and stroke width of 2 blocks ...

    arc({blockType: blocks.iron, 
         meta: 0, 
         radius: 10,
         strokeWidth: 2
         quadrants: { topright: true },
         orientation: 'vertical', 
         stack: 1,
         fill: false
         });

![arc example 1](img/arcex1.png)

[bres]: http://en.wikipedia.org/wiki/Midpoint_circle_algorithm
[dv]: http://www.minecraftwiki.net/wiki/Data_values
***/
Drone.prototype.arc = function(params) {};

/************************************************************************
Drone.door() method
===================
create a door - if a parameter is supplied an Iron door is created otherwise a wooden door is created.

Parameters
----------
 * doorType (optional - default wood) - If a parameter is provided then the door is Iron.

Example
-------
To create a wooden door at the crosshairs/drone's location...

    var drone = new Drone();
    drone.door();

To create an iron door...

    drone.door( blocks.door_iron );

![iron door](img/doorex1.png)
    
Drone.door2() method
====================
Create double doors (left and right side)

Parameters
----------
 * doorType (optional - default wood) - If a parameter is provided then the door is Iron.

Example
-------
To create double-doors at the cross-hairs/drone's location...

    drone.door2();

![double doors](img/door2ex1.png)

***/    
Drone.prototype.door = function(b){};
Drone.prototype.door2 = function(b){};
/************************************************************************
Drone.sign() method
===================
Signs must use block 63 (stand-alone signs) or 68 (signs on walls)

Parameters
----------
 * message -  can be a string or an array of strings. 
 * block - can be 63 or 68

Example
-------
To create a free-standing sign...

    drone.sign(["Hello","World"],63);

![ground sign](img/signex1.png)

... to create a wall mounted sign...

    drone.sign(["Welcome","to","Scriptopia"], 68);

![wall sign](img/signex2.png)

***/
Drone.prototype.sign = function(s,b){};
/************************************************************************
Drone Trees methods
===================

 * oak()
 * spruce()
 * birch()
 * jungle()

Example
-------
To create 4 trees in a row, point the cross-hairs at the ground then type `/js ` and ...

    up().oak().right(8).spruce().right(8).birch().right(8).jungle();

Trees won't always generate unless the conditions are right. You
should use the tree methods when the drone is directly above the
ground. Trees will usually grow if the drone's current location is
occupied by Air and is directly above an area of grass (That is why
the `up()` method is called first).

![tree example](img/treeex1.png)

    
None of the tree methods require parameters. Tree methods will only be successful
if the tree is placed on grass in a setting where trees can grow.
***/
Drone.prototype.oak= function(){};
Drone.prototype.spruce = function(){};
Drone.prototype.birch = function(){};
Drone.prototype.jungle = function(){};
/************************************************************************
Drone.garden() method
=====================
places random flowers and long grass (similar to the effect of placing bonemeal on grass)

Parameters
----------

 * width - the width of the garden
 * length - how far from the drone the garden extends

Example
-------
To create a garden 10 blocks wide by 5 blocks long...

    garden(10,5);

![garden example](img/gardenex1.png)

***/
Drone.prototype.garden = function(w,d){};
/************************************************************************
Drone.rand() method
===================
rand takes either an array (if each blockid has the same chance of occurring)
or an object where each property is a blockid and the value is it's weight (an integer)

Example
-------
place random blocks stone, mossy stone and cracked stone (each block has the same chance of being picked)

    rand( [blocks.brick.stone, blocks.brick.mossy, blocks.brick.cracked ],w,d,h) 

to place random blocks stone has a 50% chance of being picked, 

    rand({blocks.brick.stone: 5, blocks.brick.mossy: 3, blocks.brick.cracked: 2},w,d,h) 

regular stone has a 50% chance, mossy stone has a 30% chance and cracked stone has just a 20% chance of being picked.

***/
Drone.prototype.rand = function(distribution,w,h,d){};
/************************************************************************
Copy & Paste using Drone
========================
A drone can be used to copy and paste areas of the game world.

Drone.copy() method
===================
Copies an area so it can be pasted elsewhere. The name can be used for
pasting the copied area elsewhere...

Parameters
----------

 * name - the name to be given to the copied area (used by `paste`)
 * width - the width of the area to copy
 * height - the height of the area to copy
 * length - the length of the area (extending away from the drone) to copy

Example
-------

    drone.copy('somethingCool',10,5,10).right(12).paste('somethingCool');

Drone.paste() method
====================
Pastes a copied area to the current location.

Example
-------
To copy a 10x5x10 area (using the drone's coordinates as the starting
point) into memory.  the copied area can be referenced using the name
'somethingCool'. The drone moves 12 blocks right then pastes the copy.

    drone.copy('somethingCool',10,5,10)
         .right(12)
         .paste('somethingCool');

***/
Drone.prototype.copy = function(name,w,h,d){};
Drone.prototype.paste = function(name){};
/************************************************************************
Chaining
========

All of the Drone methods return a Drone object, which means methods
can be 'chained' together so instead of writing this...

    drone = new Drone(); 
    drone.fwd(3);
    drone.left(2);
    drone.box(2); // create a grass block
    drone.up();
    drone.box(2); // create another grass block
    drone.down();

...you could simply write ...
    
    var drone = new Drone().fwd(3).left(2).box(2).up().box(2).down();

... since each Drone method is also a global function that constructs
a drone if none is supplied, you can shorten even further to just...
    
    fwd(3).left(2).box(2).up().box(2).down()

The Drone object uses a [Fluent Interface][fl] to make ScriptCraft
scripts more concise and easier to write and read.  Minecraft's
in-game command prompt is limited to about 80 characters so chaining
drone commands together means more can be done before hitting the
command prompt limit. For complex building you should save your
commands in a new script file and load it using /js load()

[fl]: http://en.wikipedia.org/wiki/Fluent_interface

Drone Properties
================

 * x - The Drone's position along the west-east axis (x increases as you move east)
 * y - The Drone's position along the vertical axis (y increses as you move up)
 * z - The Drone's position along the north-south axis (z increases as you move south)
 * dir - The Drone's direction 0 is east, 1 is south , 2 is west and 3 is north.

Extending Drone
===============
The Drone object can be easily extended - new buidling recipes/blue-prints can be added and can
become part of a Drone's chain using the *static* method `Drone.extend`. 

Drone.extend() static method
============================
Use this method to add new methods (which also become chainable global functions) to the Drone object.

Parameters
----------
 * name - The name of the new method e.g. 'pyramid'
 * function - The method body.

Example
-------

    // submitted by [edonaldson][edonaldson]
    Drone.extend('pyramid', function(block,height){
        this.chkpt('pyramid');
        for (var i = height; i > 0; i -= 2) {
            this.box(block, i, 1, i).up().right().fwd();
        }
        return this.move('pyramid');      
    });

Once the method is defined (it can be defined in a new pyramid.js file) it can be used like so...

    var d = new Drone();
    d.pyramid(blocks.brick.stone, 12);

... or simply ...

    pyramid(blocks.brick.stone, 12);

[edonaldson]: https://github.com/edonaldson

Drone Constants
===============

Drone.PLAYER_STAIRS_FACING
--------------------------
An array which can be used when constructing stairs facing in the Drone's direction...

    var d = new Drone();
    d.box(blocks.stairs.oak + ':' + Drone.PLAYER_STAIRS_FACING[d.dir]);

... will construct a single oak stair block facing the drone.

Drone.PLAYER_SIGN_FACING
------------------------
An array which can be used when placing signs so they face in a given direction.
This is used internally by the Drone.sign() method.

Drone.PLAYER_TORCH_FACING
-------------------------
Used when placing torches so that they face the same way as the drone. 

***/

//
// Implementation
// ==============
// 
// There is no need to read any further unless you want to understand how the Drone object works.
//
(function(){
    Drone = function(x,y,z,dir)
    {
        var usePlayerCoords = false;
        var playerPos = getPlayerPos();
        if (typeof x == "undefined"){
            var mp = getMousePos();
            if (mp){
                this.x = mp.x;
                this.y = mp.y;
                this.z = mp.z;
                this.world = mp.world;
            }else{
                // base it on the player's current location
                usePlayerCoords = true;
                //
                // it's possible that drone.js could be loaded by a non-playing op 
                // (from the server console)
                //
                if (!playerPos){
                    return null;
                }
                this.x = playerPos.x;
                this.y = playerPos.y;
                this.z = playerPos.z;
                this.world = playerPos.world;
            }
        }else{
            this.x = x;
            this.y = y;
            this.z = z;
            this.world = _getWorld();
        }
        if (typeof dir == "undefined"){
            this.dir = _getDirFromRotation(playerPos.yaw);
        }else{
            this.dir = dir%4;
        }
        // for debugging
        //self.sendMessage("New Drone " + this.toString());
        if (usePlayerCoords){
            this.fwd(3);
        }
        this.chkpt('start');
    };
    Drone.prototype.chkpt = function(name){
        this._checkpoints[name] = {x:this.x,y:this.y,z:this.z,dir:this.dir};
        return this;
    };
    Drone.prototype.move = function(name){
        var coords = this._checkpoints[name];
        if (coords){
            this.x = coords.x;
            this.y = coords.y;
            this.z = coords.z;
            this.dir = coords.dir%4;
        }
        return this;
    };
    Drone.prototype._checkpoints = {};

    Drone.prototype.turn = function(n){
        if (typeof n == "undefined")
            n = 1;
        this.dir += n;
        this.dir %=4;
        return this;
    };
    Drone.prototype.right = function(n){ 
        if (typeof n == "undefined")
            n = 1;
        return _movements[this.dir].right(this,n); 
    };
    Drone.prototype.left = function(n){ 
        if (typeof n == "undefined")
            n = 1;
        return _movements[this.dir].left(this,n);
    };
    Drone.prototype.fwd = function(n){ 
        if (typeof n == "undefined")
            n = 1;
        return _movements[this.dir].fwd(this,n);
    };
    Drone.prototype.back = function(n){ 
        if (typeof n == "undefined")
            n = 1;
        return _movements[this.dir].back(this,n);
    };
    Drone.prototype.up = function(n){ 
        if (typeof n == "undefined")
            n = 1;
        this.y+= n; 
        return this;
    };
    Drone.prototype.down = function(n){ 
        if (typeof n == "undefined")
            n = 1;
        this.y-= n; 
        return this;
    };
    //
    // building
    //
    Drone.prototype.sign = function(message,block){
        if (message.constructor == Array){
        }else{
            message = [message];
        }
        var bm = _getBlockIdAndMeta(block);
        block = bm[0];
        var meta = bm[1];
        if (block != 63 && block != 68){
            print("ERROR: Invalid block id for use in signs");
            return;
        }
        if (block == 68){
            meta = Drone.PLAYER_SIGN_FACING[this.dir%4];
            this.back();
        }
        if (block == 63){
            meta = (12 + ((this.dir+2)*4)) % 16;
        }
        putSign(message,this.x,this.y,this.z,block,meta);
        if (block == 68){
            this.fwd();
        }
        return this;
    };
    Drone.prototype.cuboida = function(/* Array */ blocks,w,h,d){
        var properBlocks = [];
        var len = blocks.length;
        for (var i = 0;i < len;i++){
            var bm = _getBlockIdAndMeta(blocks[i]);
            properBlocks.push([bm[0],bm[1]]);
        }
        if (typeof h == "undefined")
            h = 1;
        if (typeof d == "undefined")
            d = 1;
        if (typeof w == "undefined")
            w = 1;
        var that = this;
        var dir = this.dir;
        var pl = org.bukkit.entity.Player;
        var cs = org.bukkit.command.BlockCommandSender;
        var bi = 0;
        var depthFunc = function(){
            var block = that.world.getBlockAt(that.x,that.y,that.z);
            var properBlock = properBlocks[bi%len];
            block.setTypeIdAndData(properBlock[0],properBlock[1],false);
            bi++;
        };
        var heightFunc = function(){
            _traverse[dir].depth(that,d,depthFunc);
        };
        var widthFunc = function(){
            _traverseHeight(that,h,heightFunc);
        };

        _traverse[dir].width(that,w,widthFunc);
        return this;
        
    };
    /*
      faster cuboid because blockid, meta and world must be provided 
      use this method when you need to repeatedly place blocks
     */
    Drone.prototype.cuboidX = function(blockType, meta, w, h, d){

        if (typeof h == "undefined")
            h = 1;
        if (typeof d == "undefined")
            d = 1;
        if (typeof w == "undefined")
            w = 1;
        var that = this;
        var dir = this.dir;

        var depthFunc = function(){
            var block = that.world.getBlockAt(that.x,that.y,that.z);
            block.setTypeIdAndData(blockType,meta,false);
        };
        var heightFunc = function(){
            _traverse[dir].depth(that,d,depthFunc);
        };
        var widthFunc = function(){
            _traverseHeight(that,h,heightFunc);
        };

        _traverse[dir].width(that,w,widthFunc);
        return this;
        
    };
    
    Drone.prototype.cuboid = function(block,w,h,d){

        var bm = _getBlockIdAndMeta(block);
        return this.cuboidX(bm[0],bm[1], w,h,d);
    };
    Drone.prototype.cuboid0 = function(block,w,h,d){
        this.chkpt('start_point');
        
        // Front wall
        this.cuboid(block, w, h, 1);
        // Left wall
        this.cuboid(block, 1, h, d);
        // Right wall
        this.right(w-1).cuboid(block, 1, h, d).left(w-1);
        // Back wall
        this.fwd(d-1).cuboid(block, w, h, 1);
        
        return this.move('start_point');
    };
    Drone.prototype.door = function(door){
        if (typeof door == "undefined"){
            door = 64;
        }else{
            door = 71;
        }
        return this.cuboid(door+':' + this.dir).up().cuboid(door+':8').down();
    };
    Drone.prototype.door2 = function(door){
        if (typeof door == "undefined"){
            door = 64;
        }else{
            door = 71;
        }
        return this
            .box(door+':' + this.dir).up()
            .box(door+':8').right()
            .box(door+':9').down()
            .box(door+':' + this.dir).left();
    };
    // player dirs: 0 = east, 1 = south, 2 = west,   3 = north
    // block dirs:  0 = east, 1 = west,  2 = south , 3 = north
    // sign dirs:   5 = east, 3 = south, 4 = west, 2 = north
    Drone.PLAYER_STAIRS_FACING = [0,2,1,3];
    // for blocks 68 (wall signs) 65 (ladders) 61,62 (furnaces) 23 (dispenser) and 54 (chest)
    Drone.PLAYER_SIGN_FACING = [4,2,5,3]; 
    Drone.PLAYER_TORCH_FACING = [2,4,1,3];
    //
    // add custom methods to the Drone object using this function
    //
    Drone.extend = function(name, func)
    {
        Drone.prototype[name] = func;
        global[name] = function(){
            var result = new Drone();
            result[name].apply(result,arguments);
            return result;
        };
    };

    var _getWorld = function(){
        var pl = org.bukkit.entity.Player;
        var cs = org.bukkit.command.BlockCommandSender;
        var world = (self instanceof pl)?self.location.world:(self instanceof cs)?self.block.location.world:null;
        return world;
    };
    
    var _STAIRBLOCKS = {53: '5:0'     // oak wood
                         ,67: 4    // cobblestone
                         ,108: 45  // brick
                         ,109: 98  // stone brick
                         ,114: 112 // nether brick
                         ,128: 24  // sandstone
                         ,134: '5:1'    // spruce wood
                         ,135: '5:2'    // birch wood
                         ,136: '5:3'    // jungle wood
                        };
    //
    // prism private implementation
    //
    var _prism = function(block,w,d)
    {
        var stairEquiv = _STAIRBLOCKS[block];
        if (stairEquiv){
            this.fwd().prism(stairEquiv,w,d-2).back();
            var d2 = 0;
            var middle = Math.floor(d/2);
            var uc = 0,dc = 0;
            while (d2 < d)
            {
                var di = (d2 < middle?this.dir:(this.dir+2)%4);
                var bd = block + ':' + Drone.PLAYER_STAIRS_FACING[di];
                var putStep = true;
                if (d2 == middle){
                    if (d % 2 == 1){
                        putStep = false;
                    }
                }
                if (putStep)
                    this.cuboid(bd,w);
                if (d2 < middle-1){
                    this.up();
                    uc++;
                }
                var modulo = d % 2;
                if (modulo == 1){
                    if (d2 > middle && d2<d-1){
                        this.down();
                        dc++;
                    }
                }else{
                    if (d2 >= middle && d2<d-1){
                        this.down();
                        dc++;
                    }
                }
                this.fwd();
                d2++;
            }
            this.back(d);
        }else{
            var c = 0;
            var d2 = d;
            while(d2 >= 1){
                this.cuboid(block,w,1,d2);
                d2 -= 2;
                this.fwd().up();
                c++;
            }
            this.down(c).back(c);
        }
        return this;
    };
    //
    // prism0 private implementation
    //
    var _prism0 = function(block,w,d){
        this.prism(block,w,d)
            .fwd().right()
            .prism(0,w-2,d-2)
            .left().back();
        var se = _STAIRBLOCKS[block];
        if (d % 2 == 1 && se){
            // top of roof will be open - need repair
            var f = Math.floor(d/2);
            this.fwd(f).up(f).cuboid(se,w).down(f).back(f);
        }
    };
    Drone.prototype.prism0 = _prism0;
    Drone.prototype.prism = _prism;
    Drone.prototype.box = Drone.prototype.cuboid;
    Drone.prototype.box0 = Drone.prototype.cuboid0;
    Drone.prototype.boxa = Drone.prototype.cuboida;
    //
    // show the Drone's position and direction 
    //
    Drone.prototype.toString = function(){
        var dirs = ["east","south","west","north"];
        return "x: " + this.x + " y: "+this.y + " z: " + this.z + " dir: " + this.dir  + " "+dirs[this.dir];
    };
    Drone.prototype.debug = function(){
        print(this.toString());
        return this;
    };
    /*
      do the bresenham thing
     */
    var _bresenham = function(x0,y0,radius, setPixel, quadrants){
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
        quadrants = quadrants || {topleft: true, 
                                  topright: true,
                                  bottomleft: true,
                                  bottomright: true};
        /*
            II  | I
          ------------
            III | IV
         */
        if (quadrants.topleft || quadrants.topright)
            setPixel(x0, y0 + radius); // quadrant I/II topmost
        if (quadrants.bottomleft || quadrants.bottomright)
            setPixel(x0, y0 - radius); // quadrant III/IV bottommost
        if (quadrants.topright || quadrants.bottomright)
            setPixel(x0 + radius, y0); // quadrant I/IV rightmost
        if (quadrants.topleft || quadrants.bottomleft)
            setPixel(x0 - radius, y0); // quadrant II/III leftmost
        
        while(x < y)
        {
            // ddF_x == 2 * x + 1;
            // ddF_y == -2 * y;
            // f == x*x + y*y - radius*radius + 2*x - y + 1;
            if(f >= 0) 
            {
                y--;
                ddF_y += 2;
                f += ddF_y;
            }
            x++;
            ddF_x += 2;
            f += ddF_x;    
            if (quadrants.topright){
                setPixel(x0 + x, y0 + y); // quadrant I
                setPixel(x0 + y, y0 + x); // quadrant I
            }
            if (quadrants.topleft){
                setPixel(x0 - x, y0 + y); // quadrant II
                setPixel(x0 - y, y0 + x); // quadrant II
            }
            if (quadrants.bottomleft){
                setPixel(x0 - x, y0 - y); // quadrant III
                setPixel(x0 - y, y0 - x); // quadrant III
            }
            if (quadrants.bottomright){
                setPixel(x0 + x, y0 - y); // quadrant IV
                setPixel(x0 + y, y0 - x); // quadrant IV
            }
        }
    };
    var _getStrokeDir = function(x,y){
        var absY = Math.abs(y);
        var absX = Math.abs(x);
        var strokeDir = 0;
        if (y > 0 && absY >= absX)
            strokeDir = 0 ; //down
        else if (y < 0 && absY >= absX)
            strokeDir = 1 ; // up
        else if (x > 0 && absX >= absY)
            strokeDir = 2 ; // left
        else if (x < 0 && absX >= absY)
            strokeDir = 3 ; // right
        return strokeDir;
    };
    /*
      The daddy of all arc-related API calls - 
      if you're drawing anything that bends it ends up here.
    */
    var _arc2 = function( params ) {

        var drone = params.drone;
        var orientation = params.orientation || "horizontal";
        var quadrants = params.quadrants || {
            topright:1,
            topleft:2,
            bottomleft:3,
            bottomright:4
        };
        var stack = params.stack || 1;
        var radius = params.radius;
        var strokeWidth = params.strokeWidth || 1;
        drone.chkpt('arc2');
        var x0, y0, gotoxy,setPixel;
        
        if (orientation == "horizontal"){
            gotoxy = function(x,y){ return drone.right(x).fwd(y);};
            drone.right(radius).fwd(radius).chkpt('center');
            switch (drone.dir) {
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
            setPixel = function(x,y) {
                x = (x-x0);
                y = (y-y0);
                if (params.fill){
                    // wph 20130114 more efficient esp. for large cylinders/spheres
                    if (y < 0){
                        drone
                            .fwd(y).right(x)
                            .cuboidX(params.blockType,params.meta,1,stack,Math.abs(y*2)+1)
                            .back(y).left(x);
                    }
                }else{
                    if (strokeWidth == 1){
                        gotoxy(x,y)
                        .cuboidX(params.blockType,
                                 params.meta,
                                 1, // width
                                 stack, // height
                                 strokeWidth // depth
                                )
                        .move('center');
                    } else {
                        var strokeDir = _getStrokeDir(x,y);
                        var width = 1, depth = 1;
                        switch (strokeDir){
                        case 0: // down
                            y = y-(strokeWidth-1);
                            depth = strokeWidth;
                            break;
                        case 1: // up
                            depth = strokeWidth;
                            break;
                        case 2: // left
                            width = strokeWidth;
                            x = x-(strokeWidth-1);
                            break;
                        case 3: // right
                            width = strokeWidth;
                            break;
                        }
                        gotoxy(x,y)
                            .cuboidX(params.blockType, params.meta, width, stack, depth)
                            .move('center');

                    }
                }
            };
        }else{
            // vertical
            gotoxy = function(x,y){ return drone.right(x).up(y);};
            drone.right(radius).up(radius).chkpt('center'); 
            switch (drone.dir) {
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
            setPixel = function(x,y) {
                x = (x-x0);
                y = (y-y0);
                if (params.fill){
                    // wph 20130114 more efficient esp. for large cylinders/spheres
                    if (y < 0){
                        drone
                            .up(y).right(x)
                            .cuboidX(params.blockType,params.meta,1,Math.abs(y*2)+1,stack)
                            .down(y).left(x);
                    }
                }else{
                    if (strokeWidth == 1){
                        gotoxy(x,y)
                            .cuboidX(params.blockType,params.meta,strokeWidth,1,stack)
                            .move('center');
                    }else{
                        var strokeDir = _getStrokeDir(x,y);
                        var width = 1, height = 1;
                        switch (strokeDir){
                        case 0: // down
                            y = y-(strokeWidth-1);
                            height = strokeWidth;
                            break;
                        case 1: // up
                            height = strokeWidth;
                            break;
                        case 2: // left
                            width = strokeWidth;
                            x = x-(strokeWidth-1);
                            break;
                        case 3: // right
                            width = strokeWidth;
                            break;
                        }
                        gotoxy(x,y)
                            .cuboidX(params.blockType, params.meta, width, height, stack)
                            .move('center');
                        
                    }
                }
            };
        }
        /*
          setPixel assumes a 2D plane - need to put a block along appropriate plane
         */
        _bresenham(x0,y0,radius,setPixel,quadrants);
        
        params.drone.move('arc2');
    };


    Drone.prototype.arc = function(params) {
        params.drone = this;
        _arc2(params);
        return this;
    }
    // ========================================================================
    // Private variables and functions
    // ========================================================================
    var _cylinder0 = function(block,radius,height,exactParams){
        var arcParams = {
            radius: radius,
            fill: false,
            orientation: 'horizontal',
            stack: height,
        };

        if (exactParams){
            arcParams.blockType = exactParams.blockType;
            arcParams.meta = exactParams.meta;
        }else{
            var md = this._getBlockIdAndMeta(block);
            arcParams.blockType = md[0];
            arcParams.meta = md[1];
        }
        return this.arc(arcParams);
    };
    var _cylinder1 = function(block,radius,height,exactParams){
        var arcParams = {
            radius: radius,
            fill: true,
            orientation: 'horizontal',
            stack: height,
        };

        if (exactParams){
            arcParams.blockType = exactParams.blockType;
            arcParams.meta = exactParams.meta;
        }else{
            var md = this._getBlockIdAndMeta(block);
            arcParams.blockType = md[0];
            arcParams.meta = md[1];
        }
        return this.arc(arcParams);
    };
    var _getDirFromRotation = function(r){
        // 0 = east, 1 = south, 2 = west, 3 = north
        // 46 to 135 = west
        // 136 to 225 = north
        // 226 to 315 = east
        // 316 to 45 = south

        r = (r + 360) % 360; // east could be 270 or -90

        if (r > 45 && r <= 135)
            return 2; // west
        if (r > 135 && r <= 225)
            return 3; // north
        if (r > 225 && r <= 315)
            return 0; // east
        if (r > 315 || r < 45)
            return 1; // south
    };
    var _getBlockIdAndMeta = function(b){
        if (typeof b == 'string'){
            var bs = b;
            var sp = bs.indexOf(':');
            if (sp == -1){
                return [parseInt(bs),0];
            }
            b = parseInt(bs.substring(0,sp));
            var md = parseInt(bs.substring(sp+1,bs.length));
            return [b,md];
        }else{
            return [b,0];
        }
    };
    //
    // movement
    //
    var _movements = [{},{},{},{}];
    // east
    _movements[0].right = function(that,n){ that.z +=n; return that;};
    _movements[0].left = function(that,n){ that.z -=n; return that;};
    _movements[0].fwd = function(that,n){ that.x +=n; return that;};
    _movements[0].back = function(that,n){ that.x -= n; return that;};
    // south
    _movements[1].right = _movements[0].back;
    _movements[1].left = _movements[0].fwd;
    _movements[1].fwd = _movements[0].right;
    _movements[1].back = _movements[0].left;
    // west
    _movements[2].right = _movements[0].left;
    _movements[2].left = _movements[0].right;
    _movements[2].fwd = _movements[0].back;
    _movements[2].back = _movements[0].fwd;
    // north
    _movements[3].right = _movements[0].fwd;
    _movements[3].left = _movements[0].back;
    _movements[3].fwd = _movements[0].left;
    _movements[3].back = _movements[0].right;
    var _traverse = [{},{},{},{}];
    // east
    _traverse[0].width = function(that,n,callback){
        var s = that.z, e = s + n;
        for (; that.z < e; that.z++){
            callback(that.z-s);
        }
        that.z = s;
    };
    _traverse[0].depth = function(that,n,callback){
        var s = that.x, e = s+n;
        for (;that.x < e;that.x++){
            callback(that.x-s);
        }
        that.x = s;
    };
    // south
    _traverse[1].width = function(that,n,callback){
        var s = that.x, e = s-n;
        for (;that.x > e;that.x--){
            callback(s-that.x);
        }
        that.x = s;
    };
    _traverse[1].depth = _traverse[0].width;
    // west
    _traverse[2].width = function(that,n,callback){
        var s = that.z, e = s-n;
        for (;that.z > e;that.z--){
            callback(s-that.z);
        }
        that.z = s;
    };
    _traverse[2].depth = _traverse[1].width;
    // north
    _traverse[3].width = _traverse[0].depth;
    _traverse[3].depth = _traverse[2].width;
    var _traverseHeight = function(that,n,callback){
        var s = that.y, e = s + n;
        for (; that.y < e; that.y++){
            callback(that.y-s);
        }
        that.y = s;
    };
    //
    // standard fisher-yates shuffle algorithm
    //
    var _fisherYates = function( myArray ) {
        var i = myArray.length;
        if ( i == 0 ) return false;
        while ( --i ) {
            var j = Math.floor( Math.random() * ( i + 1 ) );
            var tempi = myArray[i];
            var tempj = myArray[j];
            myArray[i] = tempj;
            myArray[j] = tempi;
        }
    };
    
    var _rand = function(blockDistribution){
        if (!(blockDistribution.constructor == Array)){
            var a = [];
            for (var p in blockDistribution){
                var n = blockDistribution[p];
                for (var i = 0;i < n;i++){
                    a.push(p);
                }
            }
            blockDistribution = a;
        }
        while (blockDistribution.length < 1000){
            // make array bigger so that it's more random
            blockDistribution = blockDistribution.concat(blockDistribution);
        }
        _fisherYates(blockDistribution);
        return blockDistribution;
    };
    Drone.prototype.rand = function(dist,w,h,d){
        var randomized = _rand(dist);
        return this.boxa(randomized,w,h,d);
    };
    var _trees = {
        oak: org.bukkit.TreeType.BIG_TREE ,
        birch: org.bukkit.TreeType.BIRCH ,
        jungle: org.bukkit.TreeType.JUNGLE,
        spruce: org.bukkit.TreeType.REDWOOD 
    };
    for (var p in _trees)
    {
        Drone.prototype[p] = function(v){
            return function(){ 
                var treeLoc = new org.bukkit.Location(this.world,this.x,this.y,this.z);
                var successful = treeLoc.world.generateTree(treeLoc,v);
                println("generateTree(" + v + ") returned " + successful);
                return this;
            };
        }(_trees[p]);
    }

    Drone.prototype.garden = function(w,d)
    {
        // make sure grass is present first
        this.down().box(2,w,1,d).up(); 
        
        // make flowers more common than long grass
        var dist = {37: 3, // red flower
                    38: 3, // yellow flower
                    '31:1': 2, // long grass
                    0: 1
                   };
        
        return this.rand(dist,w,1,d);
    };
    //
    // Drone's clipboard 
    //
    Drone.clipBoard = {};
    Drone.prototype.copy = function(name, w, h, d)
    {
        var that = this;
        var ccContent = [];
        _traverse[this.dir].width(that,w,function(ww){
            ccContent.push([]);
            _traverseHeight(that,h,function(hh){
                ccContent[ww].push([]);
                _traverse[that.dir].depth(that,d,function(dd){
                    var b = getBlock(that.x,that.y,that.z);
                    ccContent[ww][hh][dd] = b;
                });
            });
        });
        Drone.clipBoard[name] = {dir: this.dir, blocks: ccContent};
        return this;
    };

    Drone.prototype.paste = function(name)
    {
        var ccContent = Drone.clipBoard[name];
        var srcBlocks = ccContent.blocks;
        var srcDir = ccContent.dir; // direction player was facing when copied.
        var dirOffset = (4 + (this.dir - srcDir)) %4;
        var that = this;
        _traverse[this.dir].width(that,srcBlocks.length,function(ww){
            var h = srcBlocks[ww].length;
            _traverseHeight(that,h,function(hh){
                var d = srcBlocks[ww][hh].length;
                _traverse[that.dir].depth(that,d,function(dd){
                    var b = srcBlocks[ww][hh][dd];
                    var bm = _getBlockIdAndMeta(b);
                    var cb = bm[0];
                    var md = bm[1];
                    //
                    // need to adjust blocks which face a direction
                    //
                    switch (cb)
                    {
                        // 
                        // doors
                        //
                    case 64: // wood
                    case 71: // iron
                        // top half of door doesn't need to change
                        if (md < 8) {
                            md = (md + dirOffset) % 4;
                        }
                        break;
                        //
                        // stairs
                        //
                    case 53:  // oak 
                    case 67:  // cobblestone 
                    case 108: // red brick 
                    case 109: // stone brick 
                    case 114: // nether brick
                    case 128: // sandstone
                    case 134: // spruce
                    case 135: // birch
                    case 136: // junglewood
                        var dir = md & 0x3;
                        var a = Drone.PLAYER_STAIRS_FACING;
                        var len = a.length;
                        for (var c=0;c < len;c++){
                            if (a[c] == dir){
                                break;
                            }
                        }
                        c = (c + dirOffset) %4;
                        var newDir = a[c];
                        md = (md >>2<<2) + newDir;
                        break;
                        //
                        // signs , ladders etc
                        //
                    case 23: // dispenser
                    case 54: // chest
                    case 61: // furnace
                    case 62: // burning furnace
                    case 65: // ladder
                    case 68: // wall sign
                        var a = Drone.PLAYER_SIGN_FACING;
                        var len = a.length;
                        for (var c=0;c < len;c++){
                            if (a[c] == md){
                                break;
                            }
                        }
                        c = (c + dirOffset) %4;
                        var newDir = a[c];
                        md = newDir;
                        break;
                    }
                    putBlock(that.x,that.y,that.z,cb,md);
                });
            });
        });
        return this;
    };
    Drone.prototype.cylinder0 = _cylinder0;
    Drone.prototype.cylinder = _cylinder1;

    //
    // make all Drone's methods available also as standalone functions
    // which return a drone object
    // this way drones can be created and used as follows...
    //
    // /js box(5,7,3,4)
    // 
    // ... which is a short-hand way to create a wooden building 7x3x4
    //
    var ops = ['up','down','left','right','fwd','back','turn',
               'chkpt','move',
               'box','box0','boxa','prism','prism0','cylinder','cylinder0','arc',
               'door','door2','sign','oak','spruce','birch','jungle',
               'rand','garden',
               'copy','paste'
              ];

    for (var i = 0;i < ops.length; i++){
        global[ops[i]] = function(op){
            return function(){
                var result = new Drone();
                result[op].apply(result,arguments);
                return result;
            };
        }(ops[i]);
    }
    //
    // wph 20130130 - make this a method - extensions can use it.
    //
    Drone.prototype._getBlockIdAndMeta = _getBlockIdAndMeta;
               
}());
