<!-- 
IMPORTANT NOTE FOR CONTRIBUTORS
-------------------------------
Contributors: This file is generated from source file src/docs/templates/ypgpm.md
If you would like to make changes, change file src/docs/templates/ypgpm.md instead
-->
# The Young Person's Guide to Programming in Minecraft
## Table of Contents
 * [Introduction](#introduction)
 * [Installing and Running SpigotMC](#installing-and-running-spigotmc)
 * [Installing ScriptCraft](#installing-scriptcraft)
 * [Configuring your Server (optional)](#configuring-your-server-optional)
 * [Learning Javascript](#learning-javascript)
 * [First Steps](#first-steps)
 * [Variables](#variables)
 * [Functions](#functions)
 * [Building stuff in Minecraft](#building-stuff-in-minecraft)
 * [Common Block Materials](#common-block-materials)
 * [Dimensions](#dimensions)
 * [More shapes](#more-shapes)
 * [The Drone Object](#the-drone-object)
   * [Movement](#movement)
   * [Chaining - combining building and movement.](#chaining---combining-building-and-movement)
   * [Exercise - Build a simple dwelling](#exercise---build-a-simple-dwelling)
   * [Remembering where you started.](#remembering-where-you-started)
 * [Saving your work](#saving-your-work)
 * [Your First Minecraft Mod!](#your-first-minecraft-mod)
 * [Parameters](#parameters)
 * [true or false](#true-or-false)
 * [More fun with `true` or `false`](#more-fun-with-true-or-false)
   * [Booleans and JavaBeans](#booleans-and-javabeans)
   * [SIDENOTE](#sidenote)
 * [...and Again, and Again, and Again,...](#and-again-and-again-and-again)
   * [Counting to 100](#counting-to-100)
   * [Saying "Hi!" to every player](#saying-hi-to-every-player)
 * [While Loops](#while-loops)
 * [`utils.foreach()` - Yet another way to process Arrays](#utilsforeach---yet-another-way-to-process-arrays)
   * [Exercise](#exercise)
 * [Putting `for` loops to use - Building a Skyscraper](#putting-for-loops-to-use---building-a-skyscraper)
 * [Making Decisions](#making-decisions)
 * [Event-Driven programming](#event-driven-programming)
   * [Stop listening to events.](#stop-listening-to-events)
 * [Keeping Score - Lookup tables in Javascript](#keeping-score---lookup-tables-in-javascript)
 * [Counting block break events for each player](#counting-block-break-events-for-each-player)
 * [Next Steps](#next-steps)
## Introduction

Minecraft is an open-ended 3D game where you can build and craft
anything you like. Minecraft can be extended and enhanced using 'Mods'
(short for 'modifications') - additional bits of code that are added
to the Game. ScriptCraft is one such Mod - it lets you program in
Javacript right within the game, making it possible to ...

 * Build using simple javascript statements. 
 * Extend the game in other interesting ways - add new Items, change
   the game behaviour and create mini-games.

Minecraft can be played in single-player or multi-player mode (with
friends). Most people play Minecraft in Multi-player mode where
players connect to a Minecraft Server on the internet or locally
(running on the player's computer). 

![Cottages created using ScriptCraft in MineCraft][img_cr]

# Installation

Before installing ScriptCraft you must first install SpigotMC which is
a special version of Minecraft Server that makes it easy to customize
the game.

## Installing and Running SpigotMC

Follow these steps to download and install SpigotMC.

1. Download Spigot's [BuildTools.jar][spigotdl] 
2. Save the BuildTools.jar file to a new directory called spigotmc.
3. Open a terminal (Mac and Linux) or command prompt (windows) window and type `java -jar BuildTools.jar`. This will kick off a long series of commands to "build" SpigotMC.
4. When the build is done, there will be a new file beginning with `spigot` and ending in `.jar` in the spigotmc directory. Run this file by typing `java -jar spigot-1.10.2.jar` (it might not be that exact name - you can list files in the directory by typing `dir` (Windows) or `ls` (Mac and Linux).
5. The server will start up then shut down very shortly afterwards. You'll need to edit a file called `eula.txt` - change `eula=false` to `eula=true` and save the file.
6. Run the `java -jar spigot-1.10.2.jar` command again - this time the server will start up. Shut it down by typing `stop` at the server prompt.

## Installing ScriptCraft

Follow these steps to download and install ScriptCraft.

1. Download the [scriptcraft.jar][dl] plugin and save it to the `plugins` directory and restart the server by typing `java -jar spigot-1.10.2.jar`.
2. At the server prompt type `js 1 + 1` and hit enter. The result `2` should be displayed. 

Congratulations - you've just installed your Custom Minecraft Server and are ready to begin writing your first mod!

## Configuring your Server (optional)

Once you've installed SpigotMC, depending on your specific needs,
you might want to consider setting the following properties in the `server.properties` file:

    # completely flat worlds are best for building from scratch
    # bukkit/spigotmc
    level-type=FLAT
    generate-structures=false
    
    # creative mode
    gamemode=1
    pvp=false
    
    # turns off authentication (for classroom environments)
    online-mode=false
    spawn-npcs=false
    spawn-monsters=false

## Learning Javascript

To begin creating cool stuff in Minecraft using ScriptCraft, you don't 
*have* to know much JavaScript. ScriptCraft comes with lots of functions 
to help you create buildings of any size, and lets you experiment while 
you play. However, as you learn Javascript you will be able to create 
cooler stuff in Minecraft - not just buildings, you'll be able to add 
new rules and items to the game - even create mini-games for you and 
your friends. If you want to get started learning JavaScript, check out 
this [fun Javascript Tutorial][ce]. If you want to dive right in to 
ScriptCraft, read on...

## First Steps

If you don't already know Javascript, don't worry, you'll learn a little 
about Programming and Javascript along the way. You've set up a 
Minecraft server and are ready to connect ...

1. Launch Minecraft. 
2. Click 'Multi-Player'
3. Click 'Add Server'
4. Type any name you like in the name field then type `localhost` in the 
address field. `localhost` is a special internet address that points to 
your own computer.
5. Click 'Join Server' to join the server. If the version
of Minecraft is incompatible with the version of the server you will
not be able to connect to the server. To fix this, you can create a
Minecraft profile in your client. Profiles let you decide which
version of Minecraft client you want to run so that your client and
server are compatible.

6. Once you've joined the game, press the `/` key located at the bottom 
right of your keyboard. A prompt will appear. Type the following then 
press enter: `js 1 + 1` The number 2 should be displayed. 

... Well Done! You've just confirmed you can run Javascript code from
within the Minecraft Console. 

## Variables

A variable is how you name something for the computer (and you the 
programmer) to remember. You create a new variable in Javascript using 
the `var` keyword...

    /js var location = 'Blackrock Castle'

... creates a new variable called `location` and stores the text 
`Blackrock Castle` in it. Now the computer has a new item in its memory 
called `location`. We can use that name like this...

    /js echo( location )

... and the following is displayed...

    Blackrock Castle

...You might be wondering why there's no enclosing `'` single quotes. 
When telling the computer to store some text, you have to put `'` 
(that's the single-quote character) at the start and end 
of the text. The computer doesn't store these quote characters, only the 
text between them. The computer will store the variables while the 
Minecraft Server is running. Repeat the last command you entered by 
pressing the `/` key then the UP arrow key on your keyboard, then 
pressing enter. You can repeat that statement as many times as you like 
and the computer will always display the same value. You can change the 
value like this...

    /js location = 'Mahon Point'

...notice this time I didn't use the `var` keyword. I didn't need to. 
The `var` keyword is only needed when you first create the variable. Now 
execute this command...

    /js echo( self, location ) 

...and it displays...

    Mahon Point

Variables can be created and changed easily in Javascript. Along with 
the variables you'll create in your in-game commands and scripts, there 
are handy *free* variables created for you by ScriptCraft. One such variable is 
`self`, it contains information about the current player (that's you)...

    /js echo ( self, self.name )
    
... displays something like the following...

    walterh

... for me but the message displayed will be different for every player.

## Functions

ScriptCraft comes with a couple of extra functions not normally found in 
Javascript. These functions will help you build new structures and 
buildings which would otherwise take hours to build by hand. Before 
looking at the building functions let's look at the `echo()` function.

`echo()` - as its name implies - will echo back at you whatever you
tell it. For example, type ...
   
    /js echo( self, 'Hello')

... and the game will display...

    Hello

... type ...

    /js echo( self, 5 + 7 )

... and the game will display...

    12    

... While you can now use Minecraft to help with Maths homework - I 
don't recommend it. Homework and Minecraft don't mix! The `echo()` 
function will display anything you tell it to - Text, Numbers and other types...

    /js echo( self, new Date() )

... prints today's date. If the statement above looks confusing - don't 
worry - `new Date()` creates a new date object - I'll talk about objects 
later ...

    Tue Jan 08 2013 20:53:37 GMT-0000 (GMT)

![Today's Date][img_echo_date]

`echo()` is a very useful function but it is not part of the
Javascript Language. You can't use it outside of Minecraft. There are
many other functions in Javascript all of which you can also
use in Minecraft. For example...

    /js Math.max( 6, 11 )

... returns the larger of the 2 numbers you give it (max is short for
maximum). While...

    /js Math.min( 6, 11 )

... returns the smaller of the 2 numbers. That's another thing -
functions can `return` stuff. You can store the result of a function
(what it returns) in a variable like this...

    /js var biggest = Math.max( 6, 11 )
   
... Now type...
   
    /js biggest

... Not all Javascript functions return data but most do. As well as
the functions provided to you by the Javascript Language and
ScriptCraft, you can write your own functions like this...

    /js function whatTimeIsIt () { return new Date() }

... Here you've created a new `function` called `whatTimeIsIt` and
told the function it should return a new `Date` object every time it's
called. You'll notice the above statement didn't actually do anything
- it certainly didn't display the current time. That's because all
 you've done is is say what the function should do when it's called,
 you haven't called it yet. To call the function...

    /js whatTimeIsIt()

... The current time is displayed. Congrats! You've just written your
first Javascript function - you're well on your way to becoming a
Minecraft Modder. There are many functions for working with Text,
numbers and dates in Javascript...

    /js Math.random()
   
... prints out a random number every time you call it. Try it! Then press
the `/` key then the UP Arrow key to repeat the last statement in your
in-game console. You'll see the number displayed is different each
time. Think of Math.random() as a Dice with many many sides. You can
rely on it to never return the same value twice.

## Building stuff in Minecraft

Now we get to the fun stuff - creating structures and buildings in 
Minecraft. Building by hand is fun but tedious when you want to build 
big - Towers, Castles and Fortresses. That's where ScriptCraft comes in. 
ScriptCraft comes with a couple of javascript functions that can be 
combined to build interesting things. Let's start small though to get a 
feel for how ScriptCraft's building functions work. The function you'll 
probably use most for building is called `box()` and - as its name 
implies - it is used to create cubes and cuboids of any size. A cube is 
a 3D shape whose sides are all the same length. A cuboid is a 3D shape 
whose width, height and length can differ.

![3D Shapes][img_3d_shapes]

You can create a Cube or a Cuboid in ScriptCraft using the `box()` 
function. You must tell the function what material you want the shape to 
be made of. For example, in the game, point the cross hairs at the 
ground, then type the following and hit enter...

    /js box( blocks.oak )

... This will change the targeted block to wood. What's happened here
is the `box()` function has created a single new wooden
block. `blocks` is another one of those *free* variables you get in
ScriptCraft, you can see a list of block materials by typing ...

    /js blocks.

... then pressing the `TAB` key. Repeatedly pressing the `TAB` key
will cycle through all of the block materials. Alternatively, you can
see many more current materials and the numbers Minecraft uses for
them by visiting the [Minecraft Data Values][mcdv] site.

## Common Block Materials

In Minecraft Programming, Materials aren't known by their name,
instead numbers (sometimes 2 numbers) are used to indicate which
material should be used. For example the number 2 is grass, 1 is
cobblestone etc, while 5 is wood (oak). There are different types of
wood so the text '5:1' means Spruce, '5:2' means Birch and '5:3' means
Jungle wood. There are many different materials in the Minecraft world, the most
commonly used materials for building are:

 * '4' - Cobblestone or `blocks.cobblestone`
 * '5' - Wooden Planks or `blocks.oak`
 * '5:2' - Birch wood Planks (light wood) or `blocks.birch`
 * '98' - Stone bricks or `blocks.brick.stone`
 * '45' - Red bricks or `blocks.brick.red`
 * '68' - Sign or `blocks.sign`
 * '102' - Glass panes (for windows) or `blocks.glass_pane` 

You can create a single wooden block using the numeric values or the `blocks` variable. For example...

    /js box( '5' )

... and ...

    /js box( blocks.oak ) 

... both do exactly the same thing but I personally prefer `/js box(
blocks.oak )` because it's easier to remember. For reference, here is
a chart of all of the blocks (not items) in the Minecraft world...

![Minecraft Data Values][img_dv]

## Dimensions

`box()` can do more than just
create single blocks - it can create cubes and cuboids of any
size. Take a look at the following picture which shows how shapes are
measured in 3D space. There are 3 dimensions (or sizes) to consider.

1. Width
2. Height
3. Depth (or length) - not to be confused with how deep underground a 
mine-shaft can go. Think of Depth (or length if you prefer) as how far 
away you want something to extend.

![Width, Height and Depth][img_whd]

## More shapes

 * `box0( block, width, height, depth )` - creates an empty box (with the
 insides hollowed out - perfect for dwellings. `box0` will remove both
 the floor and ceiling too.
 * `cylinder( block, radius, height )` - creates cylinders, perfect for
 Chimneys.
 * `cylinder0( block, radius, height )` - creates empty cylinders -
 perfect for Towers. `cylinder0` will remove both the floor and
 ceiling too.
 * `prism( block, width, depth )` - creates a Prism - good for roofs.
 * `prism0( block, width, depth )` - creates an empty prism.

## The Drone Object

ScriptCraft is a Minecraft Mod that lets you execute Javascript code
in the game. It also lets you write your own Mod in Javacript. One
such mod that comes bundled with ScriptCraft is called the `Drone`
mod. The `Drone` is an (invsible) object you create every time you
execute any of the building or movement functions. When you execute...

    /js box(5,3,2,4)
   
... a new `Drone` object is created and does the work of building on
your behalf. Think of a `Drone` as something like a remote control
plane that can move about freely and build things for you. Moving the
Drone is easy...

### Movement

 * `up( numberOfBlocks )` - moves the Drone Up. For example: `up()`
   will move the Drone 1 block up. You can tell it how many blocks to
   move if you want it to move more than one block.
 * `down( numberOfBlocks )` - moves the Drone Down. 
 * `left( numberOfBlocks )` - moves the Drone Left.
 * `right( numberOfBlocs )` - moves the Drone Right.
 * `fwd( numberOfBlocs )` - moves the Drone Forward (away from the player).
 * `back( numberOfBlocs )` - moves the Drone Back (towards the player)
 * `turn( numberOfTurns )` - Turns the Drone Clock-wise (right). For example:
   `turn()` will make the Drone turn right 90 degrees. `turn(2)` will
   make the Drone turn twice so that it is facing in the opposite
   direction.

### Chaining - combining building and movement.

You can make a Drone move around before and after building by
*daisy-chaining* the building and movement functions together. In the
game, point at the ground then type the following...

    /js up(1).box( blocks.oak ).fwd(3).box( blocks.oak )
   
A series of 2 boxes is created 3 blocks apart.

![Two Boxes 3 blocks apart][img_2boxes]

### Exercise - Build a simple dwelling

OK. You know enough now about the `Drone` functions to be able to
build a simple dwelling. The dwelling should be a hollow building with
a sloped roof. *Don't worry about doors or windows for now*. The walls
should be made of Cobblestone ('4') and the roof made of wood ('5'). You can use
the following `Drone` functions to create a dwelling 7 blocks wide by
3 blocks high by 6 blocks long with a wooden sloped roof. It's up
to you to figure out how. 

 * `up()` 
 * `box0()`
 * `prism0()`

Your dwelling should end up looking something like this...

![Exercise Dwelling][img_ed]

### Remembering where you started.

Sometimes when you're building something big that requires lots of
manoeuvering by your Drone, you need to leave breadcrumbs as you go so
your `Drone` can return to where it started. Every new Drone has a
`'start'` checkpoint that it can return to by executing
`move('start')` ...

    /js box('5').up(3).left(4).box('1').turn(3).fwd(5).right().box('1').move('start')

... A genius would have trouble figuring out how to get back
to where they started. Fortunately, they don't have to - the
`move('start')` function will take the Drone back to its starting
point. 

 * `chkpt( breadCrumb )` - Leaves a mark at your Drone's current
 location so it can return there later. Think of it as giving a name
 to the place where your Drone is located. `chkpt` is short for
 Check-Point - a place in a game where you usually save your
 progress. 
 
 * `move( breadCrumb )` - Moves your Drone to a location you named
 using `chkpt()` . It brings your Drone back to the place where you
 saved it.
 
Both `chkpt()` and `mark()` are useful for when you want to build
complex things that require your Drone to move about a lot ( for
example, Castles, mansions, palaces, etc).

## Saving your work

You can build cool things using the in-game command-prompt and the
`/js` command but sooner or later you'll probably want to build
something more complex and save your commands so you can run them
again when you quit the game and start it up again.

[Notepad++][np] Is a special text editor (like Notepad which comes
installed on every Windows machine) that is well suited for writing
code. If you don't already have it on your machine, you can [install
Notepad++ here][np]. I recommend using NotePad++ rather than plain old
Notepad because it understands Javascript. If you prefer coding on a
Macintosh, then [TextWrangler][twl] is a good programming editor which
also understands Javascript code.

## Your First Minecraft Mod!

So, You've learnt a little bit about Javascript and what the Drone()
object can do, let's use that knowledge to create a Minecraft Mod!

Once you've installed Notepad++, Launch it, create a new file and type the following...

```javascript
exports.greet = function( player ) {
    echo( player, 'Hi ' + player.name);
}
```

... then save the file in a new directory
`scriptcraft/plugins/{your_name}` (replace
{your_name} with your own name) and call the file `greet.js` (be sure
to change the file-type option to '*.* All Files' when saving or
NotePad++ will add a '.txt' extension to the filename. Now switch back
to the Minecraft game and type...

    /js refresh()

... to reload all of the server plugins. Your mod has just been
loaded. Try it out by typing this command...

    /js greet(self)

... it should display ...

    Hi {your-username-here}

... where {your-username-here} will be replaced with your own
minecraft username. Congratulations - You've just written your very
first Minecraft Mod! With ScriptCraft installed, writing Minecraft
Mods is as simple as writing a new javascript function and saving it
in a file in the scriptcraft/plugins
directory. This function will now be avaible every time you launch
minecraft. This is a deliberately trivial minecraft mod but the
principles are the same when creating more complex mods.

The `exports` variable is a special variable you can use in your mod
to provide functions, objects and variables for others to use. If you
want to provide something for other programmers to use, you should
*export* it using the special `exports` variable. The syntax is
straightforward and you can use the same `exports` variable to export
one or more functions, objects or variables. For example...

#### thrower.js

```javascript
exports.boo = function(player){
  echo( player, 'Boo!');
}
exports.yo = function(player){
  echo( player, 'Yo!');
}
```

... is a plugin which provides 2 javascript functions called `boo()`
and `yo()` which can be invoked from the in-game prompt like
this `/js boo(self)` or `/js yo(self)`.

## Parameters
If you want to change the `greet()` function so that it displays a
greeting other than 'Hi ' you can change the code in the `greet()`
function, or better still, you can use *Parameters*. Parameters are
values you provide to a function so that the function behaves
differently each time it is called. 

![greeting][img_greet]

Change the `greet()` function so that it looks like this...

```javascript
exports.greet = function ( greeting , player) {
    echo( player, greeting + player.name );
}
```

... Save your greet.js file and issue the `/js refresh()` command in
minecraft. Now enter the following command in Minecraft...

    greet('Hello ',self);

... Now try ...

    greet('Dia Dhuit ',self);

... you should see the following messages in your chat window...

    Hello {your name}
    Dia Dhuit {your name}

... Parameters let you provide different values to functions each time
they're called. As you'll see later, Parameters are very useful when
changing the behaviour of MineCraft.

## true or false

Try entering each of the following statements and make a note of the
answers given by minecraft...

    /js 1 < 2

    /js 1 > 2

... the answer given by the first statement ( `1 < 2` ) should be
`true` since 1 is less than 2. The `<` symbol - usually found near the
bottom right of your keyboard - means test to see if something is less
than another so `1 < 2` is a way of asking the computer "is 1 less
than 2 ?". This is a silly example of course since we know 1 is less
than 2 but when dealing with variables we might not know in advance
what its value is or whether it's greater than (bigger) or less than
(smaller) another number or value. The result of the 2nd statement (`1 > 2`) 
should be `false` since 1 is not greater than 2. Now try this...

    /js 1 = 2

... The result won't be what you expected. You'll see an Error message
- that's OK. What's happened here is I've tried to test to see if 1 is
equal to 2 but I've made one of the most common mistakes even
experienced programmers make. If you want to test to see if two things
are the same, you use `==` that's two equals signs right next to each
other. Let's try again...

    /js 1 == 2

... this time you should get an answer `false` since 1 obviously isn't
equal to 2. These are the different *operators* used when comparing
things...

 * `<`  Is less than ?
 * `>`  Is greater than ?
 * `==`  Is equal to ?
 * `<=`  Is less than or equal to ? 
 * `>=`  Is greather than or equal to ?
 * `!=` Is not equal to ?

... try comparing some more numbers yourself - say for example,
compare the ages of your friends or siblings to your own age.

## More fun with `true` or `false`

You can find out if you can Fly in minecraft by typing the following statement ...

    /js self.allowFlight

... the result will be `true` or `false` depending on whether you can
fly or not. You can turn on and off your ability to fly by setting
your `allowFlight` property to `true` or `false`. Try it ...

    /js self.allowFlight = true; 

... Now you can fly! Double-press the space bar key to start flying. To turn off flight ...

    /js self.allowFlight = false;

... and you come crashing down to earth. This is just one example of
how `true` and `false` are used throughout ScriptCraft &ndash; these are
called `boolean` values &ndash; named after [George Boole][boole], a 19th Century
Maths Professor at University College Cork. There are plenty more
examples of boolean values in Minecraft. You can find out if it's
raining in your minecraft world by typing the following statement ...

    /js self.world.hasStorm()

... The result of this statement will be either `false` (if it's not raining) or
`true` (if it *is* raining). If it's raining, you can make it stop raining typing the following command:

    /js self.world.setStorm(false)

... Similarly, to make it start raining you can issue the following command:

    /js self.world.setStorm( true )

### Booleans and JavaBeans

There are many *boolean* properties you can use to turn on or off
certain game behaviours. For example, the *thundering* behavior is turned
on or off using the World's `thundering` property.  The World object's
properties and methods are [documented on the SpigotMC JavaDocs World
page][spworld]. When browsing the SpigotMC JavaDoc pages, whenever
you see a method whose name begins with `is` such as `isThundering()` and
a companion method `setThundering()`, these methods are called *JavaBean*
methods - the *thundering* property is a *JavaBean* property and there
are two ways you can use JavaBean properties in Javascript. You can
*get* and *set* the property using the methods provided by Java. To
*get* the thundering property you can call the JavaBean Method:

    /js self.world.isThundering()

... or you can get the property like this:

    /js self.world.thundering

To *set* the thundering property, you can call the JavaBean method:

    /js self.world.setThundering( true )

... or you can set the property like this:

    /js self.world.thundering = true

Whatever approach you use, the result will be the same. 

[cmworld]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/api/world/World.html
[spworld]: https://hub.spigotmc.org/javadocs/spigot/org/bukkit/World.html

### SIDENOTE
You may be wondering how to change other aspects of the Minecraft game - pretty much all
aspects of the game can be changed. Changes are made using what are
called `API` calls - these are calls to functions and methods in
Minecraft - you can read more about these on the [SpigotMC API
Reference][spigotapi].

## ...and Again, and Again, and Again,...

One of the things Computers are really good at is
repetition. Computers don't get tired or bored of doing the same thing
over and over again.  Loops are handy, if you want to run the same
code over and over again, each time with a different value.  

### Counting to 100

At the in-game command prompt (hint: press 't') type the following then hit Enter...

    /js for (var i = 1 ; i <= 100 ; i = i + 1) { echo( i ); }

... The above code will count from 1 to 100. The first thing you'll
notice if you run the above code is how quickly the count
happened. You're probably curious how long it would take to count to
1000. Try it out for yourself. Change the above line of code so that
it counts to 1000 instead of 100. If you're feeling adventurous, see
how long it takes to count to ten thousand, one hundred thousand or even one million.

The `for` statement is useful when you want to repeat something over and over. It has 4 parts...

 1. The initialiser: `var i = 1` - this happens once at the start of the loop.
 2. The test: `i <= 100` - this happens at the start of each run around the loop. If the test fails, then the loop ends.
 3. The increment: `i = i + 1` - this happens at the end of each run
 around the loop. If you didn't have a statement here, the loop might
 never finish. `i = i + 1` is often written as `i++` - it's shorter
 and does basically the same thing.
 4. The body - everything that appears between the `{` and `}` (opening and closing curly braces).


`for` loops becomes very useful when you combine it with Arrays -
remember, an Array is just a list of things, for example - the players
connnected to a server, the worlds of a server and so on.

### Saying "Hi!" to every player

At the in-game command prompt type the following then hit Enter...

    /js var utils = require('utils');
    /js var players = utils.players();
    /js for (var i = 0;i < players.length; i++){ echo(players[i], 'Hi!'); }

... Lets look at these statements in more detail. We had to enter the
statements on a single line at the in-game command prompt but the
statements could be written like this...

```javascript
var utils = require('utils');
var players = utils.players();
for (var i = 0;i < players.length; i++) { 
  echo(players[i], 'Hi!'); 
}
```

... On the 2nd line, a new variable `players` is created and assigned a value by calling utils.players(). 
On the next line, the for loop is declared, a counter variable `i` is set
to 0 (zero - arrays in javascript start at 0 not 1) and each time
around the loop is tested to see if it's less than the number of
players online. At the end of each run around the loop the `i`
variable is incremented (increased by 1) so that the next player can
be messaged.  Inside the body of the for loop (everything between the
opening `{` and closing `}` curly braces) the `players[i]` expression
refers to the player in the players array at position[i].  Imagine
there are 4 players online on a minecraft server, the `players` array
might look like this...

 * players[0] = 'CrafterJohn'
 * players[1] = 'MinerPaul'
 * players[2] = 'ExplorerRingo'
 * players[3] = 'TraderGeorge'

... in this case `players.length` will be 4 (since there are 4 online
players), the for-loop will go around 4 times starting from position 0
and going all the way up to position 3, sending a message to each of
the players in the array. It's time for a new scriptcraft
function. Open the `hi.js` file you created earlier (using NotePad++ ,
TextWrangler or your editor of choice) and add the following code at
the bottom of the file...

```javascript
var utils = require('utils');
exports.hiAll = function () {
  var players = utils.players();
    player,
    i;
  for ( i = 0; i < players.length; i++) {
    player = players[i];
    echo( player, 'Hi!' );
  }
}
```

... save the file, at the in-game command prompt type `/js refresh()` and
then type `/js hiAll()`. This will send the message `Hi!` to all of
the players connected to your server. You've done this using a `for`
loop and arrays. Arrays and `for` loops are used heavily in all types
of software, in fact there probably isn't any software that doesn't
use `for` loops and Arrays to get things done.

## While Loops

Another way to repeat things over and over is to use a `while`
loop. The following `while` loop counts to 100...

```javascript
var i = 1;
while ( i <= 100 ) {
    console.log( i );
    i = i + 1;
} 
```

A `while` loop will repeat until its condition is `false` - the
condition in the above example is `i <= 100` so while i is less than
or equal to 100 the code within the `while` block (everything between
the starting `{` and ending `}` curly braces) will run. It's important
that you change the variable being tested in a while loop, otherwise
the while loop will never it - it will run forever. Try running the
following code...

    /js var i = 1; while (i <= 100){ echo( i ); }

The code above will contine printing out the number 1 until the end of
time (or until you unplug your computer). That's because the `i`
variable is never incremented (remember - incrementing just means
adding 1 to it) so i will always be 1 and never changes meaning the
loop goes on forever. Again - this is a mistake even experienced programmers sometimes make.

Just like `for` loops, `while` loops can be also be used to loop
through arrays. The following loop prints out all of the players on
the server...

```javascript
var utils = require('utils');
var players = utils.players();
var i = 0;
while ( i < players.length ) {
    console.log( players[i] );
    i = i + 1;
}
```

... whether you chose to use a `for` loop or a `while` loop is largely
a matter of personal taste, `for` loops are more commonly used with
Arrays but as you see from the example above, `while` loops can also
loop over Arrays.

## `utils.foreach()` - Yet another way to process Arrays

Both the `for` statement and `while` statement are standard commonly
used javascript statements used for looping. ScriptCraft also comes
with a special function for looping called `utils.foreach()`.
utils.foreach() is a convenience function, you don't have to use it if
you prefer the syntax of javascript's `for` and `while`
loops. utils.foreach() takes two parameters...

 1. An array 
 2. A function which will be called for each item in the array. 

...that's right, you can pass functions as parameters in javascript!
Let's see it in action, the following code will `console.log()` (print) the
name of each online player in the server console window...

    var utils = require('utils');
    var players = utils.players;
    utils.foreach( players, console.log );

... in the above example, the list of online players is processed one
at a time and each item (player) is passed to the `console.log`
function. Note here that I used `console.log` not `console.log()`. The round braces
() are used to call the function. If I want to pass the function as a
parameter, I just use the function name without the round braces. The
above example uses a named function which already exists ( `console.log` ),
you can also create new functions on-the-fly and pass them to the
utils.foreach() function...

```javascript
/*
  give every player the ability to fly.
*/
var utils = require('utils');
var players = utils.players();
utils.foreach( players, function( player ) { 
  player.capabilities.flying = true;
  player.updateCapabilities();
} );
```

... Another example, this time each player will hear a Cat's Meow...

```javascript
/*
  Play a Cat's Meow sound for each player.
*/
var utils = require('utils');
var players = utils.players();
var sounds = require('sounds');
utils.foreach( players, function( player ) { 
  sounds.entityCatAmbient( player ); // spigot 1.9
  /* canarymod only
    sounds.catMeow( player ); 
  */
} );
```

### Exercise
Try changing the above function so that different sounds are played
instead of a Cat's Meow. To see all of the possible sounds that can be
played, load the sounds module at the in-game prompt using the following statement:

    /js var sounds = require('sounds');

... then type `/js sounds.` and press the TAB key to see a list of all possible sounds.

Loops are a key part of programming in any language. Javascript
provides `for` and `while` statements for looping and many javascript
libraries also provide their own custom looping functions. You should
use what you feel most comfortable with.

## Putting `for` loops to use - Building a Skyscraper

For loops can be used to build enormous structures. In this next
exercise I'm going to use a for loop to build a skyscraper.  This
skyscraper will be made of Glass and Steel (just like most skyscrapers
in real-life).  The first thing to do is see what a single floor of
the skyscraper will look like. Place a block (of any type) where you
want to eventually build the skyscraper, then while your cursor is
pointing at the block, type the following into the in-game prompt...

    /js var drone = box(blocks.iron,20,1,20).up().box0(blocks.glass_pane,20,3,20).up(3)

... you should a large (20x20) iron floor with 3 block high glass all around.

![skyscraper-floor.png][img_ssf]

... A skyscraper with just a single floor isn't much of a skyscraper
so the next step is to repeat this over and over. This is where `for`
loops come in. Open your favorite text editor and create a new file in
your scriptcraft/plugins/{your-name} directory, name the file `myskyscraper.js`, then
type the following code and save:

```javascript
function myskyscraper( floors ) {
  var i ;
  if ( typeof floors == 'undefined' ) {
    floors = 10;
  }
  // bookmark the drone's position so it can return there later
  this.chkpt('myskyscraper'); 
  for ( i = 0; i < floors; i++ ) {
    this
      .box(blocks.iron,20,1,20)
      .up()
      .box0(blocks.glass_pane,20,3,20)
      .up(3);
  }
  // return the drone to where it started
  this.move('myskyscraper'); 
};
var Drone = require('drone'); 
Drone.extend( myskyscraper );
```

So this takes a little explaining. First I create a new function
called myskyscraper that will take a single parameter `floors` so that
when you eventually call the `myskyscraper()` function you can tell it
how many floors you want built. The first statement in the function
`if (typeof floors == 'undefined'){ floors = 10; }` sets floors to 10 if no parameter is
supplied. The next statement `this.chkpt('myskyscraper')` saves
the position of the Drone so it can eventually return to where it
started when finished building (I don't want the drone stranded atop
the skyscraper when it's finished). Then comes the `for` loop. I loop
from 0 to `floors` and each time through the loop I build a single
floor. When the loop is done I return the drone to where it started.
The last 2 lines load the drone module (it must be loaded before I can
add new features to it) and the last line extends the 'Drone' object
so that now it can build skyscrapers among other things.  Once you've
typed in the above code and saved the file, type `/js refresh()` in your
in-game prompt, then type:

     /js myskyscraper(2);

A two-story skyscraper should appear. If you're feeling
adventurous, try a 10 story skyscraper! Or a 20 story skyscraper!
Minecraft has a height limit (256 blocks from bedrock) beyond which
you can't build. If you try to build higher than this then building
will stop at that height.

![skyscraper][img_ss]

I'll leave it as an exercise to the reader to create a city block of
skyscrapers, 5 blocks apart using a for loop.  Once you've figured
that out, creating an entire city of blocks of skyscrapers is the next
logical step. Of course, Minecraft doesn't have the same constraints
as real-world densely populated areas so let your imagination go wild.

## Making Decisions 

All the programs we have seen so far have been fairly predictable - they went 
straight through the statements, and then went back to the beginning again. This is 
not very useful. In practice the computer would be expected to make decisions and 
act accordingly. The javascript statement used for making decisions is `if`. 
While standing on the ground in-game, type the following at the command prompt:

    /js if ( self.onGround ) { echo('You are not flying!'); }

the following message should have appeared on your screen:

    You are not flying!

Now double-tap the `space` bar to start flying in-game (tap the space bar twice in rapid
succession), then press and hold space to rise above the ground. Now
enter the same statement again (If you don't want to type the same
statement again, just press `/` then press the `UP` cursor key on your
keyboard, the statement you entered previously should reappear.

    /js if ( self.onGround ) { echo('You are not flying!'); }

This time no message should appear on your screen.

The `if` statement tests to see if something is `true` or `false` and
if `true` then the block of code between the curly braces ( `{` and
`}` ) is executed - but only if the condition is true.  The condition
in the above example is `!self.onGround` (self is _not_ on ground) which
will be `true` if you are currently flying or `false` if you aren't.

What if you wanted to display a message only if a condition is *not*
true ? For example to only display a message if the player is *not* on the ground:

    /js if ( !self.onGround ) { echo ('You are flying!'); }

This code differs in that now there's a `!` (the exclamation mark)
before `self.onGround`. The `!` symbol negates (returns the opposite of)
whatever follows it.

What if you want to display a message in both cases - whether you're
flying or not? This is where the `if - else` construct comes in handy.
Open your favorite editor and type the following code into a new file
in your scriptcraft/plugins directory...

```javascript
exports.flightStatus = function( player ) {
  if ( player.onGround ) { 
    echo(player, 'You are not flying!' );
  } else {
    echo(player, 'Hey, You are flying!' );
  }
}
```

... now type `/js refresh()` at the in-game prompt then type `/js
flightStatus(self)` and an appropriate message will appear based on
whether or not you're currently flying. Type the `/js flightStatus()`
command while on the ground and while flying. The message displayed in
each case should be different.

## Event-Driven programming

So far we've written code which executes when you invoke the `/js `
command. What if - for example - you want to have some special
behaviour which occurs when a player joins the game? What if you
wanted to display a custom welcome message (in addition to the MotD -
message-of-the-day which is configurable in your server.properties
file) ? This is where *Event-Driven Programming* comes
in. Event-Driven Programming is just a fancy way of saying 'Do this
when that happens' where 'this' is a function you define, and 'that'
is some event which occurs. There are hundreds of events in the
minecraft game...

 * Every time someone joins the server - that's an event!
 * Every time someone breaks a block - that's an event!
 * Every time someone shoots an arrow - that's an event! and so on...

You can write a function which will be called whenever a specific type
of event occurs, it's probably best to illustrate this by example. The
following code sends a message to any player who breaks a block in the
game...

```javascript
function myBlockBreakHook( event ){
  var breaker = event.player;
  echo( breaker, 'You broke a block');
}
events.blockBreak( myBlockBreakHook );
```

The `events.blockBreak()` function is just one of the many `events` functions which can be used to *register* a function to be called whenever a particular type of event occurs. In the
above code the blockBreak function takes as a parameter a function
I want to be called when that event occurs. The function I want called
in turn takes 1 parameter. The `event` object has all the information
about the event which just occurred. I can tell who broke the block
and send a message to the player. The important thing to note is that
the `myBlockBreakHook` function defined above will not be called until a player breaks a
block. Try it - save the above code in a new file in the
`scriptcraft/plugins` directory then type `/js refresh()` to reload
scriptcraft. Then break a block in the game and you should see the
message 'You broke a block'.

There are many types of events you can listen for in Minecraft. You can
browse [all possible event registration functions][spevts2] in the API Reference. 

For custom events (events which aren't in the org.bukkit.event tree)
just specify the fully qualified class name instead. E.g. ...

    events.on ( net.yourdomain.events.YourEvent, function( event ) {
        ...
    });

### Stop listening to events.

If you want an event handler to only execute once, you can remove the handler like this...

```javascript
function myBlockBreakHook( evt ) { 
  var breaker = evt.player;
  echo( breaker, 'You broke a block');
  this.unregister();
} 
events.blockBreak( myBlockBreakHook );
```

The `this.unregister();` statement will remove this function from the
list of listeners for the event. The `this` keyword when used inside
an event handling function refers to a Listener object provided by
ScriptCraft, it has a single method `unregister()` which can be used
to stop listening for events.

To unregister a listener *outside* of the listener function...

```javascript    
function myBlockBreakHook( evt ){
  var breaker = evt.player;
  echo( breaker, 'You broke a block');
}
var myBlockBreakListener = events.blockBreak( myBlockBreakHook );
...
myBlockBreakListener.unregister();
```
## Keeping Score - Lookup tables in Javascript

In the *Event-Driven Programming* section, I defined a function which
displayed a message to players every time they broke a block. Imagine
if I wanted to keep a count of how many blocks each player has broken?
This is where Javascript's Objecct literals come in handy. An object
literal in javascript is simply a way of creating a new Object
on-the-fly in your code. This is an example...

    var myNewObject = { name: 'walter', country: 'Ireland' };

... I created a new object with two properties 'name' and
'country'. The notation used to create this object is called JSON
which is short for JavaScript Object Notation. If I want to find out
the 'country' property of the myNewObject variable there are a few
ways I can do it...

    var playerCountry = myNewObject.country;

... or ...

    var playerCountry = myNewObject['country']

... JavaScript lets you access any object property using either
dot-notation ( `object.property` ) or by index ( `object['property']`
). The result in both cases is the same - playerCountry will be
'Ireland'. When accessing the object by indexing, the property doesn't
even have to be a string literal - it can be a variable like this...

    var propertyName = 'country';
    var propertyValue = myNewObject[propertyName];

... in the above example, the propertyName variable is used when
indexing. What this means is that every object in JavaScript can act
like a lookup table. What's a lookup table? A table you 'look up' of
course. This is a table of names and scores...

    Name            Score
    --------        -----
    walter          5
    tom             6
    jane            8
    bart            7

... If I want to find Jane's score, I look *down* the list of names in
the name column until I find 'jane' then look *across* to get her
score. In Javascript, an object which stored such a table would look
like this...

```javascript
var scoreboard = {
  walter: 5,
  tom:    6,
  jane:   8,
  bart:   7
};
```

... and if I wanted to write a function which took a player name as a
parameter and returned their score, I'd do it like this...

```javascript
function getScore(player){
  return scoreboard[ player ];
}
```

... I might call such a function like this...

```javascript
var janesScore = getScore('jane'); // returns 8
```
    
... putting it all together, a hypothetical scoreboard.js mdoule might
look something like this...

```javascript
var utils = require('utils');
var scores = {};

exports.initialise = function(names){
  scores = {};
  utils.foreach(names, function(name){ 
    scores[name] = 0;
  });
};

/* 
  changes score by diff e.g. to add 6 to the player's current score
  updateScore('walter',6); // walter's new score = 5 + 6 = 11.
*/
exports.updateScore = function(name, diff){
  scores[name] += diff; 
};

exports.getScore = function(name){
  return scores[name];
};
```

## Counting block break events for each player

I can use a Javascript lookup table (a plain old Javascript object) to
keep a count of how many blocks each player has broken ...

#### block-break-counter.js

```javascript
var breaks = {};

/*
  every time a player joins the game reset their block-break-count to 0
*/
function initializeBreakCount( event ){
  breaks[event.player.name] = 0;	 
}
events.playerJoin( initializeBreakCount );

/* 
  every time a player breaks a block increase their block-break-count
*/
function incrementBreakCount( event ){
  breaks[event.player.name] += 1; // add 1
  var breakCount = breaks[event.player.name];
  echo( event.player, 'You broke ' + breakCount + ' blocks');
}
events.blockBreak( incrementBreakCount );
```

With a little more work, you could turn this into a game where players
compete against each other to break as many blocks as possible within
a given time period.

## Next Steps

This guide is meant as a gentle introduction to programming and
modding Minecraft using the Javascript Programming Language.
Javascript is a very powerful and widely-used programming language and
there are many more aspects and features of the language which are not
covered here. If you want to dive deeper into programming and modding
minecraft, I recommend reading the accompanying [ScriptCraft API
reference][api] which covers all of the ScriptCraft functions, objects
and methods. I also recommend reading the source code to some of the
existing scriptcraft plugins, followed by
[Anatomy of a ScriptCraft Plug-in][ap].  The online [SpigotMC API
Reference][spigotapi] provides lots of valuable information about the
different objects and methods available for use by ScriptCraft.


[cmadmin]: https://github.com/walterhiggins/canarymod-admin-guide/
[dlbuk2]: http://dl.bukkit.org/downloads/craftbukkit/
[dlcm]: http://canarymod.net/releases
[bii]: http://wiki.bukkit.org/Setting_up_a_server
[sc-plugin]: http://scriptcraftjs.org/download/
[ce]: http://www.codecademy.com/
[mcdv]: http://www.minecraftwiki.net/wiki/Data_values
[np]: http://notepad-plus-plus.org/
[cbapi]: http://jd.bukkit.org/beta/apidocs/
[cmapi]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/
[spigotapi]: https://hub.spigotmc.org/javadocs/spigot/
[boole]: http://en.wikipedia.org/wiki/George_Boole
[soundapi]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/api/world/effects/SoundEffect.Type.html
[ap]: Anatomy-of-a-Plugin.md
[api]: API-Reference.md
[twl]: http://www.barebones.com/products/textwrangler/
[bkevts]: http://jd.bukkit.org/dev/apidocs/org/bukkit/event/package-summary.html
[cmevts]: https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/hook/package-summary.html
[cmevts2]: API-Reference.md#events-helper-module-canary-version
[spevts2]: API-Reference.md#events-helper-module-spigotmc-version
[img_echo_date]: img/ypgpm_echo_date.png
[img_3d_shapes]: img/ypgpm_3dshapes.jpg
[img_whd]: img/ypgpm_whd.jpg
[img_dv]: img/ypgpm_datavalues.png
[img_ed]: img/ypgpm_ex_dwell.png
[img_2boxes]: img/ypgpm_2boxes.png
[img_cr]: img/ypgpm_mc_cr.png
[img_greet]: img/ypgpm_greet.png
[img_ssf]: img/skyscraper_floor.png
[img_ss]: img/skyscraper.png

