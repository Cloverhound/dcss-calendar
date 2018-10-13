'use strict';
module.exports = function() {
  var path = require('path');
  return function urlNotFound(req, res, next) {
    let reactIndex = path.resolve('client_src/dist/index.html');
    res.sendFile(reactIndex, function(err) {
      if (err) {
        console.error(err);
        res.status(err.status).end();
      }
    });
  };
};
