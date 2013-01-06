//
// files in this folder only work with CraftBukkit servers
//
// This example script shows how the special 'self' variable can be used
// to get information about the current player. 
//
// Usage:  
// In minecraft, press the / key to display the in-game command prompt
// type the following...
// 
//     /js cb_hello()
//
// ... and the game will print "Hello <minecraft user name>" 
//
function cb_hello()
{
	 print("Hello " + self.name);
}
