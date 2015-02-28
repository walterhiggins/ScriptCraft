## Using Other Plugins from ScriptCraft
The following question gets asked a lot so I'm going to try to answer it here:

> How to use other bukkit plugins API?  
> Like PermissionEX API.  
> I can check permission group by java code:  
> ru.tehkode.permissions.bukkit.PermissionsEx.getUser(player).inGroup("moderator");  
> But I can't run this code in JavaScript.  
> -- [Bukkit forum question][1]  

[1]: http://dev.bukkit.org/bukkit-plugins/scriptcraft/?page=2#c48

The above question refers to using ScriptCraft for CraftBukkit so I'll answer that first:

You can get the permissionsEx (or any other Bukkit plugin) like this...
```javascript
var pex = server.pluginManager.getPlugin('PermissionsEx');
if (pex.getUser(player).inGroup('moderator') ) {
...
}
```
Generally if you want to use another plugin's API, then get the plugin object by name and then call its methods. In the above example the `pex` variable refers to the aforementioned `PermissionsEx` Plugin. Once you have that reference you can call any of the plugin's methods just as you would in Java. The tricky part is getting the reference and that's where `server.pluginManager.getPlugin()` comes in.
