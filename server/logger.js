var winston = require('winston')

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: './Calendar.log' }),
      new winston.transports.Console({format: winston.format.simple()})
    ]
  })

module.exports = logger