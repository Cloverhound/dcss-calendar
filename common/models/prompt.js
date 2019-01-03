'use strict';
var fs = require("fs")

module.exports = function (Prompt) {
  deletePrompt(Prompt)
  fileUpload(Prompt)

  Prompt.remoteMethod(
    'upload', {
      http: { path: '/upload', verb: 'post' },
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
};

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
  // console.log("PROMPT : ", Object.getOwnPropertyNames(Prompt))
  Prompt.upload = function (promptFile, cb) {
    let buffer = promptFile.files[0].buffer;
    let fileName = promptFile.files[0].originalname;
    let path = Date.now() + "_" + fileName

    fs.writeFile(`./server/storage/${path}`, buffer, async (err) => {
      if (err) {
        cb(err)
      }
      let newPrompt = await createPrompt(Prompt, path, fileName, promptFile.body)
      cb(null, newPrompt)
    })
  }
}

async function createPrompt(Prompt, path, fileName, body) {
  const { queueId, language, type, enabled} = body
  let isTrue = (enabled == "true")
  let newPrompt = await new Promise(function (resolve, reject) {
    Prompt.create({
      name: fileName,
      language,
      type,
      enabled: isTrue,
      file_path: path,
      queueId: queueId
    }, function (createPromptErr, createdPrompt) {
      if (createPromptErr) {
        return reject(createPromptErr)
      }
      if (createdPrompt !== 'FAILED') {
       return resolve(createdPrompt)
      }
    })
  })
  return newPrompt
}
