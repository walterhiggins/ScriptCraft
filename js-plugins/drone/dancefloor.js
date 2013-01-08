load(__folder + "drone.js");
//
// Create a floor of colored tiles some of which emit light.
// The tiles change color every second creating a strobe-lit dance-floor.
// 
// See it in action here => http://www.youtube.com/watch?v=UEooBt6NTFo
//
Drone.extend('dancefloor',function(width,length)
{
    if (typeof width == "undefined")
        width = 5;
    if (typeof length == "undefined")
        length = width;
    //
    // create a separate Drone object to lay down disco tiles
    //
    var disco = new Drone(this.x,this.y, this.z, this.dir);
    //
    // under-floor lighting
    //
    disco.down().box(89,width,1,length).up();
    var floorTiles = [35,35,'35:1','35:2','35:3','35:4','35:4','35:4','35:6',20,20];
    //
    // strobe gets called in a java thread - disco only lasts 30 seconds.
    //
	 var discoTicks = 30;
    var strobe = function()
	 {
        while(discoTicks--)
		  {
            disco.rand(floorTiles,width,1,length);
            java.lang.Thread.sleep(1000);
        }
    };
    var thread = new java.lang.Thread(strobe);
    thread.start();
    return this;
});
