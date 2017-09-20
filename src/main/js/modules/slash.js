'use strict';
/*global module, require, server, __plugin*/
var _ = require('underscore');
/************************************************************************
## The slash Module

This module provides a single function which makes it easy to execute
minecraft commands via javascript.

### The slash() function

This function makes it easy to execute one or more minecraft commands.

#### Parameters

 * commands : A String or Array of strings - each string is a command to be executed.
 * sender: (optional) The player on whose behalf the commands should be executed. If not specified the commands will be executed as the server console user.

#### Examples

Invoke the `/defaultgamemode creative` command (as server).

```javascript
var slash = require('slash');
slash('defaultgamemode creative');
```

Set the time of day to Midday and toggle downfall (as player 'JohnDoe'):

```javascript
var slash = require('slash'),
    utils = require('utils');
var johnDoe = utils.player('John_Doe');

slash([
  'time set 6000',
  'toggledownfall'
], johnDoe);
```

***/
function slash( commands, sender ){
  if (_.isArray(commands)){
    _.each(commands, function(command){
      slash(command, sender);
    });
    return;
  }
  if (__plugin.canary){
    if (sender === server){
      server.consoleCommand( commands );
    } else {
      server.consoleCommand( commands, sender );
    }
  }
  if (__plugin.bukkit){
    if (!sender){
      // if sender is not specified assume server console 
      server.dispatchCommand(server.consoleSender, commands);
    } else {
      server.dispatchCommand(sender, commands);
    }
  }
}
module.exports = slash;
