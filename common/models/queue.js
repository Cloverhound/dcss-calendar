'use strict';
var logger = require('../../server/logger')

module.exports = function (Queue) {  
  Queue.validatesUniquenessOf('name', {message: 'Name already exists'});

  Queue.remoteMethod(
    'getStatus', {
      http: {path: '/:code/status', verb: 'get'},
      accepts: [
        {arg: 'code', type: 'string', required: true}
      ],
      returns: {arg: 'county', type: 'object'},
  })

  Queue.remoteMethod(
    'getAllQueuesWithStatus', {
      http: {path: '/getAllQueuesWithStatus', verb: 'get'},
      returns: {arg: 'counties', type: 'array'}
    }
  )

  Queue.remoteMethod(
    'createQueueAndPrompts', {
      http: {path: '/createQueueAndPrompts', verb: 'post'},
      accepts: {arg: 'queue', type: 'any', http: {source: 'body'}},
      returns: {arg: 'status', type: 'any'},
  })

  Queue.remoteMethod(
    'optionalPromptToggle', {
      http: {path: '/optionalPromptToggle', verb: 'put'},
      accepts: {arg: 'queue', type: 'any', http: {source: 'body'}},
      returns: {arg: 'status', type: 'any'},
  })

  Queue.remoteMethod(
    'directionPrompts', {
      http: {path: '/:code/directionPrompts', verb: 'get'},
      accepts: [
        {arg: 'code', type: 'string', required: true}
      ],
      returns: {arg: 'files', type: 'any'},
  })

  Queue.remoteMethod(
    'optionalPrompts', {
      http: {path: '/:code/optionalPrompts', verb: 'get'},
      accepts: [
        {arg: 'code', type: 'string', required: true}
      ],
      returns: {arg: 'files', type: 'any'},
  })

  Queue.remoteMethod(
    'countyTransferRange', {
      http: {path: '/:countyTransferRange/queue', verb: 'get'},
      accepts: [
        {arg: 'countyTransferRange', type: 'number', required: true}
      ],
      returns: {arg: 'queue', type: 'any'},
  })

  Queue.remoteMethod(
    'forceCloseToggle', {
      http: {path: '/forceCloseToggle', verb: 'put'},
      accepts: {arg: 'queue', type: 'any', http: {source: 'body'}},
      returns: {arg: 'status', type: 'any'},
  })

  Queue.remoteMethod(
    'getQueueWithCountyCode', {
      http: {path: '/:code/getQueueWithCountyCode', verb: 'get'},
      accepts: [
        {arg: 'code', type: 'string', required: true}
      ],
      returns: {arg: 'queue', type: 'any'},
  })

  Queue.getAllQueuesWithStatus = () => {
    logger.info('Getting all queues with status')
    console.log('Getting all queues with status')
    return Queue.find({include: ['holidayList', 'schedule', 'lcsa']})
      .then(async function(queues) {
        for(var i = 0; i < queues.length; i++) {
          let queue = queues[i]
          queue.county_status = await getStatus(queue)
        }
        return Promise.resolve(queues)
      })
      .catch(err => {
        logger.info('Failed to get all queues with status', err)
        return Promise.reject(err)
      })
  } 

  Queue.optionalPrompts = (code) => {
    let where = {where: {county_code: code}}

    return Queue.find(where)
      .then(async function(res) {
        return res[0].optional_prompt_enabled ? await findOptionalPrompts(res) : []
      })
      .catch(err => err)
  }

  const findOptionalPrompts = (queue) => {
    let where = {where: {queueId: queue[0].id, type: "optional announcements"}, order: 'index ASC', fields: {name: false, index: false, language: true, type: false, file_path: true, queueId: false, id: false }}
    
    return new Promise(function(resolve, reject){
      queue[0].prompts.find(where)
        .then(res => {
          let newObj = res.reduce((acc, obj) =>{
            if (obj.language === "English") {
              if(!acc.english_file_name) {
                acc.english_file_name = []
                if(obj.file_path != null) {
                  acc.english_file_name.push(obj.file_path)
                }
              } else {
                if(obj.file_path != null) {
                  acc.english_file_name.push(obj.file_path)
                }
              }
            } else if (obj.language === "Spanish") {
              if(!acc.spanish_file_name) {
                acc.spanish_file_name = []
                if(obj.file_path != null) {
                  acc.spanish_file_name.push(obj.file_path)
                }
              } else {
                if(obj.file_path != null) {
                  acc.spanish_file_name.push(obj.file_path)
                }
              }
            }
            return acc
          },{})
          return resolve(newObj)
        })
        .catch(err => reject(err))
    })
    .then(res => {
      logger.info("findOptionalPrompts successful")
      return res
    })
    .catch(err => {
      logger.info("findOptionalPrompts failed")
      return err
    })
  }

  Queue.directionPrompts = (code) => {
    let where = {where: {county_code: code}}

    return Queue.find(where)
      .then(async function(res) {
        return await findDirectionPrompts(res)
      })
      .catch(err => err)
  }

  const findDirectionPrompts = (queue) => {
    let where = {where: {queueId: queue[0].id, type: "office directions"}, order: 'index ASC', fields: {name: false, index: false, language: true, type: false, file_path: true, queueId: false, id: false }}
    
    return new Promise(function(resolve, reject){
      queue[0].prompts.find(where)
        .then(res => {
          let newObj = res.reduce((acc, obj) => {
            if (obj.language === "English") {
              if(!acc.english_file_name) {
                acc.english_file_name = []
                if(obj.file_path != null) {
                  acc.english_file_name.push(obj.file_path)
                }
              } else {
                if(obj.file_path != null) {
                  acc.english_file_name.push(obj.file_path)
                }
              }
            } else if (obj.language === "Spanish") {
              if(!acc.spanish_file_name) {
                acc.spanish_file_name = []
                if(obj.file_path != null) {
                  acc.spanish_file_name.push(obj.file_path)
                }
              } else {
                if(obj.file_path != null) {
                  acc.spanish_file_name.push(obj.file_path)
                }
              }
            }
            return acc
          },{})
          return resolve(newObj)
        })
        .catch(err => reject(err))
    })
    .then(res => {
      logger.info("Find direction prompt successful")
      return res
    })
    .catch(err => {
      logger.info("Find direction prompt failed")
      return err
    })
  }

  Queue.optionalPromptToggle = (body) => {
    let where = {id: body.id}
    return Queue.upsertWithWhere(where, {optional_prompt_enabled: !body.bool})
      .then(res => res)
      .catch(err => err)
  }

  Queue.getStatus = (code) => {
    logger.info('Getting status of queue with code', code)
    return Queue.find({where: {county_code: code}})
      .then(async function(queues) {
          try {
            let status = await getStatus(queues[0])
            return Promise.resolve(status)
          } catch(e) {
            logger.info('Failed to get status', e)
            return Promise.reject(e)
          }
      }).catch(function(err) {
          logger.info('Failed to find queue to get status', err)
          return Promise.reject(err)
      })
  }

  Queue.countyTransferRange = (countyTransferRange) => {
    logger.info('countyTransferRange', countyTransferRange);
    
    return Queue.findOne({where: {county_transfer_range: countyTransferRange}})
      .then(res => res)
      .catch(err => err)
  }

  Queue.createQueueAndPrompts = async (body) => {
    logger.info('Creating queue and prompts')
    return Queue.create(body)
      .then(async function(res) {
        logger.info('Created Queue', res)
        let prompts = await createPrompts(res)
        logger.info('Created Prompts', prompts)
        return prompts
      })
      .catch(err => {
        logger.info('Error in creating Queue', err)
        return Promise.reject(err)
      })
  }

  Queue.forceCloseToggle = (body) => {
    logger.info('Toggling queue force close');
    let where = {id: body.id}
    return Queue.upsertWithWhere(where, {force_closed: !body.bool})
      .then(res => res)
      .catch(err => err)
  }

  Queue.getQueueWithCountyCode = (code) => {
    let where = {where: {county_code: code}}

    return Queue.find(where)
      .then(res => {
        logger.info("Get")
        return res
      })
      .catch(err => err)
  }
}

let createPrompts = (obj) => {
  logger.info('Creating prompts')
  let promptsArray = [
    {
      index: 0,
      language: "English",
      type: "office directions",
      queueId: obj.id
    },
    {
      index: 1,
      language: "Spanish",
      type: "office directions",
      queueId: obj.id
    },
    {
      index: 0,
      language: "English",
      type: "optional announcements",
      queueId: obj.id
    },
    {
      index: 1,
      language: "Spanish",
      type: "optional announcements",
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
  logger.info("Getting status of queue ", queue)
  
  let force_closed = queue.force_closed
  let ewt = queue.ewt
  let lcsa = await queue.lcsa.get()

  let lcsa_name = 'unassigned'
  let lcsa_id = 'unassigned'
  let lcsa_status = 'unassigned'

  if (ewt === null) {
    ewt = ''
  }

  if(lcsa) {
    lcsa_name = lcsa.lcsa_name
    lcsa_id = lcsa.lcsa_id
    lcsa.lcsa_enabled ? lcsa_status = 'closed': lcsa_status = 'open'
  } 

  if(force_closed) {
    return {status: 'closed', ewt, lcsa_name, lcsa_id, lcsa_status, force_closed}
  } else {
    let holidayList = await queue.holidayList.get()
  
    if(holidayList) {
      let holidays = await holidayList.holidays.find()
    
      for(var i = 0; i < holidays.length; i++) {
        if(holidays[i].isToday()) {
          return {status: 'holiday', ewt, lcsa_name, lcsa_id, lcsa_status, force_closed}
        }
      }
    }
  
    let schedule = await queue.schedule.get()
    
    if(schedule) {
      let recurringTimeRanges = await schedule.recurringTimeRanges.find()
      let singleDateTimeRanges = await schedule.singleDateTimeRanges.find()

      let singleDateTimeRangesTodayArray = singleDateTimeRangesAreToday(singleDateTimeRanges)

      if(singleDateTimeRangesTodayArray.length) {
        return checkSingleDateTimeRanges(singleDateTimeRangesTodayArray, lcsa_name, lcsa_id, lcsa_status)
      }
     
      for(var i = 0; i < recurringTimeRanges.length; i++) {
        if(recurringTimeRanges[i].isNow()) {
          return {status: 'open', ewt, lcsa_name, lcsa_id, lcsa_status, force_closed}
        }
      }
    }
    return {status: 'closed', ewt, lcsa_name, lcsa_id, lcsa_status, force_closed}
  }
}

const singleDateTimeRangesAreToday = (singleDateTimeRanges) => {
  let isToday = []
  for(let i = 0; i < singleDateTimeRanges.length; i++) {
    let singleDateTimeRange = singleDateTimeRanges[i]
    if(singleDateTimeRange.isToday() && singleDateTimeRange.isClosedAllDay()) {
      return [singleDateTimeRange]
    } else if (singleDateTimeRange.isToday()) {
      isToday.push(singleDateTimeRange)
    }
  }
  return isToday
}

const checkSingleDateTimeRanges = (singleDateTimeRanges, lcsa_name, lcsa_id, lcsa_status) => {
  for(var i = 0; i < singleDateTimeRanges.length; i++) {
    let singleDateTimeRange = singleDateTimeRanges[i]
    if(singleDateTimeRange.isToday() && singleDateTimeRange.closed_all_day){
      return {status: 'closed', lcsa_name, lcsa_id, lcsa_status}
    } else if(singleDateTimeRange.isToday() && singleDateTimeRange.isNow()) {
      return {status: 'open', lcsa_name, lcsa_id, lcsa_status}
    } 
  }
  return {status: 'closed', lcsa_name, lcsa_id, lcsa_status}
}