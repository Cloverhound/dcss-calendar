'use strict'

var moment = require('moment-timezone')

module.exports = function(SingleDateTimeRange) {

    SingleDateTimeRange.prototype.isNow = function() {
        let currentTime = moment().tz(process.env.TIME_ZONE)

        if(!currentTime.isSame(this.date, 'day')) {
            return false
        }

        let start = moment.tz(this.start, 'HH:mm', process.env.TIME_ZONE)
        let end = moment.tz(this.end, 'HH:mm', process.env.TIME_ZONE)

        if (currentTime.isBetween(start, end) && end.diff(currentTime, 'hours') <= 1) {
            return 'Closing'
        }

        if (currentTime.isBetween(start, end)) {
            return true
        }

        return false   
    }
}


