'use strict'
var moment = require('moment-timezone')
var logger = require('../../server/logger')

module.exports = function(Holiday) {
  Holiday.validatesUniquenessOf('name', {message: 'Name already exists'})
  //TODO: Should this.date be converted to just a date or PST?
  Holiday.prototype.isToday = function() {
    console.log('Checking if holiday is today', this.date)
    logger.info('Checking if holiday is today', this.date)
    let currentTime = moment().tz(process.env.TIME_ZONE)
    return currentTime.isSame(this.date, 'day')
  }

}
