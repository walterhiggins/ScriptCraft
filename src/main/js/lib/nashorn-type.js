/*
 The .class operator causes problems for non-nashorn Java on Mac OS X and some other 
 environments. So need to have it in a separate module which should only be loaded in
 nashorn environment.
*/
module.exports = function(t){
  return t.class;
};
