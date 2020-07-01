var blocks=require('./blocks.js');
console.log(blocks.oak);

console.log(blocks.material(5));
console.log(blocks.material('6:3'));
console.log(blocks.material('125:5'));
console.log(blocks.material('5'));
console.log(blocks.material(98));
console.log(blocks.material('35:0'), blocks.wool.white);
console.log(blocks.material('35:15'), blocks.wool.black);
console.log(blocks.material(64));
