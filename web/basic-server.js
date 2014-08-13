var http = require("http");
var handler = require("./request-handler");
var url = require('url');

var port = 8080;
var ip = "127.0.0.1";

var routeMap = {
  '/': handler.handleRequest
}

var server = http.createServer(function(request,reponse){
  var parsedUrl = url.parse(request.url);
  var path = parsedUrl.pathname;
  if(routeMap[path]){
    routeMap[path](request,response);
  }

});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

