Drone.extend('sphere', function(block,radius)
{
	 var lastRadius = radius;
	 var slices = [[radius,0]];
	 var diameter = radius*2;
	 for (var i = 0; i <= radius;i++){
		  var newRadius = Math.round(Math.sqrt(radius*radius - i*i));
		  if (newRadius == lastRadius)
				slices[slices.length-1][1]++;
		  else
				slices.push([newRadius,1]);
		  lastRadius = newRadius;
	 }
	 this.chkpt('sphere');
	 //
	 // mid section
	 //
	 this.up(radius - slices[0][1])
		  .cylinder(block,radius,(slices[0][1]*2)-1)
		  .down(radius-slices[0][1]);
	 
	 var yOffset = -1;
	 for (var i = 1; i < slices.length;i++){
		  yOffset += slices[i-1][1];
		  var sr = slices[i][0];
		  var sh = slices[i][1];
		  // northern hemisphere
		  this.up(radius + yOffset).fwd(radius-sr).right(radius-sr)
				.cylinder(block,sr,sh)
				.left(radius - sr).back( radius - sr). down(radius + yOffset);
		  // southern hemisphere
		  this.up(radius - (yOffset+sh+1)).fwd(radius-sr).right(radius-sr)
				.cylinder(block,sr,sh)
				.left(radius - sr).back( radius - sr). down(radius - (yOffset+sh+1));
	 }
	 return this.move('sphere');
});
//
// sphere0 creates an empty sphere but the code needs work
// - there are gaps in the sphere due to rasterization.
//
Drone.extend('sphere0', function(block,radius)
{
	 var lastRadius = radius;
	 var slices = [[radius,0]];
	 var diameter = radius*2;
	 for (var i = 0; i <= radius;i++){
		  var newRadius = Math.round(Math.sqrt(radius*radius - i*i));
		  if (newRadius == lastRadius)
				slices[slices.length-1][1]++;
		  else
				slices.push([newRadius,1]);
		  lastRadius = newRadius;
	 }
	 this.chkpt('sphere0');
	 //
	 // mid section
	 //
	 this.up(radius - slices[0][1])
		  .cylinder0(block,radius,(slices[0][1]*2)-1)
		  .down(radius-slices[0][1]);
	 
	 var yOffset = -1;
	 for (var i = 1; i < slices.length;i++){
		  yOffset += slices[i-1][1];
		  var sr = slices[i][0];
		  var sh = slices[i][1];

		  // northern hemisphere
		  this.up(radius + yOffset).fwd(radius-sr).right(radius-sr)
				.cylinder0(block,sr,sh)
				.left(radius - sr).back( radius - sr). down(radius + yOffset);

		  // southern hemisphere
		  this.up(radius - (yOffset+sh+1)).fwd(radius-sr).right(radius-sr)
				.cylinder0(block,sr,sh)
				.left(radius - sr).back( radius - sr). down(radius - (yOffset+sh+1));
	 }
	 return this.move('sphere0');
});
