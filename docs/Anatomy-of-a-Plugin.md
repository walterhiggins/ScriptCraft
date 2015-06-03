# Anatomy of a ScriptCraft Plugin

Anything you can do using a Java-based plugin, you can do it 
faster and easier in JavaScript with the ScriptCraft plugin. To 
demonstrate this, I've recreated a commonly-used mod (homes) in 
javascript. The [homes][homes] JavaScript plugin lets players set their current 
location as home and return to that location using in-game commands. 
They can also visit other players' homes. It's a simple plugin that 
demonstrates a couple of new features in ScriptCraft &hellip;

 * Persistence
 * Adding Player (non-operator) commands

[homes]:  /src/main/js/plugins/homes/homes.js

Here, I walk you through another useful plugin which lets players modify the color of the in-game chat.

## Persistence
&hellip; First persistence. Persistence is the ability to retain state
after the server has shutdown and started up again. You can create a
JavaScript object which will be saved at shutdown and reloaded at
startup by using the built-in `persist()` function.

```javascript
// file: scriptcraft/plugins/my-first-plugin.js
var prefs = persist('myprefs', {});
...
prefs.color = 'black';
```
In the example above, a new empty object is created and stored in a file called `myprefs-store.json`. The empty object is returned (if data is not already present in that file or the file does not exist) and any changes to the object's contents are written to the file when the server is shutdown.

The data is persisted in JSON form so it's even somewhat
human-readable. Declaring a new plugin is easy. I'm going to create a
new plugin called "chat" that will let players change the default
color of their messages in the in-game chat window &hellip;

```javascript
var store = persist('chat-colors', {players: {}});
exports.chat = { 
  setColor: function(player,chatColor) { 
    store.players[player.name] = chatColor;
  }
}
```
The above code doesn't do a whole lot other than let operators set a 
player's color choice ( `/js chat.setColor(self, 'green')` ). A little 
bit more code has to be added so that the player's text color will 
change when chatting with other players, but the above code will ensure 
the player's color setting is at least saved. The following code just 
ensures that when a player chats, the text will be displayed in their 
chosen color &hellip;

```javascript
var colors = ['black', 'blue', 'darkgreen', 'darkaqua', 'darkred',
              'purple', 'gold', 'gray', 'darkgray', 'indigo',
              'brightgreen', 'aqua', 'red', 'pink',
              'yellow', 'white'];
var colorCodes = {};
var COLOR_CHAR = '\u00a7';
for (var i =0;i < colors.length;i++) 
  colorCodes[colors[i]] = i.toString(16);

var addColor = function( evt ) {
  var player = evt.player;
  var playerChatColor = store.players[ player.name ];
  if ( playerChatColor ) {
    evt.message = COLOR_CHAR + colorCodes[ playerChatColor ] + evt.message;
  }
};

if (__plugin.bukkit) {
  events.asyncPlayerChat(addColor);
} else if (__plugin.canary) {
   events.chat(addColor);
};
```
        
The next step is to declare a lookup table of colors / names and add an event 
handler which intercepts and inserts color codes into player's text 
messages. 

## Adding new Player Commands
The other command in ScriptCraft is the `/jsp` command &ndash; this lets 
operators expose plugins for use by regular players. To be clear, `/jsp` 
does not do any JavaScript evaluation, it just accepts parameters which 
are then passed on to the appropriate JavaScript plugin. So far in this 
example plugin we haven't provided any way for regular players to &ndash; you 
know &ndash; actually set their text color of choice &ndash; only operators can do 
this for a player using the `js chat.setColor(...)` JavaScript 
expression. Let's be clear &ndash; giving your players access to the whole API 
via JavaScript isn't a good idea. So how do you safely let players 
choose their text color? If you've written a JavaScript function and 
want players to be able to use that function, you expose it using the 
new `command()` function like so &hellip;

```javascript
function chat_color( params, sender ){
  var color = params[0];
  if (colorCodes[color]){
    chat.setColor(sender,color);
  }else{
    echo(sender, color + ' is not a valid color');
    echo(sender, 'valid colors: ' + colors.join(', '));
  }
}
command(chat_color, colors);
```

&hellip; The above code adds a new *subcommand* to the `/jsp` command and 
also specifies autocomplete options (the last parameter &ndash; `colors`) for 
that command when the player presses the `TAB` key. Now the player 
themselves can change their chosen chat color like so &hellip;

    /jsp chat_color yellow

&hellip; What I've done here is create a new plugin which lets players choose 
a chat color and saves that preference when the server shuts down and 
starts up. I've also added a new `jsp` sub-command &ndash; `chat_color` that 
players use to change their chat color setting. The full plugin source 
code is just a couple of lines of code but is a fully working plugin &hellip;

```javascript
var store = persist('chat-colors', {players: {}});
exports.chat = { 
  setColor: function(player,chatColor) { 
    store.players[player.name] = chatColor;
  }
}
var colors = ['black', 'blue', 'darkgreen', 'darkaqua', 'darkred',
              'purple', 'gold', 'gray', 'darkgray', 'indigo',
              'brightgreen', 'aqua', 'red', 'pink',
              'yellow', 'white'];
var colorCodes = {};
var COLOR_CHAR = '\u00a7';
for (var i =0;i < colors.length;i++) 
  colorCodes[colors[i]] = i.toString(16);

var addColor = function( evt ) {
  var player = evt.player;
  var playerChatColor = store.players[ player.name ];
  if ( playerChatColor ) {
    evt.message = COLOR_CHAR + colorCodes[ playerChatColor ] + evt.message;
  }
};

if (__plugin.bukkit) {
  events.asyncPlayerChat(addColor);
} else if (__plugin.canary) {
   events.chat(addColor);
};

function chat_color( params, sender ){
  var color = params[0];
  if (colorCodes[color]){
    chat.setColor(sender,color);
  }else{
    echo(sender, color + ' is not a valid color');
    echo(sender, 'valid colors: ' + colors.join(', '));
  }
}

command(chat_color, colors);
```
    
![Chat Color plugin][1]

&hellip; this is what I would call a minimum viable plugin and it 
demonstrates some of the new features of ScriptCraft &ndash; persistence 
(automatic), event handling, and exposing new functionality to players 
using the `/jsp` command. I hope this will give potential Minecraft 
modders a feel for just how easy it can be to change the game to suit 
their needs. 

[1]: img/scriptcraft-chat-color.png

