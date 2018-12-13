'use strict';
var moment = require('moment');

module.exports = function(RecurringTimeRange) {
  // Timerange.validatesUniquenessOf('name', {message: 'Name already exists'});

  // Timerange.status = function(rangeId, cb) {
  //   Timerange.findById(rangeId, function(err, instance) {
  //     var response = instance;
  //     var days = ['sun', 'mon', 'tues', 'weds', 'thurs', 'fri', 'sat'];
  //     var currentTime = moment();
  //     var currentDay = days[moment().format('d')];

  //     var OPEN_HOUR = moment(response[currentDay + '_open'], 'HH:mm');
  //     var CLOSE_HOUR = moment(response[currentDay + '_closed'], 'HH:mm');

  //     if (currentTime.isBetween(OPEN_HOUR, CLOSE_HOUR)) {
  //       if (CLOSE_HOUR.diff(currentTime, 'hours') <= 1) {
  //         response = 'closing';
  //       } else {
  //         response = 'open';
  //       }
  //     } else {
  //       response = 'closed';
  //     }
  //     cb(null, response);
  //   });
  // };
  // RecurringTimeRange.remoteMethod(
  //   'status', {
  //     http: {path: '/status', verb: 'get'},
  //     accepts: {arg: 'id', type: 'number', http: {source: 'query'}},
  //     returns: {arg: 'status', type: 'string'},
  //   }
  // );
};
