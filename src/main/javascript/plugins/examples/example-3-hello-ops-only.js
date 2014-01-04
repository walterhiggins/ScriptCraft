/*************************************************************************
## Example Plugin #3 - Limiting use of commands to operators only.

A simple minecraft plugin. Commands for operators only.

### Usage: 

At the in-game prompt type ...
  
    /jsp op-hello

... and a message `Hello {player-name}` will appear (where {player-name} is 
replaced by your own name).
  
This example demonstrates the basics of adding new functionality
which is usable all players or those with the scriptcraft.proxy
permission. By default, all players are granted this permission. In
this command though, the function checks to see if the player is an
operator and if they aren't will return immediately.
 
This differs from example 2 in that the function will only print a
message for operators.

    command('op-hello', function (parameters, player) {
        if (!player.op){
            player.sendMessage('Only operators can do this.');
            return;
        }
        player.sendMessage('Hello ' + player.name);
    });
***/

command('op-hello', function (parameters, player) {
    /*
      this is how you limit based on player privileges
     */
    if (!player.op){
        player.sendMessage('Only operators can do this.');
        return;
    }
    player.sendMessage('Hello ' + player.name);
});
