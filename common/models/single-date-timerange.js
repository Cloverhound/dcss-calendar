'use strict'

var moment = require('moment-timezone')
var logger = require('../../server/logger')

module.exports = function(SingleDateTimeRange) {

    SingleDateTimeRange.prototype.isNow = function() {        
        logger.info('Checking if single date time range is now', this)

        let currentTime = moment().tz(process.env.TIME_ZONE)
        let currentDateFormatted = moment(moment().tz(process.env.TIME_ZONE).format("YYYY-MM-DD"))
        let inputDateFormatted = moment(this.date).format("YYYY-MM-DD")

        if(!currentDateFormatted.isSame(inputDateFormatted, 'day')) {
            logger.info('Single date is NOT the same day', "currentTime: ", currentTime, "this.date: ", moment(this.date) );
            return false
        }

        let start = moment(this.start, 'h:mm a').tz(process.env.TIME_ZONE, true)
        let end = moment(this.end, 'h:mm a').tz(process.env.TIME_ZONE, true)

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
        logger.info('Checking if single date time range is closed all day', this)

        let currentTime = moment().tz(process.env.TIME_ZONE).format("YYYY-MM-DD");
        
        if(moment(currentTime).isSame(moment(this.date).format("YYYY-MM-DD"), 'day') && this.closed_all_day === true){
            return true
        }
        return false
    }
}


