exports.isJavaObject = function( o ) {
  if (o === global){
    return false;
  }
  if (o !== undefined && o !== null){
    return o.getClass ? true : false;
  }
  return o instanceof java.lang.Object;
};
