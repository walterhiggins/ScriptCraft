var Drone = require('../drone').Drone;

//
// constructs a medieval fort
// 
Drone.extend('fort', function(side, height)
{
    if (typeof side == "undefined")
        side = 18;
    if (typeof height == "undefined")
        height = 6;
    // make sure side is even
    if (side%2)
        side++;
    if (height < 4 || side < 10)
        throw new java.lang.RuntimeException("Forts must be at least 10 wide X 4 tall");
    var brick = 98;
    //
    // build walls.
    //
    this.chkpt('fort').box0(brick,side,height-1,side);
    //
    // build battlements
    //
    this.up(height-1);
    for (i = 0;i <= 3;i++){
        var turret = [];
        this.box(brick) // solid brick corners
            .up().box('50:5').down() // light a torch on each corner
            .fwd(); 
        turret.push('109:'+ Drone.PLAYER_STAIRS_FACING[this.dir]);
        turret.push('109:'+ Drone.PLAYER_STAIRS_FACING[(this.dir+2)%4]);
        try{
            this.boxa(turret,1,1,side-2).fwd(side-2).turn();
        }catch(e){
            console.log("ERROR: " + e.toString());
        }
    }
    //
    // build battlement's floor
    //
    this.move('fort');
    this.up(height-2).fwd().right().box('126:0',side-2,1,side-2);
    var battlementWidth = 3;
    if (side <= 12)
        battlementWidth = 2;
    
    this.fwd(battlementWidth).right(battlementWidth)
        .box(0,side-((1+battlementWidth)*2),1,side-((1+battlementWidth)*2));
    //
    // add door
    //
    var torch = '50:' + Drone.PLAYER_TORCH_FACING[this.dir];
    this.move('fort').right((side/2)-1).door2() // double doors
        .back().left().up()
        .box(torch) // left torch
        .right(3)
        .box(torch); // right torch
    //
    // add ladder up to battlements
    //
    var ladder = '65:' + Drone.PLAYER_SIGN_FACING[(this.dir+2)%4];
    this.move('fort').right((side/2)-3).fwd(1) // move inside fort
        .box(ladder, 1,height-1,1);
    return this.move('fort');
    
});

