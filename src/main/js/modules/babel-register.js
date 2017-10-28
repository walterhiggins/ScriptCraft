var babel = require('babel');
function xform(code){
  return babel.transform(code, { presets: ['es2015'] }).code;
}
var len = global._evalHooks.length;
var registered = false;
for (var i =0;i < len; i++){
  if (global._evalHooks[i] === xform){
    registered = true;
    break;
  }
}
if (!registered){
  global._evalHooks.unshift(xform);
}


