# The Young Person's Guide to Programming in Minecraft
## 2013/01/08 17:26

## Draft

### Introduction

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

### Installation

CraftBukkit is a version of the Minecraft server software which allows
easy addition of 'Mods' and extensions to Minecraft. ScriptCraft is a
'Mod' for use with CraftBukkit.  Adding Mods to Minecraft can be
difficult but CraftBukkit makes it easy.  Follow these steps to
Install ScriptCraft on your computer...

1. [Download and install CraftBukkit][dlbuk].

2. [Download the ScriptCraft Mod][sc-plugin]. Then copy it to the
`craftbukkit/plugins` folder you created in step 1.

3. Start the CraftBukkit server.

4. In the CraftBukkit command window type `op {your_username}` and hit
enter, replacing {your_username} with your own minecraft
username. This will give you `operator` access meaning you can perform
more commands than are normally available in Minecraft.

5. In the CraftBukkit command window type `js 1 + 1` and hit enter. You should see `> 2` .

... Congratulations! You just installed your own Minecraft Server with 
the ScriptCraft Mod and are now ready to begin programming in Minecraft.

Normally, Minecraft Mods are written in Java. This makes writing your 
own extension or game rules difficult because you must first learn Java. 
Java is different enough from Javascript. With the ScriptCraft plug-in 
installed, you don't have to learn Java, you can extend and customize 
Minecraft your way using Javascript. Javascript is easier to learn than 
Java but it's also more flexible and powerful and is used for creating 
interactive web sites and many other applications.

### Learning Javascript

To begin creating cool stuff in Minecraft using ScriptCraft, you don't 
*have* to know much JavaScript. ScriptCraft comes with lots of functions 
to help you create buildings of any size, and lets you experiment while 
you play. However, as you learn Javascript you will be able to create 
cooler stuff in Minecraft - not just buildings, you'll be able to add 
new rules and items to the game - even create mini-games for you and 
your friends. If you want to get started learning JavaScript, check out 
this [fun Javascript Tutorial][ce]. If you want to dive right in to 
ScriptCraft, read on...

### First Steps

If you don't already know Javascript, don't worry, you'll learn a little 
about Programming and Javascript along the way. You've set up a 
Minecraft server and are ready to connect ...

1. Launch Minecraft (keep the Bukkit Command window open). 
2. Click 'Multi-Player'
3. Click 'Add Server'
4. Type any name you like in the name field then type `localhost` in the 
address field. `localhost` is a special internet address that points to 
your own computer.
5. Click 'Join Server' to join the craftbukkit server.
6. Once you've joined the game, press the `/` key located at the bottom 
right of your keyboard. A prompt will appear. Type the following then 
press enter: `js 1 + 1` The number 2 should be displayed. 

... Well Done! You've just confirmed you can run Javascript code from
within the Minecraft Console. 

### Variables

A variable is how you name something for the computer (and you the 
programmer) to remember. You create a new variable in Javascript using 
the `var` keyword...

    /js var location = "Blackrock Castle"

... creates a new variable called `location` and stores the text 
`Blackrock Castle` in it. Now the computer has a new item in its memory 
called `location`. We can use that name like this...

    /js echo( location )

... and the following is displayed...

    Blackrock Castle

...You might be wondering where the `""` (called double-quotes) went. 
When telling the computer to store some text, you have to put `"` 
(that's the double-quote character - press Shift+2) at the start and end 
of the text. The computer doesn't store these quote characters, only the 
text between them. The computer will store the variables while the 
Minecraft Server is running. Repeat the last command you entered by 
pressing the `/` key then the UP arrow key on your keyboard, then 
pressing enter. You can repeat that statement as many times as you like 
and the computer will always display the same value. You can change the 
value like this...

    /js location = "Mahon Point"

...notice this time I didn't use the `var` keyword. I didn't need to. 
The `var` keyword is only needed when you first create the variable. Now 
execute this command...

    /js echo( location ) 

...and it displays...

    Mahon Point

Variables can be created and changed easily in Javascript. Along with 
the variables you'll create in your in-game commands and scripts, there 
are handy variables created for you by ScriptCraft. One such variable is 
`self`, it contains information about the current player...

    /js echo ( self )
    
... displays the following...

    CraftPlayer{name=walterh}

... for me but the message displayed will be different for every player.

### Functions

ScriptCraft comes with a couple of extra functions not normally found in 
Javascript. These functions will help you build new structures and 
buildings which would otherwise take hours to build by hand. Before 
looking at the building functions let's look at the `echo()` function.

`echo()` - as its name implies - will echo back at you whatever you
tell it. For example, type ...
   
    /js echo('Hello')

... and the game will display...

    Hello

... type ...

    /js echo( 5 + 7 )

... and the game will display...

    12    

... While you can now use Minecraft to help with Maths homework - I 
don't recommend it. Homework and Minecraft don't mix! The `echo()` 
function will display anything you tell it to - Text, Numbers and other types...

    /js echo( new Date() )

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
Minecraft Modder :-) There are many functions for working with Text,
numbers and dates in Javascript...

    /js Math.random()
   
... prints out a random number every time you call it. Try it! Then press
the `/` key then the UP Arrow key to repeat the last statement in your
in-game console. You'll see the number displayed is different each
time. Think of Math.random() as a Dice with many many sides. You can
rely on it to never return the same value twice.

### Building stuff in Minecraft

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

    /js box("5")

... This will change the targeted block to wood. What's happened here is 
the `box()` function has created a single new wooden block. The text 
`"5"` is taken by Minecraft to mean Wood. You can see many more 
materials and the number Minecraft uses for them by visiting the 
[Minecraft Data Values][mcdv] site.  

### Common Block Materials

In Minecraft Programming, Materials aren't known by their name,
instead numbers (sometimes 2 numbers) are used to indicate which
material should be used. For example the number 2 is grass, 1 is
cobblestone etc, while 5 is wood (oak). There are different types of
wood so the text "5:1" means Spruce, "5:2" means Birch and "5:3" means
Jungle wood. There are many different materials in the Minecraft world, the most
commonly used materials for building are:

 * "4" - Cobblestone 
 * "5" - Wooden Planks
 * "5:2" - Birch wood Planks (light wood)
 * "98" - Stone bricks
 * "45" - Red bricks
 * "68" - Doors
 * "102" - Glass panes (for windows)
   
For reference, here is a chart of all of the blocks (not items) in the Minecraft
world...

![Minecraft Data Values][img_dv]

### Dimensions

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

### More shapes

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

### The Drone Object

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

#### Chaining - combining bulding and movement.

You can make a Drone move around before and after building by
*daisy-chaining* the building and movement functions together. In the
game, point at the ground then type the following...

    /js up(1).box(5).fwd(3).box(5)
   
A series of 2 boxes is created 3 blocks apart.

![Two Boxes 3 blocks apart][img_2boxes]

### Excercise - Build a simple dwelling

OK. You know enough now about the `Drone` functions to be able to
build a simple dwelling. The dwelling should be a hollow building with
a sloped roof. *Don't worry about doors or windows for now*. The walls
should be made of Cobblestone ("4") and the roof made of wood ("5"). You can use
the following `Drone` functions to create a dwelling 7 blocks wide by
3 blocks high by 6 blocks long with a wooden sloped roof. It's up
to you to figure out how. 

 * `up()` 
 * `box0()`
 * `prism0()`

Your dwelling should end up looking something like this...

![Excercise Dwelling][img_ed]

### Remembering where you started.

Sometimes when you're building something big that requires lots of
manoeuvering by your Drone, you need to leave breadcrumbs as you go so
your `Drone` can return to where it started. Every new Drone has a
`"start"` checkpoint that it can return to by executing
`move("start")` ...

    /js box("5").up(3).left(4).box("1").turn(3).fwd(5).right().box("1").move("start")

... A genius would have trouble figuring out how to get back
to where they started. Fortunately, they don't have to - the
`move("start")` function will take the Drone back to its starting
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

### Saving your work

You can build cool things using the in-game command-prompt and the
`/js` command but sooner or later you'll probably want to build
something more complex and save your commands so you can run them
again when you quit the game and start it up again.

[Notepad++][np] Is a special text editor (like Notepad which comes
installed on every Windows machine) that is well suited for writing
code. If you don't already have it on your machine, you can [install
Notepad++ here][np]. I recommend using NotePad++ rather than plain old
Notepad because it understands Javascript.

### Your First Minecraft Mod!

So, You've learnt a little bit about Javascript and what the Drone()
object can do, let's use that knowledge to create a Minecraft Mod!

Once you've installed Notepad++, Launch it, create a new file and type the following...

    function greet(){
        echo("Hi " + self.name);
    }

... then save the file in a new directory
`craftbukkit/js-plugins/{your_name}` (replace {your_name} with your
own name) and call the file `greet.js` (be sure to change the file-type
option to '*.* All Files' when saving or NotePad++ will add a '.txt'
extension to the filename. Now switch back to the Minecraft game and
type...

    /reload

... to reload all of the server plugins. Your mod has just been loaded. Try it out by typing this command...

    /js greet()

... it should display ...

    Hi {your-username-here}

... where {your-username-here} will be replaced with your own
minecraft username. Congratulations - You've just written your very
first Minecraft Mod! With ScriptCraft installed, writing Minecraft
Mods is as simple as writing a new javascript function and saving it
in a file in the js-plugins directory. This function will now be
avaible every time you launch minecraft.

#### Parameters
If you want to change the `greet()` function so that it displays a
greeting other than "Hi " you can change the code in the `greet()`
function, or better still, you can use *Parameters*. Parameters are
values you provide to a function so that the function behaves
differently each time it is called. 

![greeting][img_greet]

Change the `greet()` function so that it looks like this...

    function greet( greeting ) {
        echo( greeting + self.name );
    }

... Save your greet.js file and issue the /reload command in
minecraft. Now enter the following command in Minecraft...

    greet("Hello ");

... Now try ...

    greet("Dia Dhuit ");

... you should see the following messages in your chat window...

    Hello {your name}
    Dia Dhuit {your name}

... Parameters let you provide different values to functions each time
they're called. As you'll see later, Parameters are very useful when
changing the behaviour of MineCraft.

### true or false

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

#### More fun with `true` or `false`
You can find out if you can Fly in minecraft by typing the following statement...

    /js self.allowFlight 

... the result will be `true` or `false` depending on whether you can
fly or not. You can turn on and off your ability to fly by setting
your `allowFlight` property to `true` or `false`. Try it...

    /js self.allowFlight = true

... Now you can fly! To turn off flight...

    /js self.allowFlight = false

... and you come crashing down to earth. This is just one example of
how `true` and `false` are used throughout ScriptCraft - these are
called `boolean` values - named after [George Boole][boole], a 19th Century
Maths Professor at University College Cork. There are plenty more
examples of boolean values in Minecraft. You can find out if monsters
are allowed in your minecraft world by typing the following
statement...

    /js self.location.world.allowMonsters

... The result of this statement will be either `false` (Phew!) or
`true` (Yikes!) depending on how your server has been
configured. However, typing the following statement doesn't work as
expected...

    /js self.location.world.allowMonsters = true

... This statement won't work as expected - it will give an Error
message. This is because sometimes we can read variables but we can't
change them the same way we read them (this is because of how
Javascript, Java and the CraftBukkit API work together). To turn on or
off the spawning of monsters, type the following...

    /js self.location.world.setSpawnFlags(false, true)

... the `setSpawnFlags()` method takes 2 parameters, the first
parameter says whether or not monsters can spawn, and the 2nd says
whether or not Animals can spawn. (SIDENOTE: You may be wondering how
to change other aspects of the Minecraft game - pretty much all
aspects of the game can be changed. Changes are made using what are
called `API` calls - these are calls to functions and methods in
Minecraft - you can read more about these on the [CraftBukkit API
Reference][cbapi].)

### ...and Again, and Again, and Again,...

One of the things Computers are really good at is
repetition. Computers don't get tired or bored of doing the same thing
over and over again.  Loops are handy, if you want to run the same
code over and over again, each time with a different value.  

#### Counting to 100

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

#### Saying "Hi!" to every player

At the in-game command prompt type the following then hit Enter...

    /js for (var i = 0;i < server.onlinePlayers.length; i++){ server.onlinePlayers[i].sendMessage("Hi!"); }

... Lets look at these statements in more detail. We had to enter the
statements on a single line at the in-game command prompt but the
statements could be written like this...

    var players = server.onlinePlayers;
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        player.sendMessage("Hi!");
    }

... On the first line, a new variable `players` is created from the
server object's onlinePlayers property. `players` is more concise and
easier to type than the long-winded `server.onlinePlayers`.  On the
second line, the for loop is declared, a counter variable `i` is set
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

    function hiAll(){
        var players = server.onlinePlayers;
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            player.sendMessage("Hi!");
        }
    }

... save the file, at the in-game command prompt type `reload` and
then type `/js hiAll()`. This will send the message `Hi!` to all of
the players connected to your server. You've done this using a `for`
loop and arrays. Arrays and `for` loops are used heavily in all types
of software, in fact there probably isn't any software that doesn't
use `for` loops and Arrays to get things done.

#### While Loops

Another way to repeat things over and over is to use a `while`
loop. The following `while` loop counts to 100...

    var i = 1;
    while (i <= 100){
        echo( i );
        i = i + 1;
    } 

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

    var players = server.onlinePlayers;
    var i = 0;
    while ( i < players.length ) {
        echo( players[i] );
        i = i + 1;
    }

... whether you chose to use a `for` loop or a `while` loop is largely
a matter of personal taste, `for` loops are more commonly used with
Arrays but as you see from the example above, `while` loops can also
loop over Arrays.

#### `utils.foreach()` - Yet another way to process Arrays

Both the `for` statement and `while` statement are standard commonly
used javascript statements used for looping. ScriptCraft also comes
with a special function for looping called `utils.foreach()`.
utils.foreach() is a convenience function, you don't have to use it if
you prefer the syntax of javascript's `for` and `while`
loops. utils.foreach() takes two parameters...

 1. An array 
 2. A function which will be called for each item in the array. 

...that's right, you can pass functions as parameters in javascript!
Let's see it in action, the following code will `echo()` (print) the
name of each online player...

    utils.foreach( server.onlinePlayers, echo );

... in the above example, the list of online players is processed one
at a time and each item (player) is passed to the `echo`
function. Note here that I used `echo` not `echo()`. The round braces
() are used to call the function. If I want to pass the function as a
parameter, I just use the function name without the round braces. The
above example uses a named function which already exists ( `echo` ),
you can also create new functions on-the-fly and pass them to the
utils.foreach() function...

    /*
      give every player the ability to fly.
    */
    utils.foreach( server.onlinePlayers, 
                   function (player) { 
                       player.setAllowFlight(true); 
                   }
    );

... Another example, this time each player will hear a Cat's Meow...

    /*
      Play a Cat's Meow sound for each player.
    */
    utils.foreach( server.onlinePlayers, 
                   function (player) { 
                       player.playSound(player.location, 
                                        org.bukkit.Sound.CAT_MEOW,
                                        1,
                                        1);

                   }
    );

#### Exercise
Try changing the above function so that different sounds are played
instead of a Cat's Meow.  You'll need to lookup the [CraftBukkit API's
Sound class][soundapi] to see all of the possible sounds that can be
played.

Loops are a key part of programming in any language. Javascript
provides `for` and `while` statements for looping and many javascript
libraries also provide their own custom looping functions. You should
use what you feel most comfortable with.

#### Putting `for` loops to use - Building a Skyscraper

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
your js-plugins/{your-name} directory called `myskyscraper.js`, then
type the following...

    function skyscraper(floors)
    {
        floors = floors || 10; // default number of floors is 10
        this.chkpt('skyscraper'); // saves the drone position so it can return there later
        for (var i = 0; i < floors; i++)
        {
            this.box(blocks.iron,20,1,20).up().box0(blocks.glass_pane,20,3,20).up(3);
        }
        return this.move('skyscraper'); // return to where we started
    };

    load("../drone/drone.js");
    Drone.extend('skyscraper',skyscraper);

... so this takes a little explaining. First I create a new function
called skyscraper that will take a single parameter `floors` so that
when you eventually call the `skyscraper()` function you can tell it
how many floors you want built. The first statement in the function
`floors = floors || 10;` just sets floors to 10 if no parameter is
supplied. The next statement `this.chkpt('myskyscraper')` just saves
the position of the Drone so it can eventually return to where it
started when finished building (I don't want the drone stranded atop
the skyscraper when it's finished). Then comes the `for` loop. I loop
from 0 to `floors` and each time through the loop I build a single
floor. When the loop is done I return the drone to where it started.
The last 2 lines load the drone module (it must be loaded before I can
add new features to it) and the last line extends the 'Drone' object
so that now it can build skyscrapers among other things.  Once you've
typed in the above code and saved the file, type `reload` in your
in-game prompt, then type ...

     /js skyscraper(2);

... A two-story skyscraper should appear. If you're feeling
adventurous, try a 10 story skyscraper! Or a 20 story skyscraper!
Minecraft has a height limit (256 blocks from bedrock) beyond which
you can't build. If you try to build higher than this then building
will stop at that height.

![skyscraper][img_ss]

TODO
### Making Decisions
TODO

#### if then else
TODO

[buk]: http://wiki.bukkit.org/Setting_up_a_server
[dlbuk]: http://dl.bukkit.org/
[sc-plugin]: files/scriptcraft/
[ce]: http://www.codecademy.com/
[mcdv]: http://www.minecraftwiki.net/wiki/Data_values
[np]: http://notepad-plus-plus.org/
[cbapi]: http://jd.bukkit.org/beta/apidocs/
[boole]: http://en.wikipedia.org/wiki/George_Boole
[soundapi]: http://jd.bukkit.org/beta/apidocs/org/bukkit/Sound.html

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

## Categories
Minecraft, Programming, ScriptCraft
