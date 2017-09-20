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

To get a reference to and work with another plugin's API using ScriptCraft for CanaryMod the same principle applies. Say you've installed ScriptCraft and the dConomy plugin:

```javascript
var Canary = Packages.net.canarymod.Canary;
var pluginMgr = Canary.pluginManager();
var dConomy = pluginMgr.getPlugin('dConomy');
var dConomyServer = dConomy.modServer;
// from here on in you can access all of the dConomyServer object's calls
// e.g. dConomyServer.newTransaction()
```

The only difference between CanaryMod and Bukkit is how you get the plugin reference. In Bukkit it's:

```javascript
var otherPlugin = server.pluginManager.getPlugin('PLUGIN_NAME_GOES_HERE');
```

whereas in CanaryMod it's:

```javascript
var Canary = Packages.net.canarymod.Canary;
var otherPlugin = Canary.pluginManager().getPlugin('PLUGIN_NAME_GOES_HERE');
```
