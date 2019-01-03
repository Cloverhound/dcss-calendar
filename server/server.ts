'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path')
var app = module.exports = loopback();
require('dotenv').config();



var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',  extended: true }))
app.use(multer().any());
app.use(bodyParser.json())
var logger = function(req, res, next) {
  let body = JSON.stringify(req.body, null, 2)
  if(Object.keys(body).length > 0 ) {
    if(body != '{}') {
      console.log('http body', body);
    }
  }
  
  next(); // Passing the request to the next handler in the stack.
}
app.use(logger);
app.use(loopback.static(path.resolve(__dirname, './storage'))); 

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
