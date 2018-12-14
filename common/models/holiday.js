'use strict'

module.exports = function(Holiday) {
  Holiday.validatesUniquenessOf('name', {message: 'Name already exists'})

  Holiday.prototype.isToday = function() {
    let currentTime = moment().tz(process.env.TIME_ZONE)
    return currentTime.isSame(this.date, 'day')
  }

}
