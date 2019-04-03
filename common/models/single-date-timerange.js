'use strict'

var moment = require('moment-timezone')
var logger = require('../../server/logger')

module.exports = function(SingleDateTimeRange) {

    SingleDateTimeRange.prototype.isNow = function() {        
        logger.info('Checking if single date time range is now', this)

        let currentTime = moment().tz(process.env.TIME_ZONE)

        let start = moment(this.start, 'h:mm a').tz(process.env.TIME_ZONE, true)
        let end = moment(this.end, 'h:mm a').tz(process.env.TIME_ZONE, true)

        return currentTime.isBetween(start, end)
    }

    SingleDateTimeRange.prototype.isClosedAllDay = function() {        
        logger.info('Checking if single date time range is closed all day', this)
        return this.closed_all_day
    }

    SingleDateTimeRange.prototype.isToday = function() {
        let currentDateFormatted = moment().tz(process.env.TIME_ZONE).format("YYYY-MM-DD");
        let inputDateFormatted = moment(this.date).format("YYYY-MM-DD");
        logger.info("is today ", "currentTime: ", currentDateFormatted, "this.date: ", moment(this.date) );
        return  moment(currentDateFormatted).isSame(inputDateFormatted, 'day')
    }
}


