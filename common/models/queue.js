'use strict';


module.exports = function (Queue) {
  Queue.validatesUniquenessOf('name', {message: 'Name already exists'});

  Queue.remoteMethod(
    'status', {
      http: {path: '/:id/status', verb: 'get'},
      accepts: [
        {arg: 'id', type: 'number', required: true}
      ],
      returns: {arg: 'status', type: 'any'},
  })


  Queue.status = (id, cb) => {
    Queue.findById(id, function(findErr, queue) {
      if(findErr) {
        console.log('Failed to find queue', findErr)
        cb(findErr)
        return
      }

      let status = getStatus(queue)
      cb(status)
    })
  }
};


var getStatus = function(queue) {
  console.log("Getting status of queue")

  let recurringTimeRanges = queue.schedule.recurringTimeRanges
  let singleDateTimeRanges = queue.schedule.singleDateTimeRanges
  let holidays = queue.holidayList.holidays

  let response = {
    recurringTimeRange: false,
    singleDateTimeRange: false,
    holiday: false
  }

  for(var i = 0; i < holidays; i++) {
    if(holidays[i].isToday()) {
      response.holiday = true
      break
    }
  }

  for(var i = 0; i < recurringTimeRanges; i++) {
    if(recurringTimeRanges[i].isNow()) {
      response.recurringTimeRange = true
      break
    }
  }

  for(var i = 0; i < singleDateTimeRanges; i++) {
    if(singleDateTimeRanges[i].isNow()) {
      response.singleDateTimeRange = true
      break
    }
  }

  return response
}



