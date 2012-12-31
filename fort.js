var scriptDir = $SCRIPT_DIR;
load(scriptDir + "/drone.js");

function fort(d, side, h)
{
	 if (typeof d == "undefined")
		  d = new Drone();
	 if (typeof side == "undefined")
		  side = 18;
	 if (typeof h == "undefined")
		  h = 6;
	 if (h < 4 || side < 10)
		  throw new java.lang.RuntimeException("Forts must be at least 9 wide X 4 tall");
	 // make sure side is even
	 if (side%2)
		  side++;
	 var brick = 98;
	 // build walls.
	 d.chkpt('fort').box0(brick,side,h-1,side);
	 //
	 // build turrets
	 //
	 d.up(h-1);
	 for (i = 0;i <= 3;i++){
		  var turret = [];
		  d.box(brick) // solid brick corners
				.up().box('50:5').down() // light a torch on each corner
				.fwd(); 
		  turret.push('109:'+ Drone.PLAYER_STAIRS_FACING[d.dir]);
		  turret.push('109:'+ Drone.PLAYER_STAIRS_FACING[(d.dir+2)%4]);
		  d.box(turret,1,1,side-2).fwd(side-2).turn();
	 }
	 //
	 // build battlements
	 //
	 d.move('fort');
	 d.up(h-2).fwd().right().box('44:5',side-2,1,side-2);
	 var battlementWidth = 3;
	 if (side <= 12)
		  battlementWidth = 2;
	 
	 d.fwd(battlementWidth).right(battlementWidth).box(0,side-((1+battlementWidth)*2),1,side-((1+battlementWidth)*2));
	 //
	 // add door
	 //
	 var torch = '50:' + Drone.PLAYER_TORCH_FACING[d.dir];
	 d.move('fort').right((side/2)-1).door2() // double doors
		  .back().left().up().box(torch) // left torch
		  .right(3).box(torch); // right torch
	 //
	 // add ladder up to battlements
	 //
	 d.move('fort').right((side/2)-3).fwd(1).box('65:' + Drone.PLAYER_SIGN_FACING[(d.dir+2)%4], 1,h-1,1);
	 return d.move('fort');
};
