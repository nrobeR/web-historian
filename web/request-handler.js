var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

var handleGet = function(request,response, pathName){
  pathName = pathName || (archive.paths.siteAssets + '/index.html');
  response.writeHead(200,helpers.headers);
  helpers.serveAssets(response, pathName , function(data){
    response.end(data);
  });
};

var handlePost = function(request,response){
  response.writeHead(201,helpers.headers);
  response.end(JSON.stringify(request));
};



var handleOptions = function(request,reponse){
  response.writeHead(200,helpers.headers);
  reponse.end("options ok");
};

var handleMap = {
  'GET': handleGet,
  'POST': handlePost,
  'OPTIONS': handleOptions
};

exports.throw404 = function(req,res){
  res.writeHead(404,helpers.headers);
  res.end('404');
}

exports.handleRequest = function (req, res, pathName) {

  var method = req.method;
  if(handleMap[method]){
    handleMap[method](req,res,pathName);
  }
  // res.end(archive.paths.list);
};


