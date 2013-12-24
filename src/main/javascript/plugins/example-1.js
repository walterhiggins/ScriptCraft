/*
  A simple minecraft plugin.
  Usage: At the in-game prompt type ...
  
  /js hello()

  ... and a message `Hello {player-name}` will appear (where {player-name} is 
  replaced by your own name).
*/
exports.hello = function(){
    echo("Hello " + self.name);
};
