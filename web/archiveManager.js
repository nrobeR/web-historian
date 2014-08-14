var helpers = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var handler = require('./request-handler');

exports.handleCheck = function(req, res){

  //Queries Archive for target
  var pathName =  helpers.parseUrl(req).pathname;
  archive.readListOfUrls(function(data){
    //Serves target if found
    if (archive.isUrlInList(pathName, data)){
      handler.handleRequest(req, res, archive.paths.archivedSites+pathName);
    //Triggers Load, Calls to Fetch
    }else{
      handler.handleRequest(req,res,archive.paths.siteAssets+'/loading.html');
      archive.downloadUrls(pathName);
    }

  });


};


//get(url, pathofWherewewanttoSave, writetoList(target));

