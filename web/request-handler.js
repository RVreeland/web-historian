var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var http = require('http');
var urlParser = require('url');
// require more modules/folders here!
// var http = require('http-request');
//
var actions = {
  'GET': function(req, res) {
    var parts = urlParser.parse(req.url);
    var urlEndpoint = parts.pathname === '/' ? '/index.html' : parts.pathname;

    helpers.serveAssets(response, urlPath, function(){
      archive.isUrlInList(urlPath.slice(1), function(found){
        if( found ){ // yes:
          // redirect to loading
          helpers.sendRedirect(response, '/loading.html');
        } else {
          // 404
          helpers.send404(response);
        }
      });
    });
  },
  'POST': function(req, res) {
    helpers.getData(req, res);
  }
};



exports.handleRequest = function (req, res) {

// archive.readListOfUrls();
archive.isUrlInList('www.google.com', function(result) {
  console.log(result);
});
// archive.isUrlInList('www.aol.com');

  if (actions[req.method]) {
    actions[req.method](req, res);
  } else {
    // send 404;
  }

  // helpers.serveAssets(res, 'www.google.com');
  // res.end(archive.paths.list);
};

