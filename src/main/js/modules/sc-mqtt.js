'use strict';
/*************************************************************************
## sc-mqtt module

This module provides a simple way to communicate with devices (such as Arduino)
using the popular lightweight [MQTT protocol][mqtt].

### Usage

This module can only be used if the separate `sc-mqtt.jar` file is
present in the CraftBukkit classpath. To use this module, you should
...

 1. Download sc-mqtt.jar from <http://scriptcraftjs.org/download/extras/>
 2. Save the file to the same directory where craftbukkit.jar resides.
 3. Create a new batch file (windows-only) called
    craftbukkit-sc-mqtt.bat and edit it to include the following
    command...

    ```sh
    java -classpath sc-mqtt.jar;craftbukkit.jar org.bukkit.craftbukkit.Main
    ```

    If you're using Mac OS, create a new craftbukkit-sc-mqtt.command
    file and edit it (using TextWrangler or another text editor) ...

    ```sh
    java -classpath sc-mqtt.jar:craftbukkit.jar org.bukkit.craftbukkit.Main
    ```

 4. Execute the craftbukkit-sc-mqtt batch file / command file to start
    Craftbukkit. You can now begin using this module to send and receive
    messages to/from a Net-enabled Arduino or any other device which uses
    the [MQTT protocol][mqtt]
  
    ```javascript
    var mqtt = require('sc-mqtt');
    // create a new client
    var client = mqtt.client( 'tcp://localhost:1883', 'uniqueClientId' );
    // connect to the broker 
    client.connect( { keepAliveInterval: 15 } );
    //  publish a message to the broker
    client.publish( 'minecraft', 'loaded' );
    // subscribe to messages on 'arduino' topic 
    client.subscribe( 'arduino' );
    //  do something when an incoming message arrives...
    client.onMessageArrived( function( topic, message ) {
        console.log( 'Message arrived: topic=' + topic + ', message=' + message );
    });

    ```

The `sc-mqtt` module provides a very simple minimal wrapper around the
[Eclipse Paho MQTT Version 3 Client][pahodocs] java-based MQTT
library.

[pahodocs]: http://pic.dhe.ibm.com/infocenter/wmqv7/v7r5/index.jsp?topic=/com.ibm.mq.javadoc.doc/WMQMQxrClasses/org/eclipse/paho/client/mqttv3/package-summary.html
[mqtt]: http://mqtt.org/

***/
var MISSING_MQTT = '\nMissing class org.walterhiggins.scriptcraft.ScriptCraftMqttCallback.\n' +
  'Make sure sc-mqtt.jar is in the classpath.\n' + 
  'See http://github.com/walterhiggins/scriptcraft-extras-mqtt for details.\n';

function Client( brokerUrl, clientId ) {

  var Callback = org.walterhiggins.scriptcraft.ScriptCraftMqttCallback;
  var MqttClient = org.eclipse.paho.client.mqttv3.MqttClient;

  var callback = new Callback(
    function( err ) {
      console.log( 'connectionLost: ' + err );
    },
    function( topic, message ) {
      console.log( 'messageArrived ' + topic + '> ' + message );
    },
    function( token ) {
      console.log( 'deliveryComplete:' + token );
    }
  );
  
  if ( !brokerUrl ) {
    brokerUrl = 'tcp://localhost:1883';
  }
  if ( !clientId ) {
    clientId = 'scriptcraft' + new Date().getTime();
  }
  var client = new MqttClient( brokerUrl, clientId, null );
  client.setCallback( callback );
  return {
    connect: function( options ) {
      if ( typeof options === 'undefined' ) {
        client.connect();
      }else{
        client.connect(options);
      }
      return client;
    },

    disconnect: function( quiesceTimeout ) {
      if ( typeof quiesceTimeout == 'undefined' ) {
        client.disconnect();
      } else {
        client.disconnect( quiesceTimeout );
      }
      return client;
    },

    publish: function( topic, message, qos, retained ) {
      if ( typeof message == 'string' ) {
        message = new java.lang.String( message ).bytes;
      }
      if (typeof qos == 'undefined'){
        qos = 1;
      }
      if (typeof retained == 'undefined'){
        retained = false;
      }
      client.publish( topic, message,qos, retained );
      return client;
    },

    subscribe: function( topic ) {
      client.subscribe( topic );
      return client;
    },

    unsubscribe: function( topic ) {
      client.unsubscribe( topic );
      return client;
    },

    onMessageArrived: function( fn ) {
      callback.setMesgArrived( fn );
      return client;
    },

    onDeliveryComplete: function( fn ) {
      callback.setDeliveryComplete( fn );
      return client;
    },

    onConnectionLost: function( fn ) {
      callback.setConnLost( fn );
      return client;
    }
  };
}
/*
 Return a new MQTT Client
*/
exports.client = function( brokerUrl, clientId, options ) {
  if ( typeof org.walterhiggins.scriptcraft.ScriptCraftMqttCallback != 'function' ) {
    throw MISSING_MQTT;
  }
  return new Client( brokerUrl, clientId, options );
};

