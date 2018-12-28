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


  Queue.status = (id) => {
    return Queue.findById(id)
      .then(async function(queue) {
          try {
            let status = await getStatus(queue)
            return Promise.resolve(status)
          } catch(e) {
            console.log('Failed to get status', e)
            return Promise.resolve(e)
          }
      }).catch(function(err) {
          console.log('Failed to find queue to get status', err)
          return Promise.resolve(err)
      })
  }
}



var getStatus = async function(queue) {
  console.log("Getting status of queue", queue)

  let schedule = await queue.schedule.get()
  
  let holidayList = await queue.holidayList.get()
  let holidays = await holidayList.holidays.find()

  for(var i = 0; i < holidays.length; i++) {
    if(holidays[i].isToday()) {
      return 'holiday'
    }
  }

  let recurringTimeRanges = await schedule.recurringTimeRanges.find()
  let singleDateTimeRanges = await schedule.singleDateTimeRanges.find()

  for(var i = 0; i < recurringTimeRanges.length; i++) {
    if(recurringTimeRanges[i].isNow()) {
      return 'open'
    }
  }

  for(var i = 0; i < singleDateTimeRanges.length; i++) {
    if(singleDateTimeRanges[i].isNow()) {
      return 'open'
    }

  }
  return 'closed'
}



