load($SCRIPT_DIR + "/../drone.js");
Drone.extend('dancefloor',function(width,length)
{
    if (typeof width == "undefined")
        width = 5;
    if (typeof length == "undefined")
        length = width;
    var disco = new Drone(this.x,this.y, this.z, this.dir);
    // under-floor lighting
    disco.down().box(89,width,1,length).up();
    var floorTiles = [35,35,'35:1','35:2','35:3','35:4','35:4','35:4','35:6',20,20];
    //
    // strobe gets called in a java thread
    //
    var strobe = function(){
        disco.rand(floorTiles,width,1,length);
    };
    thread = new java.lang.Thread(function(){
        while(true){
            strobe();
            java.lang.Thread.sleep(1000);
        }
    });
    thread.start();
    return this;
});
