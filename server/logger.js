const { winston, createLogger, format, transports   } = require('winston');
const { combine, timestamp, label, printf, prettyPrint, simple } = format;
require('winston-daily-rotate-file');

var transport = new (transports.DailyRotateFile)({
  filename: 'Calendar-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '60d',
  dirname: process.env.LOGS_STORAGE_PATH,
});

const logger = createLogger({
    format: combine(
      timestamp(),
      simple()
    ),
    transports: [
      transport
    ]
  })

module.exports = logger