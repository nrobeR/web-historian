var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

var handleGet = function(request,response){
  response.writeHead(200,helpers.headers);
  console.log("get request");
  response.end('<input');
};

var handlePost = function(request,response){
  response.writeHead(201,helpers.headers);
  response.end('POST');
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



exports.handleRequest = function (req, res) {

  var method = req.method;
  if(handleMap[method]){
    handleMap[method](req,res);
  }
  res.end(archive.paths.list);
};
