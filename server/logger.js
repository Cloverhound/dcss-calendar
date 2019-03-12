const { winston, createLogger, format, transports   } = require('winston');
const { combine, timestamp, label, printf, prettyPrint, align, padLevels, json} = format;
require('winston-daily-rotate-file');
var getNamespace = require('continuation-local-storage').getNamespace;

var transport = new (transports.DailyRotateFile)({
  filename: 'Calendar-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '60d',
  dirname: process.env.LOGS_STORAGE_PATH,
  // json: true
});

const winstonLogger = createLogger({
    format: combine(
      timestamp(),
      // prettyPrint(),
      // align(),
      json(),
      // padLevels()
    ),
    transports: [
      transport
    ]
  })

  

  // Wrap Winston logger to print reqId in each log
var formatMessage = function(req) {
  var myRequest = getNamespace('my request');
  console.log('myRequest LOGGER', myRequest.active);
  
  req = 'Http ' + req.method + ' Request by ' + req.login + ' to ' + req.url + " " + "with "
  // req = {"method": req.method, "user": req.user}
  let newMessage = myRequest && myRequest.get('reqId') ? req + "reqId: " + myRequest.get('reqId') : req;
  return newMessage;
};

var logger = {
  log: function(level, message) {
      winstonLogger.log(level, formatMessage(message));
  },
  error: function(message) {
      winstonLogger.error(formatMessage(message));
  },
  warn: function(message) {
      winstonLogger.warn(formatMessage(message));
  },
  verbose: function(message) {
      winstonLogger.verbose(formatMessage(message));
  },
  info: function(message) {
      winstonLogger.info(formatMessage(message));
  },
  debug: function(message) {
      winstonLogger.debug(formatMessage(message));
  },
  silly: function(message) {
      winstonLogger.silly(formatMessage(message));
  }
};

module.exports = logger