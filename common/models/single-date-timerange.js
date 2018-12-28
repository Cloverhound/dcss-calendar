'use strict'

var moment = require('moment-timezone')

module.exports = function(SingleDateTimeRange) {

    SingleDateTimeRange.prototype.isNow = function() {        
        console.log('Checking if single date time range is now', this)

        let currentTime = moment().tz(process.env.TIME_ZONE)

        if(!currentTime.isSame(this.date, 'day')) {
            return false
        }

        let start = moment.tz(this.start, 'h:mm a', process.env.TIME_ZONE)
        let end = moment.tz(this.end, 'h:mm a', process.env.TIME_ZONE)

        console.log('single start', start)
        console.log('single end', end)
        let isBetween = currentTime.isBetween(start, end)
        console.log('isBetween', isBetween)

        if ( isBetween && end.diff(currentTime, 'hours') <= 1) {
            return 'Closing'
        }

        if (isBetween) {
            return true
        }

        return false  
        
    }
}


