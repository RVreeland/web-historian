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

  var assetPathName = '';

  if (asset === 'index.html') {
    assetPathName = __dirname + "/public/index.html";
  } //else if (/*if sites.txt has asset listed*/) {
    // assetPathName = __dirname + "../archives/sites/" + asset;
  // } else {
    // append asset to sites.txt
    // add html file to sites folder
 // }
  fs.readFile(assetPathName, 'utf8', function(err, assetData) {
    // console.log(assetData);
    res.end(assetData);
  });


};



// As you progress, keep thinking about what helper functions you can put here!
