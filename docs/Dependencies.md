# Dependencies

A dependency is something that other things depend upon. Children depend on parents. Plugins that you write depend on other software "under" it to provide resources so that it can do what it does. High-level code relies on dependencies: other levels of code underneath to support it. The dependencies for your ScriptCraft plugins are as follows, with the lowest primary levels at the bottom and other levels built up over them:

- Your plugins!
- ScriptCraft
- Another layer of software ( this is what we're interested in here )
- Minecraft server software = SpigotMC
- Java
- An Operating System (OS) like Windows, Mac, or Linux
- Hardware

So you cannot run your plugins without ScriptCraft.
  \- You cannot run ScriptCraft without _another layer_ over Minecraft.
     \- You cannot run Minecraft unless you have an Operating System.
        \- And an Operating System must run over hardware "somewhere".

## That middle layer = Mods

The middle later is known as a Mod, short for Modification. Mods integrate closely with the Minecraft server and can change the way it works. ScriptCraft and other plugins depend on a mod between them and the Minecraft server.

In all of these ScriptCraft docs and code, you'll find the following names, which will be explained below:

- Bukkit
- CraftBukkit
- CanaryMod
- Spigot / SpigotMC

Technically, we don't **need** Mods. You can happily run a Minecraft multi-player server, or run single-player at home, with no mods. A server without mods is called "Vanilla".

A mod is required when we want to run a plugin. Essentially we connect our plugin into the mod and it connects to Minecraft. But we're here to talk about the ScriptCraft plugin and writing our own plugins, so for our purposes we **do** need a mod.

*Note:* Yes, we know this is a Plugin, and Mods are different. We are describing how modders can modify their game with modifications. The subtlety of definitions between Plugin and Mod isn't important for this purpose.

## Bukkit

Bukkit is an Application Programming Interface. There are a couple ways to think about an API. Here's one of two described for our purposes...

An API is not code, it's not a mod, it's a set of rules. An API is a definition for how things should work. It is not the code that makes things work. So Bukkit isn't software that gets loaded. Other software gets loaded that "implements the Bukkit API". That means people have taken time to read the rules and then write code that makes everything work according to those rules. Without a good set of rules (like laws) everyone would do things differently, and that would result in chaos.

The Bukkit API is a public definition that was created by other players just like us. It doesn't come from Mojang/Microsoft. The API includes definitions for things like Block and Player. When Mojang writes their code in Minecraft, they can call a block a Cube (they don't but it doesn't matter to us) and they can call a player a User. The Bukkit API is "our" set of rules, independent of whatever Mojang does in Minecraft.

To go a little deeper, the Bukkit API says all Blocks have what is called a BlockState, and that we can get that state information by calling the getState() function on a Block object. The API says that when we get a BlockState object, it's going to be a snapshot of the block at that point in time, and it's not going to change if someone happens to move the block a couple milliseconds later. These rules are not enforced by Bukkit. Bukkit simply defines the rules that all implementations of Bukkit must enforce.

Mojang/Microsoft can make changes to how they make things work in Minecraft. We generally don't care. Their internal changes should not affect our plugins, because our plugins rely on the Bukkit API, not Minecraft internal code. **That** is why we use a separate API. But read below to see how Minecraft releases do affect us.

[The Bukkit API is published on a public website][bukkitapi]. You're encouraged to become familiar with those docs. In fact, you really need to learn how to follow those docs if you are going to code with ScriptCraft!

### Implementations of the Bukkit API

So now we have a set of rules. What next? We need code that implements those rules - we need a server. Implementations of the Bukkit API are generally called "servers". That can be confusing when we have a Bukkit "server" for a Minecraft "server" running over a Linux "server". The idea is that it's providing a service at a specific tier (level) as described above. Our plugins connect into this tier, and we expect it to provide services (Minecraft data and functionality).

Let's talk about specific Bukkit implementations.

#### CraftBukkit

CraftBukkit is a mod, a server, an implementation of the Bukkit API. This used to be the main implementation that most people used ... but it is no longer supported. Now plugins written for CraftBukkit run over Spigot. This is what happened to CraftBukkit...

ScriptCraft is Free and Open Source Software (FOSS). The word Free in English means both Liberty and No-Cost. FOSS is both cost-free and we have the liberty to see, modify, and distribute it. However, not all software is completely free (liberty or cost). Problems arise when free software includes any bit of software that is owned by someone else and not considered "free". This situation occurred in 2014 with CraftBukkit, and led to what is now referred to as the DMCA era. That forced everyone to stop downloading, developing, and sharing the code, and it forced plugin developers to stop writing their code which depended on CraftBukkit.

#### Spigot

Spigot (also called SpigotMC to emphasize MineCraft) is a fork of CraftBukkit. It *is* (or originally *was*) CraftBukkit, but faster and (according to most) better. After the DMCA event, the SpigotMC team adopted CraftBukkit. They now manages all aspects of Spigot, CraftBukkit, and the Bukkit API, and ensure that no "licensed" code gets into it - they ensure that it remains "free".

So, knowing that SpigotMC implements Bukkit, and CraftBukkit no longer actually exists, you should now understand why there are references to both Spigot and Bukkit used here like they are the same thing, and no current references to CraftBukkit.

##### Paper

From the [Paper][paper] website:

> Paper is a high performance fork of the Spigot Minecraft Server that aims to fix gameplay and mechanics inconsistencies and improve performance. Paper contains numerous unique features and changes, including many performance improvements not found in Spigot.

At this time, ScriptCraft does not technically support Paper (PaperMC). However, ScriptCraft supports Bukkit ... and since Paper is a fork of Spigot, it implements Bukkit, so we "should" be able to run ScriptCraft over a Paper server. There is no plan yet to "officially" test ScriptCraft with Paper, but anyone is welcome to try it and share their experiences.

#### GlowstoneMC

Glowstone is defined as follows in the [project README][glowstone]:

> The main goals of the project are to provide a lightweight implementation of the Bukkit API and Minecraft server where exact vanilla functionality is not needed or higher performance is desired than the official software can deliver.

Also on that page:

> Glowstone is not finished. Nothing is guaranteed to work, though many things are likely to.

As with Paper, this means ScriptCraft "should" support GlowstoneMC, but since that project ventures away from standards, and it's not yet finished, we have not tested, will not support, and discourage usage of ScriptCraft with GlowstoneMC.

Also as above, if you like GlowstoneMC or Paper, you're welcome to create a new release of ScriptCraft that supports either of those Bukkit implementations. But please wait for those projects to stabilize.

We're also concerned about other Bukkit implementations being partially supported and then left for other ScriptCraft developers to work around or possibly remove. Please discuss your desire to support other Bukkit implementations with the community before beginning such an effort.

## CanaryLib

CanaryLib is another API, completely separate from the Bukkit API. It's a different set of rules, but of course since it was written for Minecraft it also exposes all of the things that we recognize in Minecraft. The CanaryLib API was announced in 2014 as a Bukkit alternative, along with CanaryMod, the implementation of the API. Walter Higgins dedicated a lot of effort to making ScriptCraft work with Canary, and it was a focus of his book, [A Beginner's Guide to Writing Minecraft Plugins in JavaScript][book].

But over time development on Canary came to an end. Another project called Neptune intended to implement CanaryLib, but while this gets occasional updates it's not yet ready for production use.

Given that Canary is not maintained, not available for current Minecraft releases, and it doesn't look like another CanaryLib implementation will be successful in the foreseeable future, the Canary features in ScriptCraft are no longer maintained or supported. The current plan is to remove Canary code from ScriptCraft in the v4.0 release.

For now that means ScriptCraft only supports Spigot.

## Forge?

Forge is a **VERY** popular API that allows "mere mortal" developers like us to create powerful server-side mods that change the nature of Minecraft. A mod written to the Forge API can actually change how the game works - these are real *mods*, not *plugins*. We recognize that it would be great to be able to run ScriptCraft with Forge mods, but we simply don't have the resources to make that happen yet. We'd prefer to wait for Sponge...

### Sponge?

Digging into the history book again, players and modders get frustrated that they need to choose between coding to Bukkit or coding to Forge. So some smart people created another layer of code above the server mod tier, that would allow a single plugin to communicate down to Forge or Bukkit. The first version of this was MC+. The next version was called Cauldron which was based on Forge and CraftBukkit (not Spigot). With the DMCA event in 2014, people from the Cauldron team and others got together to create Sponge, a complete re-design and re-write based on experiences of prior projects.

At this time Sponge is still in development. So as we focus on the current releases of ScriptCraftJS, we'll keep an eye on Sponge to see what it does and does not support. In the future it's quite likely that we will support both Spigot (by itself) and Sponge so that we can write much more complex JavaScript plugins.

## Others?

There are other server projects to add an API over Minecraft. Mojang/Microsoft may eventually publish their own. As with Sponge, we'll keep an eye on these to see what's popular, what's in demand, and to decide if it makes sense to support yet another platform.

See question #6 in the [FAQ][faq] on that specific topic.

## Client-side mods/plugins?

When you connect into the Minecraft server, you are using "client" software. This is a client/server environment. You execute code on your device which shows worlds and that code connects to the server to set data, so that other people in the same world see the same thing. There are client-side plugins for Minecraft which add things to the display, or which read/write data in the communications to make the game do things for you that other people might not see unless they have the same plugin.

At this time, ScriptCraftJS is entirely server-based. It does not support development of client-side plugins. This is another one of those things that we will watch, and if time permits and there is enough demand we'll consider some kind of client-side interface, so that you can write your own client-side plugins with JavaScrpt.


[blockstate]: https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/BlockState.html
[book]: http://www.peachpit.com/store/beginners-guide-to-writing-minecraft-plugins-in-javascript-9780133930146
[bukkitapi]: https://hub.spigotmc.org/javadocs/bukkit/
[faq]: Frequently-Asked-Questions.md
[glowstone]: https://github.com/GlowstoneMC/Glowstone
[paper]: https://paper.readthedocs.io/en/paper-1.11/
