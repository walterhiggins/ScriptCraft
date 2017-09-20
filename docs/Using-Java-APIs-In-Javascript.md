# Using Java APIs in Javascript

ScriptCraft uses the Javascript Engine bundled with Java 6 and later
versions. This means that all of the core Java classes can be used
from within ScriptCraft. In addition, all of the Bukkit API can be
used from Javascript too. There are some things to consider when using
Java classes in Javascript...

## Using Java Beans

The Javascript Engine bundled with Java comes with a handy notation
for accessing and modifying Java Beans. A Java Bean is any Java class
which uses a `get{Property}()` method to retrieve an object's property
and a `set{Property}()` method to set the object's property. One
example of a Java Bean in the [Bukkit API][bukapi] is the
[org.bukkit.entity.Player][bukpl] Class which has many methods which
conform to the JavaBean specification.

For example the [Player.getWalkSpeed()][bukplws] can be used to get a
player's walking speed. In Java you would have to write code like this
to obtain the walking speed...

    float walkingSpeed = player.getWalkSpeed();

... however, in Javascript you can access the walking-speed property
using the more succinct...

    var walkingspeed = player.walkSpeed;

... or if you prefer to use Java-style access...

    var walkingspeed = player.getWalkSpeed();

... I personally prefer to use the simpler `player.walkSpeed` because
it is easier to read. The important thing to remember when using the
Bukkit (or any Java API) from Javascript is that for any Java Bean, a
property called `propertyName` will have a getter called
`getPropertyName()` and a setter called `setPropertyName()`. From this
rule you can infer what any Bukkit class properties are. For example,
the [Bukkit Player][bukpl] object has the following methods...

 * float getWalkSpeed()
 * void setWalkSpeed(float speed)

... so from this you can infer that every Player object has a
`walkSpeed` property which can be read and changed. For example you
can triple your own walking speed (from the default 0.2) at the
in-game prompt using the following command...

    /js self.walkSpeed = self.walkSpeed * 3;

... If we were limited to using Java's notation we would have had to
write `/js self.setWalkSpeed( self.getWalkSpeed() * 3 )` . Since
almost every class in the Bukkit API is also a JavaBean you can access
properties of properties and so on. For example, to get the name of
the world in which a player is located...

    /js self.location.world.name

... is more concise than `/js self.getLocation().getWorld().getName()`. 
If you're new to Java and the [Bukkit API][bukapi] is the first time
you've browsed Java documentation, you may be wondering where the
`location` property came from - the `location` property is "inherited"
from one of the Player class's super-classes (it's ancestors). You'll see the
`getLocation()` method listed under a section titled **Methods
inherited from interface org.bukkit.entity.Entity** in the
[Player][bukpl] javadoc page.

## Using java.lang package classes

In Java the following code will print out the `user.dir` and
`user.timezone` properties...

    System.out.println( System.getProperty( "user.dir" ) );
    System.out.println( System.getProperty( "user.timezone" ) );

... In Java, any classes in the `java.lang` package don't need to be
prefixed with the package so the `java.lang.System` class can simply
be written as `System`. However, in Javascript classes in the
`java.lang` package need to be fully qualified so you need to write...

    println( java.lang.System.getProperty( "user.dir" ) );
    println( java.lang.System.getProperty( "user.timezone" ) );

... the `println()` function is one of the default functions provided
by the JS Engine in Java so there is no need to add the class name
prefix, but for other System class methods you need to explicitly
include the package name e.g. `java.lang.`. If you are using the
System class in a number of statements you can save yourself some
typing by declaring a System variable and using that instead of the
fully-qualified package and class name...

    var System = java.lang.System;
    println( System.getProperty( "user.dir" ) );
    println( System.getProperty( "user.timezone" ) );

The JS Engine provides an `importPackage()` function which can be used
to import packages. This also saves you having to type full package
names before classes. For example...

    importPackage(java.util);
    var hMap = new HashMap();
    hMap.put('name','Walter');

... makes all of the classes in the Java Library's `java.util` package
available for use without having to use the `java.util`
prefix. However, importing the `java.lang` package is not recommended
as some of the java.lang classes (e.g. String, Object) conflict with
Javascript Object types.

## Summary

When writing modules or plugins in ScriptCraft, you can access and
change JavaBean properties using a simple .{propertyName} notation
instead of using the Java .get{PropertyName}() and .set{PropertyName()
methods. This results in more concise code. This simpler notation is
provided by the Javascript Engine embedded in Java 6 and later
versions. Javascript does not have access to private members, the
.{propertyName} notation is automagically converted to the appropriate
.get{PropertyName}() or .set{PropertyName}() method by Java.

[bukapi]: http://jd.bukkit.org/beta/apidocs/
[bukpl]: http://jd.bukkit.org/beta/apidocs/org/bukkit/entity/Player.html
[bukplws]: http://jd.bukkit.org/beta/apidocs/org/bukkit/entity/Player.html#getWalkSpeed()
[buksrv]: http://jd.bukkit.org/beta/apidocs/org/bukkit/Server.html

