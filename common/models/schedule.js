'use strict';

var extend = require('extend')

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

          let result = await Promise.all(createTimeRangePromises)
          if(result !== 'FAILED') {
            cb(null, createdSchedule)
          }
        })
    }


    Schedule.updateWithTimeRanges = function(id, scheduleParameter, cb) {
      console.log('Updating Schedule With Tiime Ranges', id, scheduleParameter)
      let response;
      Schedule.findById(id, function(findErr, schedule) {
        if(findErr) {
          console.log('Failed to find schedule to update', findErr)
          cb(findErr)
          return
        }

        console.log('Updating attributes of schedule')
        schedule.updateAttributes(scheduleParameter, function(updateErr, updatedSchedule) {
          if(updateErr) {
            console.log('Failed to update schedule', schedule, updateErr)
            cb(updateErr)
            return          
          } else {
            console.log('Successfuly updated attributes of schedule', updatedSchedule)
            console.log('Deleting recurring time ranges of schedule', schedule)
            schedule.recurringTimeRanges.destroyAll(async function(destroyErr) {
              if(destroyErr) {
                console.log('Failed to destroy recurring time ranges of schedule', schedule)
                cb(destroyErr)
                return
              }
    
              let createRecurringTimeRangesResult = await createRecurringTimeRanges(schedule, scheduleParameter.recurringTimeRanges)
              return
            })
    
            console.log('Deleting single date time ranges of schedule', schedule)
            schedule.singleDateTimeRanges.destroyAll(async function(destroyErr) {
              if(destroyErr) {
                console.log('Failed to destroy single date time ranges of schedule', schedule)
                cb(destroyErr)
              }
    
              let createSingleDateTimeRangesResult =  await createSingleDateTimeRanges(schedule, scheduleParameter.singleDateTimeRanges)
              cb(null, {})
            })
          } 
        })
      })
    }

    // NOT NEEDED IF WE USE A CASCADE DELETE
    Schedule.deleteWithTimeRanges = function (id, cb) {
        console.log('Deleting Schedule and its Time Ranges -- ', id)

        Schedule.findById(id, function (findErr, schedule) {
          if (findErr) {
            console.log('Failed to find schedule to delete', findErr)
            cb(findErr)
            return
          }

          let where = {
            where: {
              scheduleId: id
            }
          }

          schedule.queues.find(where, function (findQueuesErr, queue) {
            if (findQueuesErr) {
              console.log('Failed to find queue', findQueuesErr)
              cb(findQueuesErr)
              return
            } else if (queue.length) {
              console.log('Aborted. Schedule is in use with ', queue)
              cb(`Aborted. This Schedule is assigned to a county or counties.`)
            } else {
              console.log('Deleting recurring time ranges of schedule', schedule)
              schedule.recurringTimeRanges.destroyAll(function (destroyTimeRangesErr) {
                if (destroyTimeRangesErr) {
                  console.log('Failed to destroy recurring time ranges of schedule', destroyTimeRangesErr)
                  cb(destroyTimeRangesErr)
                  return
                }
                console.log('Successfully deleted recurring time ranges')
                console.log('Deleting single date time ranges of schedule', schedule)
                schedule.singleDateTimeRanges.destroyAll(function (destroyTimeRangesErr) {
                  if (destroyTimeRangesErr) {
                    console.log('Failed to destroy single date time ranges of schedule', destroyTimeRangesErr)
                    cb(destroyTimeRangesErr)
                    return
                  }

                  console.log('Successfully destroyed single date time ranges')
                  console.log('Destroying schedule')
                  schedule.destroy(function (destroySchedErr) {
                    if (destroySchedErr) {
                      console.log('Failed to destroy schedule', destroySchedErr)
                      cb(destroySchedErr)
                      return
                    }
                    console.log('Successfully destroyed schedule')
                    cb(null, id)
                  })
                })
              })
            }
          })
        }
      )
    }
}


function createRecurringTimeRanges(createdSchedule, recurringTimeRanges) {
  console.log('Creating recurring time ranges', createdSchedule, recurringTimeRanges)
  let createPromises = []
  for(var i = 0; i < recurringTimeRanges.length; i++) {
    createPromises.push(createRecurringTimeRange(createdSchedule, recurringTimeRanges[i]))
  }
  return Promise.all(createPromises)
}

function createSingleDateTimeRanges(createdSchedule, singleDateTimeRanges) {
  console.log('Creating single date time ranges', createdSchedule, singleDateTimeRanges)
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
  if(!singleDateTimeRangeParameter.start || !singleDateTimeRangeParameter.end || !singleDateTimeRangeParameter.date) {
    console.log('Not creating single date time range because start, end, and date must be provided', singleDateTimeRangeParameter)
    return 
  }
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
