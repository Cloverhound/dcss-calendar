const { winston, createLogger, format, transports   } = require('winston');
const { combine, timestamp, label, printf, prettyPrint, simple } = format;
require('winston-daily-rotate-file');
var LoopBackContext = require('loopback-context');
var moment = require('moment-timezone')

var transport = new (transports.DailyRotateFile)({
  filename: 'Calendar-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '60d',
  dirname: process.env.LOGS_STORAGE_PATH,
});

const winstonLogger = createLogger({
    format: combine(
      // timestamp(),
      simple()
    ),
    transports: [
      transport
    ]
  })

var formatMessage = function(req) {
  let currentTime = moment().tz(process.env.TIME_ZONE).format("YYYY-MM-DD h:mm:ss a")
  var ctx = LoopBackContext.getCurrentContext();
  let newMessage = ctx && ctx.get('reqId') ? ctx.get('reqId') + " -- " + currentTime + " -- " + req : req;
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