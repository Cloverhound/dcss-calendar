'use strict';

module.exports = function(app) {
  var Schedule = app.models.Schedule;
  var Queue = app.models.Queue;
  var Holiday = app.models.Holiday;
  var HolidayList = app.models.HolidayList;
  var RecurringTimeRange = app.models.RecurringTimeRange;
  var SingleDateTimeRange = app.models.SingleDateTimeRange;
  var Prompt = app.models.Prompt;
};
