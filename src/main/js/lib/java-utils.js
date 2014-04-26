exports.isJavaObject = function( o ) {
  if (o === global){
    return false;
  }
  return o instanceof java.lang.Object;
};
