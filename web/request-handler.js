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
    helpers.getData(req, function(url) {
      archive.isUrlInList(url, function(found) {
        if( found ){ // yes:
          // check to see if archived
          archive.isUrlArchived(url, function(exists) {
            if( exists ) { // yes:
              // redirect to scraped page
              helpers.sendRedirect(response, '/'+url);
            } else { // no:
              //redirect to loading page
              helpers.sendRedirect(response, '/loading.html');
            }
          });
        } else { // no:
          // append to list of sites
          archive.addUrlToList(url, function() {
            // redirect to loading page
            response.sendRedirect(response, '/loading.html');
          });
        }
      });
    });
  }
};


exports.handleRequest = function (req, res) {
  if (actions[req.method]) {
    actions[req.method](req, res);
  } else {
    helpers.send404(res);    // send 404;
  }
};

