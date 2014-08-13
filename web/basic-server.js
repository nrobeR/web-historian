var http = require("http");
var handler = require("./request-handler");
var helpers = require('./http-helpers.js');

var port = 8080;
var ip = "127.0.0.1";

var routeMap = {
  '/': handler.handleRequest
}

var server = http.createServer(function(request,reponse){
  var path = helpers.parseHelper(request).pathname;
  console.log("path: " + path);
  if(routeMap[path]){
    routeMap[path](request,response);
  }

});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

