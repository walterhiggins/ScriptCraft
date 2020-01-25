/*************************************************************************
## Example Plugin #4 - Using parameters in commands.

A simple minecraft plugin. Handling parameters.

### Usage: 

At the in-game prompt type ...
  
    /jsp hello-params Hi
    /jsp hello-params Saludos 
    /jsp hello-params Greetings

... and a message `Hi {player-name}` or `Saludos {player-name}` etc
will appear (where {player-name} is replaced by your own name).
  
This example demonstrates adding and using parameters in commands.
  
This differs from example 3 in that the greeting can be changed from
a fixed 'Hello ' to anything you like by passing a parameter.

    command( 'hello-params', function ( parameters, player ) {
      var salutation = parameters[0] ;
      echo( player, salutation + ' ' + player.name );
    });

***/

command('hello-params', function(parameters, player) {
  /*
   parameters is an array (or list) of strings.  parameters[0]
   refers to the first element in the list.  Arrays in Javascript
   are 0-based. That is, the 1st element is parameters[0], the 2nd
   element is parameters[1], the 3rd element is parameters[2] and
   so on. In this example, parameters[1] refers to the first word
   which appears after `jsp hello-params `.
   */
  var salutation = parameters[0];
  echo(player, salutation + ' ' + player.name);
});
