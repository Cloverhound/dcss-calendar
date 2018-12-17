'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();

module.exports = function (Prompt) {
  s3Delete(Prompt)
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

function s3Delete(Prompt) {
  // Prompt.deleteFile = function (id, cb) {
  //   Prompt
  //   cb(null, id)
  // }
}

function s3Upload(Prompt) {
  // console.log("PROMPT : ", Object.getOwnPropertyNames(Prompt))
  Prompt.upload = function (promptFile, cb) {
    const { queueId, language, type, enabled} = promptFile.body
    let fileName = promptFile.files[0].originalname
    let buffer = promptFile.files[0].buffer
    let response;
    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer
    };

    s3.upload(params, async function (err, data) {
      //handle error
      if (err) {
        console.log("Error", err);
        response = err
      }
      //success
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
        resolve(createPromptErr)
        return createPromptErr
      }

      if (createdPrompt !== 'FAILED') {
        resolve(createdPrompt)
        return createdPrompt
      }
    })
  })
  return newPrompt
}
