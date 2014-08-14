var http = require("http");
var handler = require("./request-handler");
var helpers = require('./http-helpers.js');
var archiveManager = require('./archiveManager');

var port = 8080;
var ip = "127.0.0.1";

var routeMap = {
  '/': handler.handleRequest,
  'check' : archiveManager.handleCheck,
  '404': handler.throw404
}

var server = http.createServer(function(request,response){
  var path = helpers.parseUrl(request).pathname;
  console.log("path: " + path);
    if(routeMap[path]){
      routeMap[path](request,response);
      // routeMap[path](request,response,"./public/loading.html");
    }else if(helpers.checkIfPathIsURL(path)){
      routeMap['check'](request, response);
    }
    else{
      routeMap['404'](request,response);
    }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
