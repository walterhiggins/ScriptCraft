var global = this;

var logger = {
  info: function(message) {
    java.lang.System.out.println('[INFO] ' + message);
  },
  debug: function(message) {
    //java.lang.System.out.println('[DEBUG] ' + message);
  }
};

(function() {
  var FileReader = java.io.FileReader;
  var configRequire = engine.eval(new FileReader("src/main/js/lib/require.js"));
  var requireHooks = {
    loading: function( path ) {
      logger.debug( 'loading ' + path );
    },
    loaded: function( path ) {
      logger.debug( 'loaded  ' + path );
    }
  };
  var evaluator = function(code) {
    return engine.eval(code);
  };

  global.require = configRequire("src/main/js",
      ["src/main/js/lib/", "src/main/js/modules/"],
      requireHooks, evaluator);

  global.scload = function(file) {
    var buffered = new java.io.BufferedReader(new FileReader(file));
    var code = '';
    try {
      while ( (line = buffered.readLine()) !== null ) {
        code += line + '\n';
      }
    }
    finally {
      buffered.close();
    }
    return engine.eval('(' + code + ')');
  }

  global.__plugin = {
    bukkit: true
  };

  global.setTimeout = function() {
    logger.debug("ignoring setTimeout");
  };

  global.addUnloadHandler = function() {
    logger.debug("ignoring addUnloadHandler");
  };
}());

function assertEqual(expected, actual) {
  var expected = JSON.stringify(expected);
  var actual = JSON.stringify(actual);
  if (actual !== expected) {
    throw new Error("Expected " + expected + ", got " + actual + " instead.");
  }
}

function runTests() {
  var testsRun = 0;

  function execute_test(test) {
    var testName = test.name;
    logger.info(testName);
    testsRun++;
    try {
      test();
      return true;
    } catch(e) {
      java.lang.System.err.println("Test '" + testName + "' failed!");
      java.lang.System.err.println(e.stack);
      return false;
    }
  }

  var tests = Object.keys(global).filter(function(name){
    return /^test/.test(name);
  }).map(function(name) {
    return global[name];
  });

  var success = tests.map(execute_test).every(function(r){return r;});

  java.lang.System.out.println(testsRun + " tests run.");

  java.lang.System.exit(success ? 0 : 1);
}

var Drone = require("src/main/js/modules/drone/index.js");

function testDroneWithoutArgumentUsesSelfAsPlayer() {
  global.self = {name: 'joe', location:{ x:10, y:15, z:20 }};
  var drone = new Drone();
  assertEqual([10, 15, 23], [drone.x, drone.y, drone.z]);
}

function testDroneGivenAPlayerWithoutMouseNorDirectionTakesLocationFromPlayerAndAdds3ToZ() {
  var player = {name: 'joe', location:{ x:10, y:15, z:20 }};
  var drone = new Drone(player);
  assertEqual([10, 15, 23], [drone.x, drone.y, drone.z]);
}

function testDroneGivenAPlayerWithoutMouseLookingNorthTakesLocationFromPlayerAndSubtracts3FromZ() {
  var anAngleThatLookNorth = 180;
  var player = {name: 'joe', location:{ x:10, y:15, z:20, yaw: anAngleThatLookNorth }};
  var drone = new Drone(player);
  assertEqual([10, 15, 17], [drone.x, drone.y, drone.z]);
}

runTests();
