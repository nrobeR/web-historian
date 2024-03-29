var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http_request = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};
//site assests - Our Stuff
//archived - Archives
//list - list of keys/sites we have already
// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, data){
    if (err){
      console.log('ReadListofUrls: ' + err);
    }else{
      callback(data);
    }
  });
};

exports.isUrlInList = function(targetPath, listData){
  return listData.toString().split("\n").some(function(site){
    return site === targetPath.slice(1);
  });
};

exports.addUrlToList = function(target){
  fs.appendFile(exports.paths.list, '\n' + target, function(err){
    console.log('AddUrlToList fire');
    if (err){console.log('Error in AddURLToList')}
  });
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(targetpath){
  console.log('downloadUrls fire');
  var filePath = exports.paths.archivedSites+targetpath;
  http_request.get(targetpath.slice(1),filePath,function(data){
    exports.addUrlToList(targetpath.slice(1));
  });
};
