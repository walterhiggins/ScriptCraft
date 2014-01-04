/*************************************************************************
## Example Plugin #6 - Re-use - Using 'utils' to get Player objects.

A simple minecraft plugin. Finding players by name.

### Usage: 

At the in-game prompt type ...
  
    /jsp hello-byname {player-name}

... substituting {player-name} with the name of a player currently
online and a message `Hello ...` will be sent to the named
player.
  
This example builds on example-5 and also introduces a new concept -
use of shared modules. That is : modules which are not specific to
any one plugin or set of plugins but which can be used by all
plugins. Shared modules should be placed in the
`scriptcraft/modules` directory.
  
 * The utils module is used. Because the 'utils' module is
   located in the modules folder we don't need to specify an exact
   path, just 'utils' will do. 
 
 * The `utils.player()` function is used to obtain a player object
   matching the player name. Once a player object is obtained, a
   message is sent to that player.

Source Code ...

    var utils = require('utils');
    var greetings = require('./example-1-hello-module');

    command('hello-byname', function( parameters, sender ) {
        var playerName = parameters[0];
        var recipient = utils.player(playerName);
        if (recipient)
            greetings.hello(recipient);
        else
            sender.sendMessage('Player ' + playerName + ' not found.');
    });

***/

var utils = require('utils');
var greetings = require('./example-1-hello-module');

command('hello-byname', function( parameters, sender ) {
    var playerName = parameters[0];
    var recipient = utils.player(playerName);
    if (recipient)
        greetings.hello(recipient);
    else
        sender.sendMessage('Player ' + playerName + ' not found.');
});
