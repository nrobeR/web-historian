var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.readListOfUrls = function(){
};

exports.isUrlInList = function(pathName){
  var results = false;
  var archiveName = exports.paths.archivedSites + pathName;
  fs.readFile(exports.paths.list, function(err, data){
    var arr = data.toString().split("\n");
    console.log(arr);
    arr.forEach(function(site){
      console.log("path name " + pathName.slice(1));
      console.log("site name " + site);
      if( site === pathName.slice(1)){
        results = true;
        console.log(results);
      }
    });
  })
  console.log('results at point of return = ' + results);
  return results;
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
