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
 * sender: The player or server on whose behalf the commands should be executed.

#### Examples

Invoke the `/defaultgamemode creative` command (as server).

```javascript
var slash = require('slash');
slash('defaultgamemode creative', server);
```

Set the time of day to Midday and toggle downfall:

```javascript
var slash = require('slash');
slash([
  'time set 6000',
  'toggledownfall'
], server);
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
    server.dispatchCommand(sender, commands);
  }
}
module.exports = slash;
