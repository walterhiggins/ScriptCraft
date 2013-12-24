var Drone = require('../drone').Drone;

//
// usage: 
// [1] to build a cottage at the player's current location or the cross-hairs location...
//
// /js cottage();
// 
// [2] to build a cottage using an existing drone...
// 
// /js drone.cottage();
//

Drone.extend('cottage',function ()
{
    this.chkpt('cottage')
        .box0(48,7,2,6)  // 4 walls
        .right(3).door() // door front and center
        .up(1).left(2).box(102) // windows to left and right
        .right(4).box(102)
        .left(5).up().prism0(53,7,6);
    //
    // put up a sign near door. 
    //
    this.down().right(4).sign(["Home","Sweet","Home"],68);
    
    return this.move('cottage');
});
//
// a more complex script that builds an tree-lined avenue with
// cottages on both sides.
//
Drone.extend('cottage_road', function(numberCottages)
{
    if (typeof numberCottages == "undefined"){
        numberCottages = 6;
    }
    var i=0, distanceBetweenTrees = 11;
    //
    // step 1 build the road.
    //
    var cottagesPerSide = Math.floor(numberCottages/2);
    this
        .chkpt("cottage_road") // make sure the drone's state is saved.
        .box(43,3,1,cottagesPerSide*(distanceBetweenTrees+1)) // build the road
        .up().right() // now centered in middle of road
        .chkpt("cr"); // will be returning to this position later

    //
    // step 2 line the road with trees
    //
    for (; i < cottagesPerSide+1;i++){
        this
            .left(5).oak() 
            .right(10).oak()
            .left(5) // return to middle of road
            .fwd(distanceBetweenTrees+1); // move forward.
    }
    this.move("cr").back(6); // move back 1/2 the distance between trees

    // this function builds a path leading to a cottage.
    function pathAndCottage(d){
        return d.down().box(43,1,1,5).fwd(5).left(3).up().cottage();
    };
    //
    // step 3 build cottages on each side
    //
    for (i = 0;i < cottagesPerSide; i++)
    {
        this.fwd(distanceBetweenTrees+1).chkpt("r"+i);
        // build cottage on left
        pathAndCottage(this.turn(3)).move("r"+i);
        // build cottage on right
        pathAndCottage(this.turn()).move("r"+i);
    }
    // return drone to where it was at start of function
    return this.move("cottage_road"); 
});

