const { winston, createLogger, format, transports   } = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = format;
require('winston-daily-rotate-file');

var transport = new (transports.DailyRotateFile)({
  filename: 'Calendar-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '60d',
  dirname: process.env.LOGS_STORAGE_PATH,
  json: true
});

const logger = createLogger({
    format: combine(
      timestamp(),
      prettyPrint(),
      format.json()
    ),
    transports: [
      transport
    ]
  })

module.exports = logger