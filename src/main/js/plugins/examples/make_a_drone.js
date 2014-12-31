/* File: make_a_drone.js

An ultra simple scriptcraft plugin that creates a global drone named d
Copy this script to your scriptcraft plugins\examples directory so it automatically loads after scriptcraft loads
On my machine that directory was C:\Users\user\Downloads\scriptcraft\plugins\examples   
The script also reports to the console when loading so you can see console messages as the script loads

You can verify that this script loaded correctly by typing commands such as these on your minecraft client command line:

/js d.toString()      // show the drone's position
/js d.up(1)           // move the drone one block up
/js d.y               // show the drone's vertical position again
/js d.y=100           // change the drone's yposition to 100
/js d.box(1)          // change the block at (x,y,z) into stone
/js d.box(0)          // change the block at (x,y,z) into air

Important: If you type /js.[TAB]  (where [TAB] means "press Tab key") you will see all the possible options for drone.

Okay, below are the three lines of code - actually it's only one line, the other two lines are simply console messages:
	
*/	

console.log("XXX make_a_drone.js: Starting module.") // A console message right when the script starts loading

exports.d = new Drone(1,2,3,4,0) // This is the one actual line of code that creates the new drone

console.log("XXX make_a_drone.js: Drone d created. " + exports.d.toString())  // Use the drone's built-in function toString() to create a drone position report

// End-of-file make_a_drone.js
