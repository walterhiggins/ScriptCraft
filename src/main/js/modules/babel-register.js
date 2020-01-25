var babel = require('babel');
function xform(code) {
  return babel.transform(code, { presets: ['es2015'] }).code;
}
function xformVerbose(code) {
  var js = babel.transform(code, { presets: ['es2015'] }).code;
  console.log(js);
  return js;
}
var len = global._moduleHooks.length;
var registered = false;
for (var i = 0; i < len; i++) {
  if (global._moduleHooks[i] === xform) {
    registered = true;
    break;
  }
}
if (!registered) {
  global._moduleHooks.unshift(xform);
  global._replHooks.unshift(xformVerbose);
}
