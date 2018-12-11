'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var s3 = new AWS.S3();

module.exports = function(Prompt) {
  s3Upload(Prompt)
  
  Prompt.remoteMethod(
    'upload', {
      http: {path: '/upload', verb: 'post'},
      accepts: [
        {
        arg: 'req', type: 'object', http: function (ctx) {
            return ctx.req;
        }
        }],
      returns: {arg: 'res', type: 'string'},
    }
  )
};

function s3Upload(Prompt) {
  Prompt.upload = function(promptFile, cb) {
    var response;
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key : promptFile.files[0].originalname,
      Body : promptFile.files[0].buffer
    };

    s3.upload(params, function (err, data) {
      //handle error
      if (err) {
        console.log("Error", err);
        response = err
      }
      //success
      if (data) {
        console.log("Uploaded in:", data.Location);
        response = data.Location
      }
      cb(null, response)
    });
  }
}