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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  //read sites.txt (list of all urls that have been requested)
  fs.readFile('../archives/sites.txt', {encoding:'utf8'}, function(err, data) {
    callback(data.toString('utf8'));
  });
};

exports.isUrlInList = function(url, callback){
  //determines whether a specific url is in the sites.txt file
  exports.readListOfUrls(function(list) {
    var list = list.split('\n');
    for (var i = 0; i < list.length; i++) {
      if (list[i] === url) {
        callback(true);
      }
    }
    callback(false);
  });
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, url+'\n', function(err, file) {
    callback();
  });
};

exports.isUrlArchived = function(url, callback){
  // using path module, join all files in site folder
  var sitePath = path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(){
  //if not archived, url will be fetched and downloaded
};
