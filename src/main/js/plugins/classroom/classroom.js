var utils = require('utils');

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
(security or otherwise) but to make it easier for tutors to setup a shared server
so students can learn Javascript.

### classroom.allowScripting() function

Allow or disallow anyone who connects to the server (or is already
connected) to use ScriptCraft. This function is preferable to granting 'ops' privileges 
to every student in a Minecraft classroom environment.

#### Parameters

 * canScript : true or false

#### Example

To allow all players (and any players who connect to the server) to
use the `js` and `jsp` commands...

    /js classroom.allowScripting(true,self)

To disallow scripting (and prevent players who join the server from using the commands)...

    /js classroom.allowScripting(false,self)

Only ops users can run the classroom.allowScripting() function - this is so that students 
don't try to bar themselves and each other from scripting.

***/
var _store = {enableScripting: false};
var classroom = plugin("classroom", {
    allowScripting: function (/* boolean: true or false */ canScript, sender) {
        if (typeof sender == 'undefined'){
            console.log("Attempt to set classroom scripting without credentials");
            console.log("classroom.allowScripting(boolean, sender)");
            return;
        }
        if (!sender.op){
            console.log("Attempt to set classroom scripting without credentials: " + sender.name);
            return;
        }
            
        /*
          only operators should be allowed run this function
        */
        if (!sender.isOp())
            return;
        if (canScript){
            utils.foreach( server.onlinePlayers, function (player) {
                player.addAttachment(__plugin, "scriptcraft.*", true);
            });
        }else{
            utils.foreach( server.onlinePlayers, function(player) {
                utils.foreach(player.getEffectivePermissions(), function(perm) {
                    if ((""+perm.permission).indexOf("scriptcraft.") == 0){
                        if (perm.attachment)
                            perm.attachment.remove();
                    }
                });
            });
        }
        _store.enableScripting = canScript;
    },
    store: _store
}, true);

exports.classroom = classroom;

events.on('player.PlayerLoginEvent', function(listener, event) { 
    var player = event.player;
    if (_store.enableScripting){
        player.addAttachment(__plugin, "scriptcraft.*", true);
    }
}, 'HIGHEST');

