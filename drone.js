var ScriptCraft = ScriptCraft || {};
//
// Interface
// =========
//
// Please read the following section to understand what a Minecraft Drone can do.
//
var Drone = {
	 //
	 // creating a new drone
	 // ====================
	 // 
	 // Drones can be created in 2 ways...
	 //
	 // [1] d = new Drone()
	 //     This will create a new Drone. If the cross-hairs are pointing 
	 //     at a block at the time then, that block's location becomes the drone's 
	 //     starting point.
	 //     If the cross-hairs are _not_ pointing at a block, then the drone's starting
	 //     location will be 2 blocks directly in front of the player.
	 //
	 // [2] d = new Drone(x,y,z,direction)
	 //     This will create a new Drone at the location you specified using x, y, z
	 //     In minecraft, the X axis runs west to east and the Z axis runs north to south.
	 //     The direction parameter says what direction you want the drone to face:
	 //     0 = east, 1 = south, 2 = west, 3 = north.
	 //     If the direction parameter is omitted, the player's direction is used instead.
	 //

	 // movement
	 // ========
	 // 
	 // Drones can move freely in minecraft's 3-D world. You control the Drone's movement using
	 // any of the following methods..
	 //
	 // move up - n is the number of blocks you want to move (default 1)
	 up: function(n){},
	 // move down - n is the number of blocks you want to move (default 1)
	 down: function(n){},
	 // move left - n is the number of blocks you want to move (default 1)
	 left: function(n){},
	 // move right - n is the number of blocks you want to move (default 1)
	 right: function(n){},
	 // move forward - n is the number of blocks you want to move (default 1)
	 fwd: function(n){},
	 // move backwards - n is the number of blocks you want to move (default 1)
	 back: function(n){},

	 // to change direction - n is the number of turns right you want to make (default 1)
	 // turns are always clock-wise. If the drone is facing north, then drone.turn() will 
	 // make the turn face east. If the drone is facing east then drone.turn(2) will make the 
	 // drone turn twice so that it is facing west.
	 //
	 turn: function(n){},

	 // markers
	 // =======
	 // 
	 // Markers are useful when your Drone has to do a lot of work. You can set a check-point 
	 // and return to the check-point using the move() method.
	 // if your drone is about to undertake a lot of work - e.g. building a road, skyscraper or forest
	 // you should set a check-point before doing so if you want your drone to return to its current location.
	 // e.g:
	 // 
	 // drone.chkpt('town-square');
	 // for (i = 0; i< 100; i++){ 
	 //     drone.fwd(12).box(6); 
    // }
	 // drone.move('town-square');
	 //
	 // A 'start' checkpoint is automatically created when the Drone is first created.
	 //
	 chkpt: function(checkpoint_name){},
	 move: function(checkpoint_name){},

	 // building 
	 // ======== 
	 // 
	 // the box() method is the main method for building things.
	 // parameters
	 // ----------
	 // b - the block id - e.g. 6 for an oak sapling or '6:2' for a birch sapling. 
	 //     An array of block ids can also be used in which case each block in the array
	 //     will be placed in turn.
	 // w - the width of the structure (optional - default value is 1)
	 // h - the height of the structure (optional - default value is 1)
	 // d - the depth of the structure - NB this is *not* how deep underground the structure lies - this is 
	 //     how far away (depth of field) from the drone the structure will extend.
	 //     (optional - default value is 1)
	 // e.g:
	 // To create a stone structure 5 blocks wide, 8 blocks tall and 15 blocks long...
	 //
	 // drone.box(48, 5, 8, 15);
	 //
	 // To create an oak tree...
	 // (we can't control the dimensions of a tree since it's a natural object in minecraft)
	 //
	 // drone.box(6);
	 //
	 box: function(b,w,h,d){},
	 //
	 // like box but empties out the inside - ideal for buildings.
	 //
	 box0: function(b,w,h,d){},
	 prism: function(b,w,d){},
	 prism0: function(b,w,d){},

	 // miscellaneous
	 // =============

	 // create a door - if a parameter is supplied an Iron door is created otherwise a wooden door is created.
	 door: function(b){},
	 // create double doors (left and right side)
	 door2: function(b){}, 
	 // signs must use block 63 (stand-alone signs) or 68 (signs on walls)
	 // s can be a string or an array of strings. 
	 sign: function(s,b){},

	 // create trees.
	 oak: function(){},
	 spruce: function(){},
	 birch: function(){},
	 jungle: function(){},
	 //
	 // rand takes either an array (if each blockid is the same weight)
	 // or an object where each property is a blockid and the value is it's weight (an integer)
	 // e.g.
	 // rand([98,'98:1','98:2'],w,d,h) will place random blocks stone, mossy stone and cracked stone (each block has the same chance of being picked)
	 // rand({98: 5, '98:1': 3,'98:2': 2},w,d,h) will place random blocks stone has a 50% chance of being picked, 
	 //                               mossy stone has a 30% chance and cracked stone has just a 20% chance of being picked.
	 //
	 rand: function(distribution,w,h,d){},
	 //
	 // places random flowers and long grass (similar to the effect of placing bonemeal on grass)
	 //
	 garden: function(w,d){},

	 // Copy & Paste
	 // ============
	 
	 // copy an area so it can be pasted elsewhere. The name can be used for pasting the copied area elsewhere...
	 // drone.copy('somethingCool',10,5,10).right(12).paste('somethingCool');
	 // ... copies a 10x5x10 area (using the drone's coordinates as the starting point) into memory.
	 // the copied area can be referenced using the name 'somethingCool'. The drone moves 12 blocks right then
	 // pastes the copy.
	 //
	 copy: function(name,w,h,d){},
	 paste: function(name){}

	 // Chaining
	 // ========
	 // 
	 // All of the above methods return a Drone object, which means methods can be 'chained' together so instead of writing this...
	 //
	 // drone = new Drone(); 
	 // drone.fwd(3);
	 // drone.left(2);
	 // drone.box(2); // create a grass block
	 // drone.up();
	 // drone.box(2); // create another grass block
	 // drone.down();
	 // 
	 // ...you could simply write ...
	 //
	 // var drone = new Drone().fwd(3).left(2).box(2).up().box(2).down();
	 //
	 // The Drone object uses a Fluent Interface ( http://en.wikipedia.org/wiki/Fluent_interface ) 
	 // to make ScriptCraft scripts more concise and easier to write and read.
	 // Minecraft's in-game command prompt is limited to about 80 characters so chaining drone commands together
	 // means more can be done before hitting the command prompt limit. For complex building you should save your 
	 // commands in a new script file and load it using /js load()
	 //

};
//
// Implementation
// ==============
// 
// There is no need to read any further unless you want to understand how the Drone object works.
//
(function(){
	 //
	 // Drone Constructor
	 //
	 var Drone = function(x,y,z,dir)
	 {
		  var usePlayerCoords = false;
		  var playerPos = getPlayerPos();
		  if (typeof x == "undefined"){
				var mp = getMousePos();
				if (mp){
					 this.x = mp.x;
					 this.y = mp.y;
					 this.z = mp.z;
				}else{
					 // base it on the player's current location
					 usePlayerCoords = true;
					 this.x = playerPos.x;
					 this.y = playerPos.y;
					 this.z = playerPos.z;
				}
		  }else{
				this.x = x;
				this.y = y;
				this.z = z;
		  }
		  if (typeof dir == "undefined"){
				this.dir = _getDirFromRotation(playerPos.rotationYaw);
		  }else{
				this.dir = dir%4;
		  }
		  if (usePlayerCoords){
				this.fwd(2);
		  }
		  this.chkpt('start');

	 };
	 Drone.prototype.chkpt = function(name){
		  this.checkpoints[name] = {x:this.x,y:this.y,z:this.z,dir:this.dir};
		  return this;
	 };
	 Drone.prototype.move = function(name){
		  var coords = this.checkpoints[name];
		  if (coords){
				this.x = coords.x;
				this.y = coords.y;
				this.z = coords.z;
				this.dir = coords.dir;
		  }
		  return this;
	 };
	 Drone.prototype.checkpoints = {};

	 Drone.prototype.turn = function(n)
	 {
		  if (typeof n == "undefined"){
				this.dir++;
		  }else{
				this.dir += n;
		  }
		  this.dir %=4;
		  return this;
	 };
	 Drone.prototype.right = function(n){ if (typeof n == "undefined"){ n = 1;} return _movements[this.dir].right(this,n);};
	 Drone.prototype.left = function(n){ if (typeof n == "undefined"){ n = 1;}  return _movements[this.dir].left(this,n);};
	 Drone.prototype.fwd = function(n){ if (typeof n == "undefined"){ n = 1;}  return _movements[this.dir].fwd(this,n);};
	 Drone.prototype.back = function(n){ if (typeof n == "undefined"){ n = 1;} return _movements[this.dir].back(this,n);};
	 Drone.prototype.up = function(n){ if (typeof n == "undefined"){ n = 1;}  this.y+=n; return this;};
	 Drone.prototype.down = function(n){ if (typeof n == "undefined"){ n = 1;}  this.y-=n; return this;};
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
		  meta = bm[1];
		  if (block != 63 && block != 68){
				print("ERROR: Invalid block id for use in signs");
				return;
		  }
		  if (block == 68){
				meta = Drone.PLAYER_SIGN_FACING[this.dir];
				this.back();
		  }
		  putSign(message,this.x,this.y,this.z,block,meta);
		  if (block == 68){
				this.fwd();
		  }
		  return this;
	 };

	 Drone.prototype.cuboid = function(block,w,h,d){
		  var md = 0;
		  if (typeof h == "undefined"){
				h = 1;
		  }
		  if (typeof d == "undefined"){
				d = 1;
		  }
		  if (typeof w == "undefined"){
				w = 1;
		  }
		  var bi = 0;
		  var that = this;
		  _traverse[this.dir].width(that,w,function(){
				_traverseHeight(that,h,function(){
					 _traverse[that.dir].depth(that,d,function(){
						  //
						  // wph 20121229 - slower but supports random blocks
						  //
						  var cb = 0;
						  if (block.constructor == Array){
								cb = block[bi%block.length];
						  }else{
								cb = block;
						  }
						  var bm = _getBlockIdAndMeta(cb);
						  cb = bm[0];
						  md = bm[1];
						  putBlock(that.x,that.y,that.z,cb,md);
						  bi++;
					 });
				});
		  });
		  return this;
	 };
	 Drone.prototype.cuboid0 = function(block,w,h,d){
		  return this.cuboid(block,w,h,d).fwd().right().cuboid(0,w-2,h,d-2).back().left();
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
		  return this.cuboid(door+':' + this.dir).up().cuboid(door+':8').right().cuboid(door+':9').down().cuboid(door+':' + this.dir).left();
	 };
	 // player dirs: 0 = east, 1 = south, 2 = west,   3 = north
	 // block dirs:  0 = east, 1 = west,  2 = south , 3 = north
	 // sign dirs:   5 = east, 3 = south, 4 = west, 2 = north
	 Drone.PLAYER_STAIRS_FACING = [0,2,1,3];
	 Drone.PLAYER_SIGN_FACING = [4,2,5,3]; // for blocks 68 (wall signs) 65 (ladders) 61,62 (furnaces) 23 (dispenser) and 54 (chest)

	 Drone.prototype.prism0 = function(block,w,d){
		  this.prism(block,w,d).fwd().right().prism(0,w-2,d-2).left().back();
		  var se = Drone.STAIRBLOCKS[block];
		  if (d % 2 == 1 && se){
				// top of roof will be open - need repair
				var f = Math.floor(d/2);
				this.fwd(f).up(f).cuboid(se,w).down(f).back(f);
		  }
	 };
	 Drone.STAIRBLOCKS = {53: 5     // oak wood
								 ,67: 4    // cobblestone
								 ,108: 45  // brick
								 ,109: 98  // stone brick
								 ,114: 112 // nether brick
								 ,128: 24  // sandstone
								 ,134: '5:1'    // spruce wood
								 ,135: '5:2'    // birch wood
								 ,136: '5:3'    // jungle wood
								};
	 
	 //    /\
	 //   /##\
	 //  /####\
	 //  012345
	 //  d = 6, m = 3
				//    
	 //   /#\
	 //  /###\
	 //  01234
	 //  d = 5, m = 2
	 //
	 //   /\
	 //  /##\
	 //  0123
	 //  d = 4, m = 2  
				//   
	 //  /#\
	 //  012
	 //  d = 3, m = 1
	 //
	 Drone.prototype.prism = function(block,w,d){
		  var stairEquiv = Drone.STAIRBLOCKS[block];
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
				print("uc=" +uc + ",dc=" + dc);
				this.back(d);
		  }else{
				var c = 0;
				var d2 = d;
				while(d2 >= 1){
				var bd = block + ':' + (d2 >= d/2?this.dir:(this.dir+2)%4);
					 this.cuboid(bd,w,1,d2);
					 d2 -= 2;
					 this.fwd().up();
					 c++;
				}
				this.down(c).back(c);
		  }
		  return this;
	 };
	 Drone.prototype.box = Drone.prototype.cuboid;
	 Drone.prototype.box0 = Drone.prototype.cuboid0;
	 Drone.prototype.debug = function(){
		  this.debug = true;
		  var dirs = ["east","south","west","north"];
		  print([this.x,this.y,this.z,this.dir,dirs[this.dir]]);
		  return this;
	 }

	 // ========================================================================
	 // Private variables and functions
	 // ========================================================================

	 var _getDirFromRotation = function(r){
		  var result = 1;
		  r = Math.abs(Math.ceil(r));
		  if (r >= 45 && r < 135){
				result = 0;
		  }
		  if (r >= 135 && r < 225){
				result = 3;
				}
		  if (r >= 225 && r < 315){
				result = 2;
		  }
		  return result;
	 };
	 var _getBlockIdAndMeta = function(b){
		  if (typeof b == 'string'){
				var bs = b;
				var sp = bs.indexOf(':');
				if (sp == -1){
					 return [parseInt(bs),0];
				}
				b = parseInt(bs.substring(0,sp));
				md = parseInt(bs.substring(sp+1,bs.length));
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
	 _traverseHeight = function(that,n,callback){
		  var s = that.y, e = s + n;
		  for (; that.y < e; that.y++){
				callback(that.y-s);
		  }
		  that.y = s;
	 };

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
		  return this.box(randomized,w,h,d);
	 };
	 var _trees = {oak: 6 ,spruce: '6:1' ,birch: '6:2' ,jungle: '6:3' };
	 for (var p in _trees){
		  Drone.prototype[p] = function(v){return function(){ return this.box(v);};}(_trees[p]);
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
	 ScriptCraft.Drone = Drone;
	 
}());
Drone = ScriptCraft.Drone;
/*
getPlayerPos = function(){return {x:0,y:0,z:0,rotationYaw:0};};
getMousePos = function(){return null;};
putBlock = function(){};
getBlock = function(){};
drone.copy('x',4,2,3);
*/
drone = new Drone();
