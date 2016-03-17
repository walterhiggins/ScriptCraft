'use strict';

var nashorn = typeof Java !== 'undefined';

var isJavaObject = require('java-utils').isJavaObject;

// Ugly hack using Nashorn internals, to make the REPL friendlier when faced with overloaded methods
function inspectJavaMethod(method, indent) {
  if (!nashorn) {
    return null;
  }

  var beans = Packages.jdk.internal.dynalink.beans,
      DynamicMethod = beans.DynamicMethod['class'],
      OverloadedDynamicMethod = beans.OverloadedDynamicMethod['class'];

  if (!DynamicMethod.isInstance(method)) {
    return null;
  }

  if (OverloadedDynamicMethod.isInstance(method)) {
    var subindent = indent + '  ';

    var methodsField = OverloadedDynamicMethod.getDeclaredField('methods');
    methodsField.accessible = true;

    var methods = Java.from(methodsField.get(method));

    return '[\n' +
      methods.map(function (method) {
        return subindent + inspectJavaMethod(method, subindent);
      }).join(',\n') + '\n' + indent + ']';
  }

  var nameProperty = DynamicMethod.getDeclaredMethod('getName');
  nameProperty.accessible = true;
  return nameProperty.invoke(method);
}

function inspectJavaCollection(obj, indent) {
  if (!nashorn) {
    return null;
  }

  try {
    if (obj instanceof java.util.Collection
        || (obj['class'] && obj['class'].array)) {
      return inspect(Java.from(obj), indent);
    }
  } catch(e) {
    return ''+e;
  }
  return null;
}

function inspectJavaMap(obj, indent) {
  if (obj instanceof java.util.Map) {
    var asObject = {};
    obj.forEach(function (k, v) { asObject[k] = v; });
    return inspect(asObject, indent);
  }
}

function inspectJavaObject(obj, indent) {
  return inspectJavaMethod(obj, indent)
    || inspectJavaCollection(obj, indent)
    || inspectJavaMap(obj, indent)
    || ('' + obj);
}

function inspect(obj, indent) {
  if (obj === null) {
    return 'null'.gray() + ''.reset();;
  }
  if (typeof indent === 'undefined') {
    indent = '';
  }
  var subindent = indent + '  ';
  if (typeof obj === 'undefined') {
    return 'undefined'.gray() + ''.reset();
  } else if (isJavaObject(obj)) {
    return inspectJavaObject(obj, indent).green() + ''.reset();
  } else if (typeof obj === 'function') {
    return obj.toString().blue() + ''.reset();
  } else if (obj instanceof String || typeof obj === 'string') {
    return ('"' + (''+obj).replace(/"/g,'\\"') + '"').purple() + ''.reset();
  } else if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    } else {
      return '[\n' +
        obj.map(function(v) {
          return subindent + inspect(v, subindent);
        }).join(',\n') + '\n' + indent + ']';
    }
  } else if (typeof obj === 'object' && obj.toString === Object.prototype.toString) {
    if (Object.keys(obj).length === 0) {
      return '{}';
    } else {
      return '{\n' +
        Object.keys(obj).map(function(k) {
          return subindent + k + ': ' + inspect(obj[k], subindent);
        }).join(',\n')
        + '\n' + indent + '}';
    }
  } else {
    return ('' + obj).purple() + ''.reset();
  }
}

module.exports = inspect;
