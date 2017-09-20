/*************************************************************************
## Asynchronous Input Module

The `input` module provides a simple way to prompt players for input at the 
in-game prompt. In Javascript browser environments the `prompt()` function provides
a way to block execution and ask the user for input. Execution is blocked until the user
provides input using the modal dialog and clicks OK. Unfortunately Minecraft provides no 
equivalent modal dialog which can be used to gather player text input. The only way to gather text 
input from the player in Minecraft is to do so asynchronously. That is - a prompt message can be 
sent to the player but the player is not obliged to provide input immediately, nor does the program
execution block until the player does so.

So ScriptCraft has no `prompt()` implementation because `prompt()` is a synchronous function and 
Minecraft's API provides no equivalent functions or classes which can be used to implement this synchronously. 
The Minecraft API does however have a 'Conversation' API which allows for prompting of the player and asynchronously gathering text input from the player. 

This new `input()` function is best illustrated by example. The following code is for a number-guessing game:

```javascript
var input = require('input');
exports.numberguess = function(player){
  var randomNumber = Math.ceil(Math.random() * 10);
  input( player, 'Think of a number between 1 and 10 (q to quit)', function( guess, guesser, repeat ) {
    if ( guess == 'q'){
      return;
    }
    if ( +guess !== randomNumber ) { 
      if (+guess < randomNumber ) {
        echo( guesser, 'Too low - guess again');
      }
      if (+guess > randomNumber ) {
        echo( guesser, 'Too high - guess again');
      }
      repeat();
    } else {
      echo( guesser, 'You guessed correctly');
    }
  });
};
```

The `input()` function takes 3 parameters, the player, a prompt message and a callback which will be invoked when the player has entered some text at the in-game command prompt. 
The callback is bound to an object which has the following properties:

 * sender : The player who input the text
 * value : The value of the text which has been input.
 * message: The message prompt.
 * repeat: A function which when invoked will repeat the original prompt. (this is for flow control)

The callback function as well as being bound to an object with the above properties (so you can use this.value inside your callback to get the value which has just been input), can also take the following parameters (in exact order):

 * value
 * sender
 * repeat

The `value` parameter will be the same as `this.value`, the `repeat` parameter will be the same as `this.repeat` and so on.

***/
if (__plugin.canary) {
  module.exports = require('./canary/input');
} else {
  module.exports = require('./bukkit/input');
}
