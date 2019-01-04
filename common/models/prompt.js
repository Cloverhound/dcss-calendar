'use strict';
var fs = require("fs")

module.exports = function (Prompt) {
  deletePrompt(Prompt)
  fileUpload(Prompt)
  // createPrompts(Prompt)

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
    })

  Prompt.remoteMethod(
    'createPrompts', {
      http: {path: '/:queueId/createPrompts', verb: 'get'},
      accepts: [
        {arg: 'queueId', type: 'number', require: true}
      ],
      returns: {arg: 'status', type: 'string'},
    })

    Prompt.createPrompts = (queueId) => {
      let filter = {where: {queueId: queueId}, order: 'index DESC', limit: 1}
      return Prompt.find(filter)
        .then(async function(res) {
          let prompts = await makePrompts(Prompt, queueId, res[0].index)
          return prompts
        })
    }
};


let makePrompts = (Prompt, queueId, index) => {
  let promptsArray = [{
      index: index + 1,
      language: "English",
      type: "office directions",
      enabled: false,
      queueId
    },
    {
      index: index + 2,
      language: "Spanish",
      type: "office directions",
      enabled: false,
      queueId
    }
  ]

  let actions = promptsArray.map(prompt => {
    return new Promise(function(resolve, reject) {
      Prompt.create(prompt)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  })
  return Promise.all(actions) 
}

function deletePrompt(Prompt) {
  Prompt.deleteFile = function (id, cb) {
    let res;
    Prompt.findById(id, function(err, instance){
      res = instance;
      if(!err){
        Prompt.destroyById(id, function(err){
          if (err) {
            res = err;
          } else {
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
  fs.unlink(`./server/storage/${file_path}`, (err) => {
    if (err) throw err;
    console.log(`${file_path} was deleted`);
  });
}

function fileUpload(Prompt) {
  return Prompt.upload = (promptFile) => {

    let buffer = promptFile.files[0].buffer;
    let fileName = promptFile.files[0].originalname;
    let path = Date.now() + "_" + fileName;

    return new Promise(function(resolve, reject){
      fs.writeFile(`./server/storage/${path}`, buffer, async function(err) {
        if (err) reject(err)
        let newPrompt = await updatePrompt(Prompt, path, fileName, promptFile.body)
        return resolve(newPrompt)
      })

    })
    .then(res => res)
    .catch(err => err)
  }
}

const updatePrompt = (Prompt, path, fileName, body) => {
  let where = {id: body.id}
  let data = {
      name: fileName,
      file_path: path,
      enabled: true
  }
  return new Promise(function(resolve, reject){
    Prompt.upsertWithWhere(where, data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
