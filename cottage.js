//
// need to use the drone module to create buildings easily
// it can be done using calls to putBlock(), putSign(), getPlayerPos() and getMousePos()
// but it's easier to use the Drone class
// $SCRIPT_DIR is a special javascript variable whose value is the directory where the 
// current script resides.
// $SCRIPT is a special javascript variable whose value is the full name of the current script.
//
load($SCRIPT_DIR + "/drone.js"); // assumes cottage.js and drone.js are in same directory
//
// usage: 
// [1] to build a cottage at the player's current location or the cross-hairs location...
//
// /js cottage();
// 
// [2] to build a cottage using an existing drone...
// 
// /js cottage(drone);
//
var cottage = function(drone)
{
    if (typeof drone == "undefined"){
        drone = new Drone();
    }
    drone.chkpt('cottage')
        .box0(48,7,2,6)  // 4 walls
        .right(3).door() // door front and center
        .up(1).left(2).box(102) // windows to left and right
        .right(4).box(102)
        .left(5).up().prism0(53,7,6);
    //
    // put up a sign near door. 
    //
    drone.down().right(4).sign(["Home","Sweet","Home"],68);
    
    return drone.move('cottage');
};

print ("loaded " + $SCRIPT);
