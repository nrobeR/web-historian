var http = require("http");
var handler = require("./request-handler");
var helpers = require('./http-helpers.js');

var port = 8080;
var ip = "127.0.0.1";

var routeMap = {
  '/': handler.handleRequest,
  'check' : handler.handleCheck
}

var server = http.createServer(function(request,response){
  var path = helpers.parseUrl(request).pathname;
  console.log("path: " + path);
  if(routeMap[path]){
    routeMap[path](request,response);
  }else{
    routeMap['check'](request, response);
  }

});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

