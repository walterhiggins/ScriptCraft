# Frequently Asked Questions ... the FAQ

This doc should be updated as some questions are asked ... more frequently ...

### 1. Using Other Plugins from ScriptCraft

This is truly a FAQ: How do we access another Bukkit plugin's API?

As an example, consider PermissionEX. We can check to see if a player is in a permission group with this Java code:
`ru.tehkode.permissions.bukkit.PermissionsEx.getUser(player).inGroup("moderator");`

The first thing to do is to get an object that represents the plugin that will supply the desired functionality. Then use the API of that object. In this case:

```javascript
var pex = server.pluginManager.getPlugin('PermissionsEx');
if (pex.getUser(player).inGroup('moderator') ) {
   ...
}
```
Generally if you want to use another plugin's API, then get the plugin object by name and then call its methods. In the above example the `pex` variable refers to the aforementioned `PermissionsEx` Plugin. Once you have that reference you can call any of the plugin's methods just as you would in Java. The tricky part is getting the reference and that's where `server.pluginManager.getPlugin()` comes in.

##### But how do I know what to do with the other plugin?

Sure, you know the other plugin does stuff, but **how**? Use your preferred search engine and look for these keywords:
`minecraft api the_plugin_name`
In the above case: "[minecraft api permissionsex][pex]" That will lead to many resources including the API itself with classes and methods, and to forum postings where people are discussing how to use the API of that plugin. You are just like all of the rest of those folks - there's no difference in how you use the functionality except that you need to use JavaScript syntax rather than Java syntax. That will make a difference when it comees to arrays, lists, and some other details. At that point you need to translate examples you see from Java to JavaScript ... people in forums will probably not be very helpful about that.

<!-- TODO : Rather than deleting this text, rework the dConomy example for Spigot
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
-->

### 2. How do I get my plugin in the ScriptCraft core?

Eager developers want to share their code with everyone. That's great! But the ScriptCraft core isn't the place for a huge collection of such generous contributions. See the [Contributions][contrib] for info about how to code for ScriptCraft and contribute to the core. That doc also suggests that non-core plugins should be offered in a separate repo for server admins to download.

##### But how will anyone find my code if it's not built-in?

The new [ScriptCraftJS website][website] will have a section dedicated to helping people find your valuable contributions. We're working on that.

### 3. Who uses ScriptCraft? How popular is it?

We honestly don't know right now. We're updating the website to become a community hub. We're going to ask anyone who uses ScriptCraft to register in the community so that we can get some accurate counts of individuals, groups, developers, blogs, and plugins, and then strive to increase those numbers over time.

### 4. Where do I go to "hang out" with other people who use ScriptCraft?

See the [Help][help] doc which has links to Twitter, Facebook, the Google Group, Gitter, and other hangouts. When tweeting or commenting in Facebook, use the hashtag #Minecraft so that anyone else monitoring that tag will see what you're doing. Also use @ScriptCraftJS and/or #ScriptCraftJS so that everyone with interest knows that you're using these tools. That will attract more people to you who share the same interests, and that will help to increase the size of the community and the number of people who are also inclined to hang out with us, collaborate, and chat about this fun topic.

And don't just use hashtags, watch those hashtags to see what others are posting for them! See the Help page for related links.

### 5. ScriptCraft or ScriptCraftJS?

The original and continuing name for this project is just ScriptCraft. However, there is another ScriptCraft associated with the World of Warcraft (WoW). So in an effort avoid searches for one returning hits for the other, the more unique name ScriptCraftJS is increasingly being used wherever possible. Whenever you are referencing this plugin/project in public, please add the JS!

### 6. Can/Will ScriptCraft support servers other than SpigotMC?

The short answer for versions 3.3 to 4.0 will be No. After that the answer depends on the stability of other servers, and demand from ScriptCraft users. What we need to avoid is a half-hearted implementation, for an incomplete server, that only a handful of people might actually want to use.

As it is used now, mostly as a learningtool, the demand for ScriptCraft on alternative servers seems to be extremely low. So if you'd like to support another server type, please build it in a separate fork, keep that in sync with the latest production release of ScriptCraft, and we'll link to your implementation from the website. We can't divert core efforts forthis kind of project. Again, depending on demand we can talk about merging your functionality into the core later.

Please see the [Dependencies][deps] doc which has many notes about whether ScriptCraft can or should support other server types.



[contrib]: Contributing.md
[deps]: Dependencies.md
[help]: Help.md
[pex]: https://www.google.com/search?q=minecraft+api+permissionsex
[website]: http://scriptcraftjs.org/