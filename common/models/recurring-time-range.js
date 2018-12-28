'use strict'
var moment = require('moment-timezone')

module.exports = function(RecurringTimeRange) {

  RecurringTimeRange.prototype.isNow = function() {
    console.log('Checking if recurring time range is now', this)
    
    let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    let currentTime = moment().tz(process.env.TIME_ZONE)
    let currentDay = days[currentTime.format('d')]
    
    if(!this[currentDay]) {
        return false
    }

    let start = moment.tz(this.start, 'h:mm a', process.env.TIME_ZONE)
    let end = moment.tz(this.end, 'h:mm a', process.env.TIME_ZONE)

    console.log('start', start)
    console.log('end', end)
    let isBetween = currentTime.isBetween(start, end)
    console.log('isBetween', isBetween)
    
    return isBetween
}

  RecurringTimeRange.prototype.isClosing = function() {
    console.log('Checking if recurring time range is closing', this)
    let days = ['sun', 'mon', 'tues', 'weds', 'thurs', 'fri', 'sat']
    let currentTime = moment().tz(process.env.TIME_ZONE)
    let currentDay = days[currentTime.format('d')]
    
    if(!this[currentDay]) {
        return false
    }

    let start = moment.tz(this.start, 'HH:mm', process.env.TIME_ZONE)
    let end = moment.tz(this.end, 'HH:mm', process.env.TIME_ZONE)
    
    return currentTime.isBetween(start, end) && end.diff(currentTime, 'hours') <= 1
  }
  
}
