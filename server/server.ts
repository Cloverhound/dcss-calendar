'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path')
var app = module.exports = loopback();
require('dotenv').config()
var logger = require('./logger')
var creds = require("../config")
var moment = require('moment-timezone')

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',  extended: true }))
app.use(multer().any());
app.use(bodyParser.json())
var httpLogger = function(req, res, next) {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')
  logger.info('Http ' + req.method + ' Request by ' + login + ' to ' + req.url)

  let body = JSON.stringify(req.body, null, 0)
  if(Object.keys(body).length > 0 ) {
    if(body != '{}') {
      logger.info("body: " + body);
    }
  }
  
  next(); 
}
app.use(httpLogger);
app.use(loopback.static(path.resolve(__dirname, './storage'))); 

const basicAuthParser = require('basic-auth')

var basicAuth = function (req, res, next) {
  const user = basicAuthParser(req)
  const validUser = (user &&
                  user.name === creds.userName1 &&
                  user.pass === creds.password1)||
				  (user &&
                  user.name === creds.userName2 &&
                  user.pass === creds.password2)||
				  (user &&
                  user.name === creds.userName3 &&
                  user.pass === creds.password3)||
				  (user &&
                  user.name === creds.userName4 &&
                  user.pass === creds.password4)||
				  (user &&
                  user.name === creds.userName5 &&
                  user.pass === creds.password5)||
				  (user &&
                  user.name === creds.userName6 &&
                  user.pass === creds.password6)||
				  (user &&
                  user.name === creds.userName7 &&
                  user.pass === creds.password7)

  if (!validUser) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    return res.sendStatus(401)
  } 
  


  next()
}

app.use(basicAuth);
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    console.log('🔥🔥process.env.TIME_ZONE', process.env.TIME_ZONE);
    console.log('moment time', moment().tz(process.env.TIME_ZONE));
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
