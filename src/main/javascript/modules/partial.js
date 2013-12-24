/**
* Create a partial function
*
* Parameters:
*  func - base function
*  [remaining arguments] - arguments bound to the partial function
*/
module.exports = function (func /*, 0..n args */) {
   var args = Array.prototype.slice.call(arguments, 1);
   return function() {
      var allArguments = args.concat(Array.prototype.slice.call(arguments));
      return func.apply(this, allArguments);
   };
}
