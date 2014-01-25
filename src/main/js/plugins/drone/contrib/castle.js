var Drone = require('../drone').Drone;

//
// a castle is just a big wide fort with 4 taller forts at each corner
//
Drone.extend('castle', function(side, height)
{
    // 
    // use sensible default parameter values
    // if no parameters are supplied
    //
    if (typeof side == "undefined")
        side = 24;
    if (typeof height == "undefined")
        height = 10;
    if (height < 8 || side < 20)
        throw new java.lang.RuntimeException("Castles must be at least 20 wide X 8 tall");
    //
    // remember where the drone is so it can return 'home'
    //
    this.chkpt('castle');
    // 
    // how big the towers at each corner will be...
    //
    var towerSide = 10;
    var towerHeight = height+4;

    //
    // the main castle building will be front and right of the first tower
    //
    this.fwd(towerSide/2).right(towerSide/2);
    //
    // the castle is really just a big fort with 4 smaller 'tower' forts at each corner
    //
    this.fort(side,height);
    //
    // move back to start position
    //
    this.move('castle');
    //
    // now place 4 towers at each corner (each tower is another fort)
    //
    for (var corner = 0; corner < 4; corner++)
    {
        // construct a 'tower' fort
        this.fort(towerSide,towerHeight); 
        // move forward the length of the castle then turn right
        this.fwd(side+towerSide-1).turn(); 
    }
    return this.move('castle');
});
