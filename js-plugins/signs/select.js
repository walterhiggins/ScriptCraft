load(__folder + "../events/events.js");
//
// signs module declaration
//
var signs = signs || {};
/**
 * signs.select returns a function which when passed an org.bukkit.block.Sign object, will 
 * turn that sign into an interactive menu with a list of options which can be changed by
 * right-clicking the sign.
 * Usage:
 * 
 * var dinnerMenu = signs.select("Dinner",["Lamb","Pork","Chicken","Duck","Beef"],
 *                               function(player,sign,selectedText,selectedIndex){
 *                                   player.sendMessage("You chose " + selectedText);
 *                               });
 * ... get an org.bukkit.block.Sign object...
 * var aSign = aBlock.state;
 * ... turn the sign into an interactive menu. 
 * var dinnerMenuSign = dinnerMenu(aSign);
 *
 */
signs.select = function(/* String */ label, /* Array */ options, /* Function */ callback, /* Number */ selectedIndex){};

(function(){
	 if (typeof signs._refresh != "undefined")
		  return;
	 var _refresh = function(p_sign,p_selectedIndex,p_displayOptions)
	 {
		  var optLen = p_displayOptions.length;
		  // the offset is where the menu window begins
		  var offset = Math.max(0,	Math.min(optLen-3, Math.floor(p_selectedIndex/3) * 3));
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
	 var _select = function(	 
		  /* String */ label, 
		  /* Array */ options,
		  /* Function */ callback,
		  /* Number */ selectedIndex)
	 {
		  importPackage(org.bukkit.block);
		  
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
		  
		  return function(/* Sign */ sign){
				if (typeof sign == "undefined"){
					 var mouseLoc = getMousePos();
					 if (mouseLoc){
						  sign = mouseLoc.block.state;
					 }else{
						  throw new Exception("You must provide a sign!");
					 }
				}
				//
				// per-sign variables go here
				//
				var cSelectedIndex = selectedIndex;
				sign.setLine(0,paddedLabel);
				var _updateSign = function(p_player,p_sign) {
					 cSelectedIndex = (cSelectedIndex+1) % optLen;
					 _refresh(p_sign,cSelectedIndex,displayOptions);
					 callback(p_player,p_sign,options[cSelectedIndex],cSelectedIndex);
				};
				// initialize the sign
				_refresh(sign,cSelectedIndex,displayOptions);
				//
				// update it every time player interacts with it.
				//
				events.on("player.PlayerInteractEvent",function(listener, event) {
					 if (event.clickedBlock.state.equals(sign))
						  _updateSign(event.player,sign);
				});
		  };
	 };
	 signs.select = _select;
}());

//
// Usage:
// In game, create a sign , target it and type /js signs.testSelect()
//
signs.testSelect = signs.select("Dinner",
										  ["Lamb","Pork","Chicken","Duck","Beef"],
										  function(player,sign,selectedText,selectedIndex){
												player.sendMessage("You chose " + selectedText);
										  });
//
// This is an example sign that displays a menu of times of day
// interacting with the sign will change the time of day accordingly.
//
// In game, create a sign , target it and type /js signs.timeOfDay()
//
signs.timeOfDay = signs.select("Time",
										 ["Dawn","Midday","Dusk","Midnight"],
										 function(player,sign,selectedText,selectedIndex){
											  player.location.world.setTime(selectedIndex*6000);
										 });
