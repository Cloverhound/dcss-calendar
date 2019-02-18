'use strict'

var moment = require('moment-timezone')

module.exports = function(SingleDateTimeRange) {

    SingleDateTimeRange.prototype.isNow = function() {        
        console.log('Checking if single date time range is now', this)

        let currentTime = moment().tz(process.env.TIME_ZONE)

        if(!currentTime.isSame(this.date, 'day')) {
            return false
        }

        let start = moment(this.start, 'h:mm a').tz(process.env.TIME_ZONE)
        let end = moment(this.end, 'h:mm a').tz(process.env.TIME_ZONE)

        let isBetween = currentTime.isBetween(start, end)

        if ( isBetween && end.diff(currentTime, 'hours') <= 1) {
            return 'Closing'
        }

        if (isBetween) {
            return true
        }

        return false  
        
    }

    SingleDateTimeRange.prototype.isClosedAllDay = function() {        
        console.log('Checking if single date time range is closed all day', this)

        let currentTime = moment().tz(process.env.TIME_ZONE)
        
        if(currentTime.isSame(this.date, 'day') && this.closed_all_day === true){
            return true
        }
        return false
    }
}


