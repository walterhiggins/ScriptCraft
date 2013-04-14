Drone.extend('skyscraper',function(floors){
    this.chkpt('skyscraper');
    for (var i = 0;i < floors; i++)
    {
        this.box(blocks.iron,20,1,20)
            .up()
            .box0(blocks.glass_pane,20,3,20);
        this.up(3);
    }
    this.move('skyscraper');
});
