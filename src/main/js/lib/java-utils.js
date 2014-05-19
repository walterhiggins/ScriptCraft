exports.isJavaObject = function( o ) {
  if (o === global){
    return false;
  }
  if (o !== undefined && o !== null){
    try { 
      // this throws error for java objects in jre7
      if (typeof o.constructor === 'function'){
        return false;
      }
    } catch (e){
      return true;
    }
    try {
      var result = o.getClass ? true : false; // throws error for Enums/Class in jre7
      if (result == true){
        return result;
      }
    }catch (e2){
      // fail silently and move on to next test
    }
    // java classes don't have a getClass so just because .getClass isn't present
    // doesn't mean it's not a Java Enum or Class (.getClass only works for object instances?)
    if (o instanceof java.lang.Object){
      return true;
    }
  }
  return o instanceof java.lang.Object;
};
