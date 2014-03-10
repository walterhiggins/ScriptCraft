// Maze generation based on http://rosettacode.org/wiki/Maze_generation#JavaScript

var Drone = require('../drone').Drone;

function maze_make(x,y) {
	var n=x*y-1;
	if (n<0) {
		echo("illegal maze dimensions");
		return ({x: 0, y: 0});
	}
	var horiz=[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
	var verti=[]; for (var j= 0; j<y+1; j++) verti[j]= [];
	var here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
	var path= [here];
	var unvisited= [];
	for (var j= 0; j<x+2; j++) {
		unvisited[j]= [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors= [];
		for (var j= 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n= n-1;
			next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here= next);
		} else 
			here= path.pop();
	}
	return ({x: x, y: y, horiz: horiz, verti: verti});
}

function maze_display(m) {
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
		if (0 == j%2)
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4) 
					line[k]= '+';
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
						line[k]= ' ';
					else
						line[k]= '-';
		else
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4)
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
						line[k]= ' ';
					else
						line[k]= '|';
				else
					line[k]= ' ';
		if (0 == j) line[1]= line[2]= line[3]= ' ';
		if (m.x*2-1 == j) line[4*m.y]= ' ';
		text.push(line.join('')+' \r\n'); // TWEAKED: space added to get an even number of columns
	}
	return text.join('');
}

// ScriptCraft stuff starts here
// Helper function to parse the ASCII art into Drone actions
// You might also consider creating a new maze_display but for now this will do the work
function maze_draw(maze_string, d) {
	// d is the Drone to use
	d.up().chkpt('maze-start');
	for (var j = 0; j < maze_string.length; j += 2) {
		switch(maze_string.substr(j, 2)) {
		case '  ':
			d.box(0).fwd(); // Make sure to empty this position
			break;
		case '\r\n':
			d.move('maze-start');
			d.right().chkpt('maze-start');
			break;
		default: // '+ ', '+-', '--', '| '
			if (j == 0) {
				d.box(blocks.glowstone); // highlight the maze entry and exit
			} else if (j == maze_string.length - 4) {
				d.box(blocks.glass);
			} else {
				d.box(blocks.oak);
			}
			d.fwd();
		}
	}
}

// User-facing code starts here
// Example: Try /js amazing(5,7)
Drone.extend('amazing', function(size_x, size_y) {
	m = maze_make(size_x, size_y);
	if (m.x > 0 && m.y > 0) {
		maze_draw(maze_display(m), this);
	}
});

