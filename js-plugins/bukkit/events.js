var global = this;
//
// Usage:
//
//  The following code will print a message on screen every time a block is broken in the game
//
//    bukkit.on('block.BlockBreakEvent',function(evt){ 
//        print (evt.player.name + " broke a block!");
//    });
// 
var bukkit = bukkit || {
    //
    // handle events in Minecraft
    // --------------------------
    // eventType can be a string (assumed to be a sub package of org.bukkit.event - e.g. 
    // if the string "block.BlockBreakEvent" is supplied then it's converted to the 
    // org.bukkit.event.block.BlockBreakEvent class . For custom event classes, just 
    // supply the custom event class e.g.
    // bukkit.on(net.yourdomain.events.YourCustomEvent,function(e){ ... });
    //
    on: function(
        /* String or java Class */ eventType, 
        /* function */ handler, 
        /* (optional) String (HIGH, HIGHEST, LOW, LOWEST, NORMAL, MONITOR), */ priority
    ){}
};
//
// private implementation from here on in...
//
(function(){
    if (bukkit._eventsLoaded){
        return;
    }
    var _event = org.bukkit.event;
    var _plugin = org.bukkit.plugin;
    var theListener = new _event.Listener(){};

    //
    var _on = function(eventType, handler, priority)
    {
        if (typeof priority == "undefined"){
            priority = _event.EventPriority.NORMAL;
        }else{
            priority = _event.EventPriority[priority];
        }
        if (typeof eventType == "string"){
            var subPkgs = eventType.split('.');
            eventType = _event[subPkgs[0]];
            for (var i = 1;i < subPkgs.length; i++){
                eventType = eventType[subPkgs[i]];
            }
        }
        var handlerList = eventType.getHandlerList();
        var handlerWrapper = {
            execute: function(l,e){
                // drop listener
                handler(e);
            } 
        };
        var registeredListener = new _plugin.RegisteredListener(theListener,
                                                                handlerWrapper,
                                                                priority,
                                                                plugin,
                                                                true);
        handlerList.register(registeredListener);
    };
    bukkit.on = _on;
    bukkit._eventsLoaded = true;
}());
