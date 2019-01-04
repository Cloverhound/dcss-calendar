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

  Queue.remoteMethod(
    'createQueueAndPrompts', {
      http: {path: '/createQueueAndPrompts', verb: 'post'},
      accepts: {arg: 'queue', type: 'any', http: {source: 'body'}},
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
            return Promise.reject(e)
          }
      }).catch(function(err) {
          console.log('Failed to find queue to get status', err)
          return Promise.reject(err)
      })
  }

  Queue.createQueueAndPrompts = async (body) => {
    console.log('Creating queue and prompts')
    return Queue.create(body)
      .then(async function(res) {
        console.log('Created Queue', res)
        let prompts = await createPrompts(res)
        console.log('Created Promps', prompts)
        return prompts
      })
      .catch(err => {
        console.log('Error in creating Queue', err)
        return Promise.reject(err)
      })
  }
}

let createPrompts = (obj) => {
  console.log('Creating prompts')
  let promptsArray = [
    {
      index: 0,
      language: "English",
      type: "office directions",
      enabled: false,
      queueId: obj.id
    },
    {
      index: 1,
      language: "Spanish",
      type: "office directions",
      enabled: false,
      queueId: obj.id
    },
    {
      index: 0,
      language: "English",
      type: "optional announcements",
      enabled: false,
      queueId: obj.id
    },
    {
      index: 1,
      language: "Spanish",
      type: "optional announcements",
      enabled: false,
      queueId: obj.id
    }
  ]

  let actions = promptsArray.map(prompt => {
    return new Promise(function(resolve, reject) {
      obj.prompts.create(prompt)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  })

  let results = Promise.all(actions)
  return results
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



