var utils = require('utils'),
  autoload = require('plugin').autoload,
  logger = __plugin.logger,
  foreach = utils.foreach,
  watchFile = utils.watchFile,
  unwatchFile = utils.unwatchFile,
  playersDir = __dirname + '/../../players/',
  serverAddress = utils.serverAddress();

/************************************************************************
## Classroom Plugin

The `classroom` object contains a couple of utility functions for use
in a classroom setting. The goal of these functions is to make it
easier for tutors to facilitate ScriptCraft for use by students in a
classroom environment. Although granting ScriptCraft access to
students on a shared server is potentially risky (Students can
potentially abuse it), it is slighlty less risky than granting
operator privileges to each student. (Enterprising students will
quickly realise how to grant themselves and others operator privileges
once they have access to ScriptCraft).

The goal of this module is not so much to enforce restrictions
(security or otherwise) but to make it easier for tutors to setup a
shared server so students can learn Javascript. When scripting is
turned on, every player who joins the server will have a dedicated
directory into which they can save scripts. All scripts in such
directories are automatically watched and loaded into a global
variable named after the player.

So for example, if player 'walterh' joins the server, a `walterh`
global variable is created. If a file `greet.js` with the following
content is dropped into the `plugins/scriptcraft/players/walterh`
directory...

```javascript
exports.hi = function( player ){
  player.sendMessage('Hi ' + player.name);
};
```

... then it can be invoked like this: `/js walterh.hi( self )` . This
lets every player/student create their own functions without having
naming collisions.

It's strongly recommended that the
`craftbukkit/plugins/scriptcraft/players/` directory is shared so that
others can connect to it and drop .js files into their student
directories. On Ubuntu, select the folder in Nautilus (the default
file browser) then right-click and choose *Sharing Options*, check the
*Share this folder* checkbox and the *Allow others to create and
delete files* and *Guest access* checkboxes. Click *Create Share*
button to close the sharing options dialog. Students can then access
the shared folder as follows...

 * Windows:   Open Explorer, Go to \\{serverAddress}\players\
 * Macintosh: Open Finder,   Go to smb://{serverAddress}/players/
 * Linux:     Open Nautilus, Go to smb://{serverAddress}/players/

... where {serverAddress} is the ip address of the server (this is
displayed to whoever invokes the classroom.allowScripting() function.)

### classroom.allowScripting() function

Allow or disallow anyone who connects to the server (or is already
connected) to use ScriptCraft. This function is preferable to granting 'ops' privileges 
to every student in a Minecraft classroom environment.

Whenever any file is added/edited or removed from any of the players/
directories the contents are automatically reloaded. This is to
facilitate quick turnaround time for students getting to grips with
Javascript.

#### Parameters

 * canScript : true or false

#### Example

To allow all players (and any players who connect to the server) to
use the `js` and `jsp` commands...

    /js classroom.allowScripting( true, self )

To disallow scripting (and prevent players who join the server from using the commands)...

    /js classroom.allowScripting( false, self )

Only ops users can run the classroom.allowScripting() function - this is so that students 
don't try to bar themselves and each other from scripting.

***/
var _store = { enableScripting: false },
  File = java.io.File;

function revokeScripting ( player ) { 
  foreach( player.getEffectivePermissions(), function( perm ) {
    if ( (''+perm.permission).indexOf( 'scriptcraft.' ) == 0 ) {
      if ( perm.attachment ) {
	perm.attachment.remove();
      }
    }
  });
  var playerName = '' + player.name;
  playerName = playerName.replace(/[^a-zA-Z0-9_\-]/g,'');
  var playerDir = new File( playersDir + playerName );
  unwatchFile( playerDir );
}

function grantScripting( player ) {
  console.log('Enabling scripting for player ' + player.name);
  var playerName = '' + player.name;
  playerName = playerName.replace(/[^a-zA-Z0-9_\-]/g,'');
  var playerDir = new File( playersDir + playerName );
  playerDir.mkdirs();
  player.addAttachment( __plugin, 'scriptcraft.*', true );
  var playerContext = {};
  autoload( playerContext, playerDir, logger, { cache: false });
  global[playerName] = playerContext;

  watchFile( playerDir, function( changedDir ){
    autoload(playerContext, playerDir, logger, { cache: false });
  });

/*
  player.sendMessage('Create your own minecraft mods by adding javascript (.js) files');
  player.sendMessage(' Windows:   Open Explorer, go to \\\\' + serverAddress + '\\players\\' + player.name);
  player.sendMessage(' Macintosh: Open Finder, Go to smb://' + serverAddress + '/players/' + player.name);
  player.sendMessage(' Linux: Open Nautilus, Go to smb://' + serverAddress + '/players/' + player.name);
*/

}

var classroom = plugin('classroom', {
  allowScripting: function (/* boolean: true or false */ canScript, sender ) {
    sender = utils.player(sender);
    if ( !sender ) {
      console.log( 'Attempt to set classroom scripting without credentials' );
      console.log( 'classroom.allowScripting(boolean, sender)' );
      return;
    }
    /*
     only operators should be allowed run this function
     */
    if ( !sender.op ) {
      console.log( 'Attempt to set classroom scripting without credentials: ' + sender.name );
      sender.sendMessage('Only operators can use this function');
      return;
    }
    foreach( server.onlinePlayers, canScript ? grantScripting : revokeScripting);
    _store.enableScripting = canScript;

    sender.sendMessage('Scripting turned ' + ( canScript ? 'on' : 'off' ) + 
      ' for all players on server ' + serverAddress);
  },
  store: _store
}, true);

exports.classroom = classroom;

events.on( 'player.PlayerJoinEvent', function( listener, event ) { 
  if ( _store.enableScripting ) {
    grantScripting(event.player);
  }
}, 'HIGHEST');

