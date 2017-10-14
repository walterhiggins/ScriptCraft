/*************************************************************************
## Http Module

For handling http requests. Not to be confused with the more robust
and functional 'http' module bundled with Node.js.

### http.request() function

The http.request() function will fetch a web address asynchronously (on a
separate thread)and pass the URL's response to a callback function
which will be executed synchronously (on the main thread).  In this
way, http.request() can be used to fetch web content without blocking the
main thread of execution.

#### Parameters

 * request: The request details either a plain URL e.g. "http://scriptcraft.js/sample.json" or an object with the following properties...

   - url: The URL of the request.
   - method: Should be one of the standard HTTP methods, GET, POST, PUT, DELETE (defaults to GET).
   - params: A Javascript object with name-value pairs. This is for supplying parameters to the server.

 * callback: The function to be called when the Web request has completed. This function takes the following parameters...
   - responseCode: The numeric response code from the server. If the server did not respond with 200 OK then the response parameter will be undefined.
   - response: A string (if the response is of type text) or object containing the HTTP response body.

#### Example

The following example illustrates how to use http.request to make a request to a JSON web service and evaluate its response...

```javascript
var jsResponse;
var http = require('http');
http.request('http://scriptcraftjs.org/sample.json',function(responseCode, responseBody){
  jsResponse = JSON.parse( responseBody );
});
```
The following example illustrates a more complex use-case POSTing parameters to a CGI process on a server...

```javascript
var http = require('http');
http.request( {
    url: 'http://pixenate.com/pixenate/pxn8.pl',
    method: 'POST',
    params: {script: '[]'}
  },
  function( responseCode, responseBody ) {
    var jsObj = JSON.parse( responseBody );
  });
```

***/

/*global exports, encodeURI, server, __plugin, setTimeout*/
function paramsToString( params ) {
  var result = '',
    paramNames = [],
    i;
  for ( i in params ) {
    paramNames.push( i );
  }
  for ( i = 0; i < paramNames.length; i++ ) {
    result += paramNames[i] + '=' + encodeURI( params[ paramNames[i] ] );
    if ( i < paramNames.length-1 )
      result += '&';
  }
  return result;
}
function invokeNow( fn ){
  if (__plugin.bukkit){
    server.scheduler.runTask( __plugin, fn);
    return;
  }
  if (__plugin.canary){
    fn();
    return;
  }
}
function invokeLater( fn ){
  if (__plugin.bukkit){
    server.scheduler.runTaskAsynchronously( __plugin, fn);
    return;
  }
  if (__plugin.canary){
    setTimeout(fn,20);
    return;
  }
}
exports.request = function( request, callback ) {
  invokeLater( function() {
    var url, paramsAsString, conn, requestMethod;
    if (typeof request === 'string'){
      url = request;
      requestMethod = 'GET';
    }else{
      url = request.url;
      paramsAsString = paramsToString( request.params );
      if ( request.method ) {
        requestMethod = request.method;
      } else {
        requestMethod = 'GET';
      }
      if ( requestMethod == 'GET' && request.params ) {
        // append each parameter to the URL
        url = request.url + '?' + paramsAsString;
      }
    }
    conn = new java.net.URL( url ).openConnection();
    conn.requestMethod = requestMethod;
    conn.doOutput = true;
    conn.instanceFollowRedirects = false;

    if ( conn.requestMethod == 'POST' ) {
      conn.doInput = true;
      // put each parameter in the outputstream
      conn.setRequestProperty('Content-Type', 'application/x-www-form-urlencoded');
      conn.setRequestProperty('charset', 'utf-8');
      conn.setRequestProperty('Content-Length', '' + paramsAsString.length);
      conn.useCaches =false ;
      var wr = new java.io.DataOutputStream(conn.getOutputStream ());
      wr.writeBytes(paramsAsString);
      wr.flush();
      wr.close();
    }
    var rc = conn.responseCode;
    var response;
    var stream;
    if ( rc == 200 ) {
      stream = conn.getInputStream();
      response = new java.util.Scanner( stream ).useDelimiter('\\A').next();
    }
    invokeNow( function( ) {
      callback( rc, response );
    });
  });

};
