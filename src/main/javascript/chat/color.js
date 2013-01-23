/*
  declare a new javascript plugin for changing chat text color
*/
var chat = chat || plugin("chat", {
    /*
      set the color of text for a given player
    */
    setColor: function(player, color){
        this.store.players[player.name] = color;
    }
},true);
/*
  initialize the store
*/
chat.store.players = chat.store.players || {};

ready(function()
{
    var colors = [
        "black", "blue", "darkgreen", "darkaqua", "darkred",
        "purple", "gold", "gray", "darkgray", "indigo",
        "brightgreen", "aqua", "red", "pink", "yellow", "white"
    ];
    var colorCodes = {};
    for (var i =0;i < colors.length;i++) {
        var hexCode = i.toString(16);
        colorCodes[colors[i]] = hexCode;
    }
    
    events.on("player.AsyncPlayerChatEvent",function(l,e){
        var player = e.player;
        var playerChatColor = chat.store.players[player.name];
        if (playerChatColor){
            e.message = "§" + colorCodes[playerChatColor] + e.message;
        }
    });
    var listColors = function(params){
        var colorNamesInColor = [];
        for (var i = 0;i < colors.length;i++)
            colorNamesInColor[i] = "§"+colorCodes[colors[i]] + colors[i];
        __self.sendMessage("valid chat colors are " + colorNamesInColor.join(", "));
    };
    command("list_colors", listColors);
    command("chat_color",function(params){
        var color = params[0];
        if (colorCodes[color]){
            chat.setColor(__self,color);
        }else{
            __self.sendMessage(color + " is not a valid color");
            listColors();
        }
    },colors);
});
