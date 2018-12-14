'use strict'
var moment = require('moment')

module.exports = function(RecurringTimeRange) {

  RecurringTimeRange.prototype.isNow = function() {
    let days = ['sun', 'mon', 'tues', 'weds', 'thurs', 'fri', 'sat']
    let currentTime = moment().tz(process.env.TIME_ZONE)
    let currentDay = days[currentTime.format('d')]
    
    if(!this[currentDay]) {
        return false
    }

    let start = moment.tz(this.start, 'HH:mm', process.env.TIME_ZONE)
    let end = moment.tz(this.end, 'HH:mm', process.env.TIME_ZONE)
    
    return currentTime.isBetween(start, end)
  }

  RecurringTimeRange.prototype.isClosing = function() {
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
