var path = require('path');
var archive = require('../helpers/archive-helpers');
// var http = require('http-request');
var helpers = require('./http-helpers.js');
var http = require('http');
var urlParser = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  // pull out pathname from req.url
  var parts = urlParser.parse(req.url);
  // .pathname or .href
  var endpoint = parts.pathname;
  var asset = '';

  if (endpoint === '/') {
    asset = 'index.html';
  }

  res.writeHead(200, headers);
  helpers.serveAssets(res, asset);


  // helpers.serveAssets(res, 'www.google.com');
  // res.end(archive.paths.list);
};


// save the response to file with a progress callback
// http.get({
//   url: '/',
//   progress: function (current, total) {
//     console.log('downloaded %d bytes from %d', current, total);
//   }
// }, 'get.bin', function (err, res) {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(res.code, res.headers, res.file);
// });
