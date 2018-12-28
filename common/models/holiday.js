'use strict'
var moment = require('moment-timezone')

module.exports = function(Holiday) {
  Holiday.validatesUniquenessOf('name', {message: 'Name already exists'})

  Holiday.prototype.isToday = function() {
    console.log('Checking if holiday is today', this)
    let currentTime = moment().tz(process.env.TIME_ZONE)
    return currentTime.isSame(this.date, 'day')
  }

}
