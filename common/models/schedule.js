'use strict';
var moment = require('moment-timezone');

module.exports = function(Schedule) {
  Schedule.validatesUniquenessOf('name', {message: 'Name already exists'});

  Schedule.remoteMethod(
    'createWithTimeRanges', {
      http: {path: '/createWithTimeRanges', verb: 'post'},
      accepts: {arg: 'schedule', type: 'any', http: {source: 'body'}},
      returns: {arg: 'status', type: 'string'},
    })
  Schedule.remoteMethod(
    'updateWithTimeRanges', {
      http: {path: '/:id/updateWithTimeRanges', verb: 'put'},
      accepts: [
        {arg: 'id', type: 'number', required: true},
        {arg: 'schedule', type: 'any', http: {source: 'body'}}
      ],
      returns: {arg: 'status', type: 'string'},
    })
  Schedule.remoteMethod(
    'deleteWithTimeRanges', {  // NOT NEEDED IF WE USE A CASCADE DELETE
      http: {path: '/:id/deleteWithTimeRanges', verb: 'delete'},
      accepts: [
        {arg: 'id', type: 'number', required: true}
      ],
      returns: {arg: 'status', type: 'string'},
    })

    Schedule.createWithTimeRanges = function(scheduleParameter, cb) {
      console.log('Creating Schedule With Time Ranges', scheduleParameter)
        
        Schedule.create({name: scheduleParameter.name}, async function(schedErr, createdSchedule) {

          if(schedErr) {
            console.log('Failed to create schedule', schedErr)
            cb(schedErr)
            return          
          }

          console.log('Schedule created succesfully, creating time ranges')
          let createTimeRangePromises = []
          scheduleParameter.recurringTimeRanges.forEach((recurringTimeRangeParameter) => {
            createTimeRangePromises.push(createRecurringTimeRange(createdSchedule, recurringTimeRangeParameter))
          })
          scheduleParameter.singleDateTimeRanges.forEach((singleDateTimeRangeParameter) => {
            createTimeRangePromises.push(createSingleDateTimeRange(createdSchedule, singleDateTimeRangeParameter))
          })

          let result = await Promise.all(createHolidayPromises)
          if(result !== 'FAILED') {
            cb(null, createdSchedule)
          }
        })
    }


    Schedule.updateWithTimeRanges = function(id, scheduleParameter, cb) {
      console.log('Updating Schedule With Tiime Ranges', id, scheduleParameter)
        
      Schedule.findById(id, function(findErr, schedule) {
        if(findErr) {
          console.log('Failed to find schedule to update', findErr)
          cb(findErr)
          return
        }

        console.log('Updating attributes of schedule')
        schedule.updateAttributes(scheduleParameter, async function(updateErr, updatedSchedule) {
          if(updateErr) {
            console.log('Failed to update schedule', schedule, updateErr)
            cb(updateErr)
            return          
          } else {
            console.log('Successfuly updated attributes of schedule', updatedSchedule)
          }        
        })

        console.log('Deleting recurring time ranges of schedule', schedule)
        schedule.recurringTimeRanges.destroyAll(function(destroyErr) {
          if(destroyErr) {
            console.log('Failed to destroy recurring time ranges of schedule', schedule)
            cb(destroyErr)
            return
          }

          let createRecurringTimeRangesResult = createRecurringTimeRanges(schedule, scheduleParameter.recurringTimeRanges)
          cb(null, createRecurringTimeRangesResult)
          return
        })

        console.log('Deleting single date time ranges of schedule', schedule)
        schedule.singleDateTimeRanges.destroyAll(function(destroyErr) {
          if(destroyErr) {
            console.log('Failed to destroy single date time ranges of schedule', schedule)
            cb(destroyErr)
          }

          let createSingleDateTimeRangesResult = createSingleDateTimeRanges(schedule, scheduleParameter.singleDateTimeRanges)
          cb(null, createSingleDateTimeRangesResult)
        })
      })
    }

    // NOT NEEDED IF WE USE A CASCADE DELETE
    Schedule.deleteWithTimeRanges = function(id, cb) {
      console.log('Deleting Schedule With Time Ranges', id)
        
      Schedule.findById(id, function(findErr, schedule) {
        if(findErr) {
          console.log('Failed to find schedule to delete', findErr)
          cb(findErr)
          return
        }

        console.log('Deleting recurring time ranges of schedule', schedule)
        schedule.recurringTimeRanges.destroyAll(function(destroyTimeRangesErr) {
          if(destroyTimeRangesErr) {
            console.log('Failed to destroy recurring time ranges of schedule', destroyTimeRangesErr)
            cb(destroyTimeRangesErr)
            return
          }

          console.log('Deleting single date time ranges of schedule', schedule)
          schedule.singleDateTimeRanges.destroyAll(function(destroyTimeRangesErr) {
            if(destroyTimeRangesErr) {
              console.log('Failed to destroy single date time ranges of schedule', destroyTimeRangesErr)
              cb(destroyTimeRangesErr)
              return
            }

            schedule.destroy(function(destroySchedErr) {
              if(destroySchedErr) {
                console.log('Failed to destroy schedule', destroySchedErr)
                cb(destroySchedErr)
                return
              }
              cb(null, id)
            })
          })
        })
      })
    }
}


function createRecurringTimeRanges(createdSchedule, recurringTimeRanges) {
  console.log('Creating recurring time ranges', scheduleDb, recurringTimeRanges)
  let createPromises = []
  for(var i = 0; i < recurringTimeRanges.length; i++) {
    createPromises.push(createRecurringTimeRange(createdSchedule, recurringTimeRanges[i]))
  }
  return Promise.all(createPromises)
}

function createSingleDateTimeRanges(createdSchedule, singleDateTimeRanges) {
  console.log('Creating single date time ranges', scheduleDb, singleDateTimeRanges)
  let createPromises = []
  for(var i = 0; i < singleDateTimeRanges.length; i++) {
    createPromises.push(createSingleDateTimeRange(createdSchedule, singleDateTimeRanges[i]))
  }
  return Promise.all(createPromises)
}



function createRecurringTimeRange(createdSchedule, recurringTimeRangeParameter) {
  console.log('Creating recurring time range', recurringTimeRangeParameter)
  delete recurringTimeRangeParameter.id
  return new Promise(function(resolve, reject) {
    createdSchedule.recurringTimeRanges.create(recurringTimeRangeParameter, function(createTimeRangeError, createdTimeRange) {
      if(createTimeRangeError) {
        console.log('Failed to create recurring time range', createTimeRangeError, recurringTimeRangeParameter)
        reject(createTimeRangeError)
      } else {
        console.log('Successfully created recurring time range', createdTimeRange)
        resolve(createdTimeRange)
      }
    })
  })
}

function createSingleDateTimeRange(createdSchedule, singleDateTimeRangeParameter) {
  console.log('Creating single date time range', singleDateTimeRangeParameter)
  delete singleDateTimeRangeParameter.id
  return new Promise(function(resolve, reject) {
    createdSchedule.singleDateTimeRanges.create(singleDateTimeRangeParameter, function(createTimeRangeError, createdTimeRange) {
      if(createTimeRangeError) {
        console.log('Failed to create single date time range', createTimeRangeError, singleDateTimeRangeParameter)
        reject(createTimeRangeError)
      } else {
        console.log('Successfully created single date time range', createdTimeRange)
        resolve(createdTimeRange)
      }
    })
  })
}
