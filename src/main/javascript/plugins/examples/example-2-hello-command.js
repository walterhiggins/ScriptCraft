/*************************************************************************
## Example Plugin #2 - Making extensions available for all players.

A simple minecraft plugin. Commands for other players.

### Usage: 

At the in-game prompt type ...
  
    /jsp hello

... and a message `Hello {player-name}` will appear (where {player-name} is 
replaced by your own name).
  
This example demonstrates the basics of adding new functionality
which is usable all players or those with the scriptcraft.proxy
permission.  By default, all players are granted this permission.
  
This differs from example 1 in that a new 'jsp ' command extension
is defined. Since all players can use the `jsp` command, all players
can use the new extension. Unlike the previous example, the `jsp hello` 
command does not evaluate javascript code so this command is much more secure.

    command('hello', function (parameters, player) {
        player.sendMessage('Hello ' + player.name);
    });

***/

command('hello', function (parameters, player) {
    player.sendMessage('Hello ' + player.name);
});
