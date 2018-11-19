'use strict';

module.exports = function(HolidayList) {
  
    HolidayList.remoteMethod(
      'createWithHolidays', {
        http: {path: '/createWithHolidays', verb: 'post'},
        accepts: {arg: 'holidayList', type: 'any', http: {source: 'body'}},
        returns: {arg: 'status', type: 'string'},
      }
    )


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
            cb(null, 'FAILED')
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
            cb(null, 'SUCCESS')
          }
        })
      // })
    }

}

function createHoliday(createdHolidayList, holidayParameter) {
  console.log('Creating holiday', holidayParameter)
  return new Promise(function(resolve, reject) {
    createdHolidayList.holidays.create(holidayParameter, function(createHolError, createdHoliday) {
      if(createHolError) {
        console.log('Failed to create holiday', createHolError, holidayParameter)
        reject('FAILED')
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

