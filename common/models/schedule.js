'use strict';
var moment = require('moment-timezone');

module.exports = function(Schedule) {
  Schedule.status = function(rangeId, cb) {
    Schedule.findById(rangeId, function(err, instance) {
      var response = instance;
      var days = ['sun', 'mon', 'tues', 'weds', 'thurs', 'fri', 'sat'];
      var currentTime = moment().tz(process.env.TIME_ZONE);
      
      var currentDay = days[moment().tz(process.env.TIME_ZONE).format('d')];
      
      var OPEN_HOUR = moment.tz(response[currentDay + '_open'], 'HH:mm', process.env.TIME_ZONE);
      var CLOSE_HOUR = moment.tz(response[currentDay + '_closed'], 'HH:mm', process.env.TIME_ZONE);
      
      if (currentTime.isBetween(OPEN_HOUR, CLOSE_HOUR)) {
        if (CLOSE_HOUR.diff(currentTime, 'hours') <= 1) {
          response = 'closing';
        } else {
          response = 'open';
        }
      } else {
        response = 'closed';
      }
      cb(null, response);
    });
  };
  Schedule.remoteMethod(
    'status', {
      http: {path: '/status', verb: 'get'},
      accepts: {arg: 'id', type: 'number', http: {source: 'query'}},
      returns: {arg: 'status', type: 'string'},
    }
  );
};
