var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

var handleGet = function(request,response, pathName){
  pathName = pathName || '/index.html';
  response.writeHead(200,helpers.headers);
  console.log("get request");
  var assetName = archive.paths.siteAssets + pathName;
  // var assetName = archive.paths.siteAssets('/index.html');
  helpers.serveAssets(response, assetName , function(data){
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



exports.handleRequest = function (req, res) {

  var method = req.method;
  if(handleMap[method]){
    handleMap[method](req,res);
  }
  // res.end(archive.paths.list);
};
exports.handleCheck = function(req, res){
  var pathName = helpers.parseUrl(req).pathname;

  if (archive.isUrlInList(pathName)){
    console.log('True in handleCheck');
    handleGet(req, res, pathName);
  }
};
