var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var validUrl = require('valid-url');

exports.parseUrl = function(request){
  var parsedUrl = url.parse(request.url);
  return parsedUrl;
}

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(asset, function(err, data){
    // console.log("fs fired");
    if(err){
      console.log(err);
    } else {
      callback(data);
      // res.end(data)
    }
  });
};

exports.checkIfPathIsURL = function(path){
//figure out real parsing
  if (path === '/arglebargle'){
    return false;
  }
  console.log(validUrl.isHttpUri('http://' + path.slice(1)));
  return !!validUrl.isHttpUri('http://' + path.slice(1));
}

// As you progress, keep thinking about what helper functions you can put here!
