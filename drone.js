var ScriptCraft = ScriptCraft || {};
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
				this.dir = getDirFromRotation(playerPos.rotationYaw);
		  }else{
				this.dir = dir%4;
		  }
		  if (usePlayerCoords){
				this.fwd(2);
		  }
		  this.homeCoords = {x:this.x,y:this.y,z:this.z,dir:this.dir};
	 };
	 var getDirFromRotation = function(r){
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
	 //
	 // movement
	 //
	 var movements = [{},{},{},{}];
	 // east
	 movements[0].right = function(that,n){ that.z +=n; return that;};
	 movements[0].left = function(that,n){ that.z -=n; return that;};
	 movements[0].fwd = function(that,n){ that.x +=n; return that;};
	 movements[0].back = function(that,n){ that.x -= n; return that;};
	 // south
	 movements[1].right = movements[0].back;
	 movements[1].left = movements[0].fwd;
	 movements[1].fwd = movements[0].right;
	 movements[1].back = movements[0].left;
	 // west
	 movements[2].right = movements[0].left;
	 movements[2].left = movements[0].right;
	 movements[2].fwd = movements[0].back;
	 movements[2].back = movements[0].fwd;
	 // north
	 movements[3].right = movements[0].fwd;
	 movements[3].left = movements[0].back;
	 movements[3].fwd = movements[0].left;
	 movements[3].back = movements[0].right;
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
	 Drone.prototype.right = function(n){ if (typeof n == "undefined"){ n = 1;} return movements[this.dir].right(this,n);};
	 Drone.prototype.left = function(n){ if (typeof n == "undefined"){ n = 1;}  return movements[this.dir].left(this,n);};
	 Drone.prototype.fwd = function(n){ if (typeof n == "undefined"){ n = 1;}  return movements[this.dir].fwd(this,n);};
	 Drone.prototype.back = function(n){ if (typeof n == "undefined"){ n = 1;} return movements[this.dir].back(this,n);};
	 Drone.prototype.up = function(n){ if (typeof n == "undefined"){ n = 1;}  this.y+=n; return this;};
	 Drone.prototype.down = function(n){ if (typeof n == "undefined"){ n = 1;}  this.y-=n; return this;};
	 Drone.prototype.home = function()
	 {
		  this.x = this.homeCoords.x;
		  this.y = this.homeCoords.y;
		  this.z = this.homeCoords.z;
		  this.dir = this.homeCoords.dir;
		  return this;
	 };
	 //
	 // building
	 //
	 var traverse = [{},{},{},{}];
	 // east
	 traverse[0].width = function(that,n,callback){
		  var s = that.z, e = s + n;
		  for (; that.z < e; that.z++){
				callback();
		  }
		  that.z = s;
	 };
	 traverse[0].depth = function(that,n,callback){
		  var s = that.x, e = s+n;
		  for (;that.x < e;that.x++){
				callback();
		  }
		  that.x = s;
	 };
	 // south
	 traverse[1].width = function(that,n,callback){
		  var s = that.x, e = s-n;
		  for (;that.x > e;that.x--){
				callback();
		  }
		  that.x = s;
	 };
	 traverse[1].depth = traverse[0].width;
	 // west
	 traverse[2].width = function(that,n,callback){
		  var s = that.z, e = s-n;
		  for (;that.z > e;that.z--){
				callback();
		  }
		  that.z = s;
	 };
	 traverse[2].depth = traverse[1].width;
	 // north
	 traverse[3].width = traverse[0].depth;
	 traverse[3].depth = traverse[2].width;
	 traverseHeight = function(that,n,callback){
		  var s = that.y, e = s + n;
		  for (; that.y < e; that.y++){
				callback();
		  }
		  that.y = s;
	 };
	 var getBlockIdAndMeta = function(b){
		  if (typeof b == 'string'){
				var bs = b;
				var sp = bs.indexOf(':')
				b = parseInt(bs.substring(0,sp));
				md = parseInt(bs.substring(sp+1,bs.length));
				return [b,md];
		  }else{
				return [b,0];
		  }
	 };
	 Drone.prototype.sign = function(message,block){
		  if (message.constructor == Array){
		  }else{
				message = [message];
		  }
		  var bm = getBlockIdAndMeta(block);
		  block = bm[0];
		  meta = bm[1];
		  if (block != 63 && block != 68){
				print("ERROR: Invalid block id for use in signs");
				return;
		  }
		  if (block == 68){
				meta = this.playerToSignDirs[this.dir];
				this.back();
		  }
		  putSign(message,this.x,this.y,this.z,block,meta);
		  if (block == 68){
				this.fwd();
		  }
		  return this;
	 };

	 Drone.prototype.cuboid = function(block,w,d,h){
		  var md = 0;
		  if (typeof block == 'object'){
				block = block.blockID;
		  }else{
				var bm = getBlockIdAndMeta(block);
				block = bm[0];
				md = bm[1];
		  }
		  if (typeof h == "undefined"){
				h = 1;
		  }
		  if (typeof d == "undefined"){
				d = 1;
		  }
		  if (typeof w == "undefined"){
				w = 1;
		  }
		  var that = this;
		  traverse[this.dir].width(that,w,function(){
				traverseHeight(that,h,function(){
					 traverse[that.dir].depth(that,d,function(){
						  putBlock(that.x,that.y,that.z,block,md);
					 });
				});
		  });
		  return this;
	 };
	 Drone.prototype.cuboid0 = function(block,w,d,h){
		  return this.cuboid(block,w,d,h).fwd().right().cuboid(0,w-2,d-2,h).back().left();
	 };
	 Drone.prototype.door = function(door){
		  if (typeof door == "undefined"){
				door = 64;
		  }else{
				door = 71;
		  }
		  return this.cuboid(door+':' + this.dir,1,1,1).up().cuboid(door+':8',1,1,1).down();
	 };
	 // player dirs: 0 = east, 1 = south, 2 = west,   3 = north
	 // block dirs:  0 = east, 1 = west,  2 = south , 3 = north
	 // sign dirs:   5 = east, 3 = south, 4 = west, 2 = north
	 Drone.prototype.playerToBlockDirs = [0,2,1,3];
	 Drone.prototype.playerToSignDirs = [4,2,5,3];

	 Drone.prototype.prism0 = function(block,w,d){
		  this.prism(block,w,d).fwd().right().prism(0,w-2,d-2).left().back();
		  var se = Drone.STAIRBLOCKS[block];
		  if (d % 2 == 1 && se){
				// top of roof will be open - need repair
				var f = Math.floor(d/2);
				this.fwd(f).up(f).cuboid(se,w,1,1).down(f).back(f);
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
					 var bd = block + ':' + this.playerToBlockDirs[di];
					 var putStep = true;
					 if (d2 == middle){
						  if (d % 2 == 1){
								putStep = false;
						  }
					 }
					 if (putStep)
						  this.cuboid(bd,w,1,1);
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
					 this.cuboid(bd,w,d2,1);
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
	 Drone.prototype.rehome = function(){
		  var mp = getMousePos();
		  var playerPos = getPlayerPos();
		  if (mp){
				this.x= mp.x;
				this.y= mp.y;
				this.z= mp.z;
		  }else{
				// base it on the player's current location
				this.x = playerPos.x;
				this.y = playerPos.y;
				this.z = playerPos.z;
				this.fwd(2);
		  }
		  this.dir = getDirFromRotation(playerPos.rotationYaw);
		  this.homeCoords = {x:this.x,y:this.y,z:this.z,dir:this.dir};
		  return this;
	 };
	 ScriptCraft.Drone = Drone;
	 
}());
var Drone = ScriptCraft.Drone;
drone = new Drone();

