'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();

module.exports = function (Prompt) {
  deletePrompt(Prompt)
  s3Upload(Prompt)

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
        Prompt.destroyById(id, async function(err){
          if (err) {
            res = err;
          } else {
           res = await s3Delete(instance.name)
          }
        })
      } else {
        res = err;
      }
      cb(null, res)
    })
  }
}

async function s3Delete(fileName) {
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME, 
    Key: fileName
   };
   let deletePromise = await new Promise(function(resolve, reject) {
     s3.deleteObject(params, function (err, data) {
       if (err) {
         return reject({
           err,
           stack: err.stack
         })
       } else {
         return resolve(data)
       }
     });
   })
   return deletePromise
}

function s3Upload(Prompt) {
  // console.log("PROMPT : ", Object.getOwnPropertyNames(Prompt))
  Prompt.upload = function (promptFile, cb) {
    let fileName = promptFile.files[0].originalname
    let buffer = promptFile.files[0].buffer
    let response;
    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer
    };

    s3.upload(params, async function (err, data) {
      if (err) {
        console.log("Error", err);
        response = err
      }
      if (data) {
        let newPrompt = await createPrompt(Prompt, data.Location, fileName, promptFile.body)
        response = newPrompt
      }
      cb(null, response)
    });
  }
}

async function createPrompt(Prompt, url, fileName, body) {
  const { queueId, language, type, enabled} = body
  let isTrue = (enabled == "true")
  let newPrompt = await new Promise(function (resolve, reject) {
    Prompt.create({
      name: fileName,
      language: language,
      type: type,
      enabled: isTrue,
      url,
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
