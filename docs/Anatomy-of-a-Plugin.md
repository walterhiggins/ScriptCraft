# Anatomy of a ScriptCraft Plugin

Anything you can do using a java-based plugin, you can do it 
faster and easier in Javascript with the ScriptCraft plugin. To 
demonstrate this, I've recreated a commonly-used mod (homes) in 
javascript. The `homes` javascript plugin lets players set their current 
location as home and return to that location using in-game commands. 
They can also visit other players' homes. It's a simple plugin that 
demonstrates a couple of new features in ScriptCraft ...

 * Persistence
 * Adding Player (non-operator) commands

... First persistence. Persistence is the ability to retain state after 
the server has shutdown and started up again. Persistence is something 
you get for free if you create your javsacript plugin using the new 
`plugin()` function provided with ScriptCraft - just keep any data you 
want to save in a property called `store` and that data will be written 
and read at shutdown and startup. The data is persisted in JSON form so 
it's even somewhat human-readable. Declaring a new plugin is easy, you 
give your plugin a name, specify an interface/object and whether the 
plugin should be persistent. For this I'm going to create a new plugin 
called "chat" that will let players change the default color of their messages 
in the in-game chat window...

    var _store = {players: {}};
    exports.chat = plugin('chat', { 
        setColor: function(player,chatColor) { 
            _store.players[player.name] = chatColor;
        },
        store: _store
    }, true);

The above code doesn't do a whole lot other than let operators set a 
player's color choice ( `/js chat.setColor(self, 'green')` ). A little 
bit more code has to be added so that the player's text color will 
change when chatting with other players, but the above code will ensure 
the player's color setting is at least saved. The following code just 
ensures that when a player chats , the text will be displayed in their 
chosen color...

    var colors = ['black', 'blue', 'darkgreen', 'darkaqua', 'darkred',
                  'purple', 'gold', 'gray', 'darkgray', 'indigo',
                  'brightgreen', 'aqua', 'red', 'pink',
                  'yellow', 'white'];
    var colorCodes = {};
    for (var i =0;i < colors.length;i++) colorCodes[colors[i]] = i.toString(16);
    
    events.on( 'player.AsyncPlayerChatEvent', function( evt ) {
        var player = evt.player;
        var playerChatColor = _store.players[ player.name ];
        if ( playerChatColor ) {
            evt.message = '&sect;' + colorCodes[ playerChatColor ] + evt.message;
        }
    });
        
The next step is to declare a lookup table of colors / names and add an event 
handler which intercepts and inserts color codes into player's text 
messages. 

The other command in ScriptCraft is the `/jsp` command - this lets 
operators expose plugins for use by regular players. To be clear, `/jsp` 
does not do any javascript evaluation, it just accepts parameters which 
are then passed on to the appropriate javascript plugin. So far in this 
example plugin we haven't provided any way for regular players to - you 
know - actually set their text color of choice - only operators can do 
this for a player using the `js chat.setColor(...)` javascript 
expression. Let's be clear - giving your players access to the whole API 
via javascript isn't a good idea. So how do you safely let players 
choose their text color? If you've written a javascript function and 
want players to be able to use that function, you expose it using the 
new `command()` function like so...

    command( 'chat_color', function( params, sender ) {
        var color = params[0];
        if (colorCodes[color]){
            chat.setColor(sender,color);
        }else{
            sender.sendMessage(color + ' is not a valid color');
            sender.sendMessage('valid colors: ' + colors.join(', '));
        }
    },colors);

... The above code adds a new *subcommand* to the `/jsp` command and 
also specifies autocomplete options (the last parameter - `colors`) for 
that command when the player presses the `TAB` key. Now the player 
themselves can change their chosen chat color like so...

    /jsp chat_color yellow

... What I've done here is create a new plugin which lets players choose 
a chat color and saves that preference when the server shuts down and 
starts up. I've also added a new `jsp` sub-command - `chat_color` that 
players use to change their chat color setting. The full plugin source 
code is just a couple of lines of code but is a fully working plugin...

    // declare a new javascript plugin
    var _store = { players: {} } ; // private variable
    exports.chat = plugin('chat', {
        setColor: function(player, color){
            _store.players[player.name] = color;
        },
        store: _store     
    },true);

    var colors = ['black', 'blue', 'darkgreen', 'darkaqua', 'darkred',
                  'purple', 'gold', 'gray', 'darkgray', 'indigo',
                  'brightgreen', 'aqua', 'red', 'pink',
                  'yellow', 'white'];
    var colorCodes = {};
    for ( var i =0; i < colors.length; i++ ) {
        colorCodes[ colors[i] ] = i.toString(16);
    }
        
    events.on( 'player.AsyncPlayerChatEvent', function( evt ) {
        var player = evt.player;
        var playerChatColor = _store.players[player.name];
        if ( playerChatColor ) {
            evt.message = '&sect;' + colorCodes[playerChatColor] + evt.message;
        }
    });
    command( 'chat_color', function( params, sender ) {
        var color = params[0];
        if ( colorCodes[ color ] ) {
            chat.setColor( sender, color );
        }else{
            sender.sendMessage( color + ' is not a valid color' );
            sender.sendMessage( colors.join(',') );
        }
    }, colors );

    
![Chat Color plugin][1]

... this is what I would call a minimum viable plugin and it 
demonstrates some of the new features of ScriptCraft - persistence 
(automatic) , event handling, and exposing new functionality to players 
using the `/jsp` command. I hope this will give potential MineCraft 
modders a feel for just how easy it can be to change the game to suit 
their needs. 

[1]: img/scriptcraft-chat-color.png

