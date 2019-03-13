'use strict';
var fs = require("fs")
var logger = require('../../server/logger')

module.exports = function (Prompt) {
  Prompt.remoteMethod(
    'upload', {
      http: { path: '/upload', verb: 'put' },
      accepts: [
        {arg: 'req', type: 'object',
        http: function (ctx) {return ctx.req} }
      ],
      returns: { arg: 'res', type: 'string' },
    }
  )
  Prompt.remoteMethod(
    'deleteFile', {
      http: {path: '/:id/deleteFile', verb: 'delete'},
      accepts: [
        {arg: 'id', type: 'number', require: true}
      ],
      returns: {arg: 'status', type: 'string'},
    }
  )
  Prompt.remoteMethod(
    'createPrompts', {
      http: {path: '/:queueId/createPrompts', verb: 'get'},
      accepts: [
        {arg: 'queueId', type: 'number', require: true}
      ],
      returns: {arg: 'status', type: 'string'},
    }
  )
  Prompt.remoteMethod(
    'clearPrompt', {
      http: {path: '/:id/clearPrompt', verb: 'put'},
      accepts: [
        {arg: 'id', type: 'number', require: true}
      ],
      returns: {arg: 'status', type: 'string'},
    }
  )
  Prompt.remoteMethod(
    'deletePromptRows', {
      http: {path: '/deletePromptRows', verb: 'delete'},
      accepts: {arg: 'payload', type: 'any', http: {source: 'body'}},
      returns: {arg: 'status', type: 'string'},
    }
  )
  createPrompts(Prompt)
  deletePrompt(Prompt)
  fileUpload(Prompt)
  clearPrompt(Prompt)
  deletePromptRows(Prompt)
};

// Create Prompts
let createPrompts = (Prompt) => {

  Prompt.createPrompts = (queueId) => {
    let filter = {where: {queueId: queueId, type: 'office directions'}, order: 'index DESC'}
    return Prompt.find(filter)
      .then(async function(res) {
        await makePrompts(Prompt, queueId, res[0].index)
        return await Prompt.find({where: {queueId: queueId}})
          .then(res => res)
      })
  }
}

let makePrompts = (Prompt, queueId, index) => {
  let promptsArray = [
    {
      index: index + 1,
      language: "English",
      type: "office directions",
      queueId
    },
    {
      index: index + 2,
      language: "Spanish",
      type: "office directions",
      queueId
    }
  ]

  let actions = promptsArray.map(prompt => {
    return new Promise(function(resolve, reject) {
      Prompt.create(prompt)
        .then(res => {
          logger.info("Creating prompts successful")
          return resolve(res)
        })
        .catch(err => {
          logger.info("Creating prompts failed")
          return reject(err)
        })
    })
  })
  return Promise.all(actions) 
}

// Delete Prompt
function deletePrompt(Prompt) {
  logger.info("Deleting prompt")
  Prompt.deleteFile = function (id, cb) {
    let res;
    Prompt.findById(id, function(err, instance){
      res = instance;
      if(!err){
        Prompt.destroyById(id, function(err){
          if (err) {
            logger.info("Deleting prompt Failed")
            res = err;
          } else {
            logger.info("Deleting prompt succesful")
           res = deleteFile(instance.file_path)
          }
        })
      } else {
        res = err;
      }
      cb(null, res)
    })
  }
}

function deleteFile(file_path) {
  fs.unlink(`${process.env.FILE_STORAGE_PATH}${file_path}`, (err) => {
    if (err) throw err;
    logger.info(`${file_path} was deleted`);
  });
}

// Upload Prompt
function fileUpload(Prompt) {
  logger.info("Uploading prompt")
  return Prompt.upload = (promptFile) => {
    
    let buffer = promptFile.files[0].buffer;
    let fileName = promptFile.files[0].originalname.replace(/ /g,"_")
    let path = Date.now() + "_" + fileName;

    return new Promise(function(resolve, reject){
      fs.writeFile(`${process.env.FILE_STORAGE_PATH}${path}`, buffer, async function(err) {
        if (err) reject(err)
        let newPrompt = await updatePrompt(Prompt, path, fileName, promptFile.body)
        return resolve(newPrompt)
      })

    })
    .then(res => {
      logger.info("Prompt file upload successful")  
      return res
    })
    .catch(err => {
      logger.info("Prompt file upload failed")  
      return err
    })
  }
}

const updatePrompt = (Prompt, path, fileName, body) => {
  let where = {id: body.id}
  let data = {
      name: fileName,
      file_path: path,
  }
  return new Promise(function(resolve, reject){
    Prompt.upsertWithWhere(where, data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

// Clear Prompt
const clearPrompt = (Prompt) => {
  logger.info('Clearing Prompt');
  
  Prompt.clearPrompt = (id) => {
  return new Promise(function(resolve, reject){
    Prompt.findById(id)
    .then(res => {
      logger.info('Clearing Prompt Successful', {id: id})
      return resolve(resetPrompt(Prompt, res))
    })
    .then(err => {
      logger.info('Clearing Prompt Failed', {id: id});
      return reject(err)
    })
  })
  .then(res => res)
  .then(err => err)
  }
}

const resetPrompt = (Prompt, obj) => {
  let where = {id: obj.id}
  logger.info('Resetting prompt', where);
  
  let data = {
      name: null,
      file_path: null
  }
  return new Promise(function(resolve, reject){
    Prompt.upsertWithWhere(where, data)
      .then(res => {
        logger.info('Resetting prompt Successful ', where);
        return resolve(deleteFileFromLocal(obj))
      })
      .catch(err => {
        logger.info('Resetting prompt Failed ', where);
        return reject(err)
      })
  })
  .then(res => res)
  .catch(err => err)
}

const deleteFileFromLocal = (obj) => {
  logger.info("Deleting audio file from local storage path", {path: obj.file_path});
  return new Promise(function(resolve, reject){
   fs.unlink(`${process.env.FILE_STORAGE_PATH}${obj.file_path}`, (err) => {
      if (err) throw reject(err);
    return resolve({queueId: obj.queueId, name: `${obj.name}`})
    });
  })
  .then(res => {
    logger.info("Deleting audio file from local storage path Successful", {path: obj.file_path});
    return res
  })
  .catch(err => {
    logger.info("Deleting audio file from local storage path Failed", {path: obj.file_path});
    return err
  })
}

// Delete Prompt Rows
const deletePromptRows = (Prompt) => {
  logger.info('Deleting Prompt Row');
  Prompt.deletePromptRows = (body) => {
    let keys = Object.keys(body)
    let deleted = keys.map(key => {
      return new Promise(function(resolve, reject){
        Prompt.destroyById(body[key])
          .then(res => {
            logger.info('Deleting Prompt Row Successful', {id: body[key]});
            return resolve(res)
          })
          .catch(err => {
            logger.info('Deleting Prompt Row Failed', {id: body[key]});
            return reject(err)
          })
      })
    })
    return Promise.all(deleted)
  }
}