var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

var handleGet = function(request,response, pathName){
  pathName = pathName || (archive.paths.siteAssets + '/index.html');
  response.writeHead(200,helpers.headers);
  console.log("get request");
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



exports.handleRequest = function (req, res) {

  var method = req.method;
  if(handleMap[method]){
    handleMap[method](req,res);
  }
  // res.end(archive.paths.list);
};
exports.handleCheck = function(req, res){
  console.log('handleCheck fired');
  var pathName =  helpers.parseUrl(req).pathname;
  archive.readListOfUrls(function(data){
    console.log('handleCheck call to readList fired');
    console.log(data.toString());
    if (archive.isUrlInList(pathName, data)){
      handleGet(req, res, archive.paths.archivedSites+pathName);
    }
  });
};
