var utils = require('utils');
var stringExt = require('utils/string-exts');
var _store = {};
/*
  Define the signs module - signs are persistent 
  (that is - a menu sign will still be a menu after the
  server has shut down and started up) plugins now have persistent state - Yay!
*/
var signs = plugin("signs", { 
    /*
      construct an interactive menu which can then be attached to a Sign.
    */
    menu: function(
        /* String */ label, 
        /* Array */ options, 
        /* Function */ onInteract, 
        /* Number */ defaultSelection ){},
    store: _store
},true);

module.exports = signs;

/*
  redraw a menu sign 
*/
var _redrawMenuSign = function(p_sign,p_selectedIndex,p_displayOptions)
{
    var optLen = p_displayOptions.length;
    // the offset is where the menu window begins
    var offset = Math.max(0, Math.min(optLen-3, Math.floor(p_selectedIndex/3) * 3));
    for (var i = 0;i < 3; i++){
        var text = "";
        if (offset+i < optLen)
            text = p_displayOptions[offset+i];
        if (offset+i == p_selectedIndex)
            text = ("" + text).replace(/^ /,">");
        p_sign.setLine(i+1,text);
    }
    p_sign.update(true);
};

var _updaters = {};
/*
  construct an interactive menu to be subsequently attached to 
  one or more Signs.
*/
signs.menu = function(  
    /* String */ label, 
    /* Array */ options,
    /* Function */ callback,
    /* Number */ selectedIndex
)
{
    
    if (typeof selectedIndex == "undefined")
        selectedIndex = 0;
    //
    // variables common to all instances of this menu can go here
    //
    var labelPadding =  "---------------";
    var optionPadding = "              ";
    
    var paddedLabel = (labelPadding+label+labelPadding).substr(((label.length+30)/2)-7,15);
    var optLen = options.length;
    var displayOptions = [];
    for (var i =0;i < options.length;i++){
        displayOptions[i] = (" " + options[i] + optionPadding).substring(0,15);
    }
    /*
      this function is returned by signs.menu and when it is invoked it will
      attach menu behaviour to an existing sign in the world.
      signs.menu is for use by Plugin Authors. 
      The function returned by signs.menu is for use by admins/ops.
    */
    var convertToMenuSign = function(/* Sign */ sign, save)
    {
        if (typeof save == "undefined")
            save = true;
        /*
          @deprecated start
          all calls should explicitly provide a [org.bukkit.block.Sign][buksign] parameter.
         */
        if (typeof sign == "undefined"){
            var mouseLoc = utils.getMousePos();
            if (mouseLoc){
                sign = mouseLoc.block.state;
                if (!(sign && sign.setLine)){
                    throw new Error("You must first provide a sign!");
                }
            }else{
                throw new Error("You must first provide a sign!");
            }
        }
        /*
          @deprecated end
         */
        //
        // per-sign variables go here
        //
        var cSelectedIndex = selectedIndex;
        sign.setLine(0,paddedLabel.bold());
        var _updateSign = function(p_player,p_sign) {
            cSelectedIndex = (cSelectedIndex+1) % optLen;
            _redrawMenuSign(p_sign,cSelectedIndex,displayOptions);
            var signSelectionEvent = {player: p_player,
                                      sign: p_sign,
                                      text: options[cSelectedIndex], 
                                      number:cSelectedIndex};
            
            callback(signSelectionEvent);
        };

        /* 
           get a unique ID for this particular sign instance
        */
        var signLoc = sign.block.location;
        var menuSignSaveData = utils.locationToJSON(signLoc);
        var menuSignUID = JSON.stringify(menuSignSaveData);
        /*
          keep a reference to the update function for use by the event handler
        */
        _updaters[menuSignUID] = _updateSign;

        // initialize the sign
        _redrawMenuSign(sign,cSelectedIndex,displayOptions);

        /*
          whenever a sign is placed somewhere in the world
          (which is what this function does)
          save its location for loading and initialization 
          when the server starts up again.
        */
        if (save){
            if (typeof _store.menus == "undefined")
                _store.menus = {};
            var signLocations = _store.menus[label];
            if (typeof signLocations == "undefined")
                signLocations = _store.menus[label] = [];
            signLocations.push(menuSignSaveData);
        }
        return sign;
    };

    /*
      a new sign definition - need to store (in-memory only)
      its behaviour and bring back to life other signs of the 
      same type in the world. Look for other static signs in the 
      world with this same label and make dynamic again.
    */

    if (_store.menus && _store.menus[label])
    {
        var signsOfSameLabel = _store.menus[label];
        var defragged = [];
        var len = signsOfSameLabel.length;
        for (var i = 0; i < len ; i++)
        {
            var loc = signsOfSameLabel[i];
            var world = org.bukkit.Bukkit.getWorld(loc.world);
            if (!world)
                continue;
            var block = world.getBlockAt(loc.x,loc.y,loc.z);
            if (block.state instanceof org.bukkit.block.Sign){
                convertToMenuSign(block.state,false);
                defragged.push(loc);
            }
        }
        /*
          remove data for signs which no longer exist.
        */
        if (defragged.length != len){
            _store.menus[label] = defragged;
        }
    }
    return convertToMenuSign;
};

//
// update it every time player interacts with it.
//
events.on('player.PlayerInteractEvent',function(listener, event) {
    /*
      look up our list of menu signs. If there's a matching location and there's
      a sign, then update it.
    */

    if (! event.clickedBlock.state instanceof org.bukkit.block.Sign)
        return;
    var evtLocStr = utils.locationToString(event.clickedBlock.location);
    var signUpdater = _updaters[evtLocStr]
    if (signUpdater)
        signUpdater(event.player, event.clickedBlock.state);
});


