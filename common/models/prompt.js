'use strict';

module.exports = function(Prompt) {
  Prompt.remoteMethod(
    'upload', {
      http: {path: '/upload', verb: 'post'},
      accepts: {arg: 'path', type: 'string'},
      returns: {arg: 'status', type: 'string'},
    }
  )

  Prompt.upload = function(promptFile, cb) {
    console.log("promptFile", promptFile)
  }
};
