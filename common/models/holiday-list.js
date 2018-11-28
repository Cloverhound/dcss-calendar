'use strict';

module.exports = function(HolidayList) {
  
    HolidayList.remoteMethod(
      'createWithHolidays', {
        http: {path: '/createWithHolidays', verb: 'post'},
        accepts: {arg: 'holidayList', type: 'any', http: {source: 'body'}},
        returns: {arg: 'status', type: 'string'},
      })
    HolidayList.remoteMethod(
      'updateWithHolidays', {
        http: {path: '/:id/updateWithHolidays', verb: 'put'},
        accepts: [
          {arg: 'id', type: 'number', required: true},
          {arg: 'holidayList', type: 'any', http: {source: 'body'}}
        ],
        returns: {arg: 'status', type: 'string'},
      })
    HolidayList.remoteMethod(
      'deleteWithHolidays', {
        http: {path: '/:id/deleteWithHolidays', verb: 'delete'},
        accepts: [
          {arg: 'id', type: 'number', required: true}
        ],
        returns: {arg: 'status', type: 'string'},
      })


    HolidayList.createWithHolidays = function(holidayListParameter, cb) {
      console.log('Creating Holiday List With Holidays', holidayListParameter)

      // HolidayList.beginTransaction({isolationLevel: HolidayList.Transaction.READ_UNCOMMITTED}, function(err, tx) {
        // if(err) {
        //   console.log('Failed to begin transaction', err)
        //   cb(null, 'FAILED')
        //   return
        // }
        
        // var options = {transaction: tx};
        
        HolidayList.create({name: holidayListParameter.name}, async function(holListErr, createdHolidayList) {

          if(holListErr) {
            console.log('Failed to create holiday list', holListErr)
            // rollback(tx)
            cb(holListErr)
            return          
          }

          console.log('Holiday List created succesfully, creating holidays')
          let createHolidayPromises = []
          holidayListParameter.holidays.forEach((holidayParameter) => {
            createHolidayPromises.push(createHoliday(createdHolidayList, holidayParameter))
          })

          let result = await Promise.all(createHolidayPromises)
          if(result !== 'FAILED') {
            // commit(tx)
            cb(null, createdHolidayList)
          }
        })
      // })
    }


    HolidayList.updateWithHolidays = function(id, holidayListParameter, cb) {
      console.log('Updating Holiday List With Holidays', id, holidayListParameter)
        
      HolidayList.findById(id, function(findErr, holidayList) {
        if(findErr) {
          console.log('Failed to find holiday list to update', findErr)
          cb(findErr)
          return
        }

        console.log('Updating attributes of holiday list')
        holidayList.updateAttributes(holidayListParameter, async function(updateErr, updatedHolidayList) {
          if(updateErr) {
            console.log('Failed to update holiday list', holidayList, updateErr)
            cb(updateErr)
            return          
          } else {
            console.log('Successfuly updated attributes of holidaylist', updatedHolidayList)
          }        
        })

        console.log('Deleting holidays of holiday list', holidayList)
        holidayList.holidays.destroyAll(function(destroyErr) {
          if(destroyErr) {
            console.log('Failed to destroy holidays of holiday list', holidayList)
            cb(destroyErr)
          }

          let createHolidaysResult = createHolidays(holidayList, holidayListParameter.holidays)
          cb(null, createHolidaysResult)
        })
      })
    }


      
    HolidayList.deleteWithHolidays = function(id, cb) {
      console.log('Deleting Holiday List With Holidays', id)
        
      HolidayList.findById(id, function(findErr, holidayList) {
        if(findErr) {
          console.log('Failed to find holiday list to delete', findErr)
          cb(findErr)
          return
        }

        console.log('Deleting holidays of holiday list', holidayList)
        holidayList.holidays.destroyAll(function(destroyHolsErr) {
          if(destroyHolsErr) {
            console.log('Failed to destroy holidays of holiday list', destroyHolsErr)
            cb(destroyHolsErr)
            return
          }

          holidayList.destroy(function(destroyHolListErr) {
            if(destroyHolListErr) {
              console.log('Failed to destroy holiday list', destroyHolListErr)
              cb(destroyHolListErr)
              return
            }
            cb(null, id)
          })
        })
      })
    }

}

function createHolidays(holidayListDb, holidays) {
  console.log('Creating holidays', holidayListDb, holidays)
  let createPromises = []
  for(var i = 0; i < holidays.length; i++) {
    createPromises.push(createHoliday(holidayListDb, holidays[i]))
  }
  return Promise.all(createPromises)
}

function createHoliday(createdHolidayList, holidayParameter) {
  console.log('Creating holiday', holidayParameter)
  delete holidayParameter.id
  return new Promise(function(resolve, reject) {
    createdHolidayList.holidays.create(holidayParameter, function(createHolError, createdHoliday) {
      if(createHolError) {
        console.log('Failed to create holiday', createHolError, holidayParameter)
        reject(createHolError)
      } else {
        console.log('Successfully created holiday', createdHoliday)
        resolve(createdHoliday)
      }
    })
  })
}

function rollback(transaction) {
  console.log('Rolling back transaction')
  transaction.rollback(function(err) {
    if(err) {
      console.log('failed to rollback transaction', err)
    }               
  })
}

function commit(transaction) {
  console.log('Committing transaction')
  transaction.commit(function(err) {
    if(err) {
      console.log('failed to commit transaction', err)
    }
  })
}

