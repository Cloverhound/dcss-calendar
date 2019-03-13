'use strict'
var moment = require('moment-timezone')
var logger = require('../../server/logger')

module.exports = function(RecurringTimeRange) {

  RecurringTimeRange.prototype.isNow = function() {
    logger.info('Checking if recurring time range is now', this)
    
    let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    let currentTime = moment().tz(process.env.TIME_ZONE)

    let currentDay = days[currentTime.format('d')]
    
    if(!this[currentDay]) {
        return false
    }

    let start = moment(this.start, 'h:mm a').tz(process.env.TIME_ZONE, true)
    let end = moment(this.end, 'h:mm a').tz(process.env.TIME_ZONE, true)
    logger.info('recurring start, end', start.format("YYYY-MM-DD h:mm a"), end.format("YYYY-MM-DD h:mm a"));
    

    let isBetween = currentTime.isBetween(start, end)
    logger.info('recurring isBetween', isBetween)
    
    return isBetween
}

  RecurringTimeRange.prototype.isClosing = function() {
    logger.info('Checking if recurring time range is closing', this)
    let days = ['sun', 'mon', 'tues', 'weds', 'thurs', 'fri', 'sat']
    let currentTime = moment().tz(process.env.TIME_ZONE)
    let currentDay = days[currentTime.format('d')]
    
    if(!this[currentDay]) {
        return false
    }

    let start = moment.tz(this.start, 'HH:mm', process.env.TIME_ZONE, true)
    let end = moment.tz(this.end, 'HH:mm', process.env.TIME_ZONE, true)
    
    return currentTime.isBetween(start, end) && end.diff(currentTime, 'hours') <= 1
  }
}
