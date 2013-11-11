Drone.extend('skyscraper',function(floors){
    if (typeof floors == "undefined")
        floors = 10;
    this.chkpt('skyscraper');
    for (var i = 0;i < floors; i++)
    {
        this.box(blocks.iron,20,1,20)
            .up()
            .box0(blocks.glass_pane,20,3,20);
        this.up(3);
    }
    return this.move('skyscraper');
});
