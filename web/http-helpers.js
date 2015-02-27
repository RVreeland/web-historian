var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

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
  console.log('in serveAssets');
  res.writeHead(200, headers);
  fs.readFile(asset, 'utf8', function(err, assetData) {
    res.end(assetData);
  });
};

// exports.checkAssets = function(res, asset, callback) {
//   var assetPathName = '';
//   console.log('in checkAssets');
//   if (archive.isUrlInList(asset) && archive.isUrlArchived(asset)) {
//     assetPathName = archive.paths.archivedSites + asset;
//     module.exports.serveAssets(res, assetPathName, callback);
//   } else if (archive.isUrlInList(asset) && !archive.isUrlArchived(asset)) {
//     //redirect to loading page
//     res.statusCode = 302;
//     res.redirect('/public/loading.html');
//   } else {
//     // append asset to sites.txt
//     // add html file to sites folder
//   }
// };

exports.getData = function(req, res, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    data = data.slice(4);
    callback(data);
  });
};

exports.sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(obj);
};

exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

exports.send404 = function(response){
  exports.sendResponse(response, '404: Page not found', 404);
};



// As you progress, keep thinking about what helper functions you can put here!
