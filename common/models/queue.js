'use strict';

module.exports = function (Queue) {
  Queue.getAll = function (cb) {
    Queue.find(async function (err, instance) {
      var response = instance;
      let res = []
      for (let i = 0; i < response.length; i++) {
        let queue = response[i];
        let val = await new Promise(function (resolve, reject) {
          queue.schedule(function (err, tr) {
            resolve({
              queue,
              schedule: tr
            })
          })
        })
        res.push(val)
      }
      cb(null, res);
    });
  };

  Queue.remoteMethod(
    'getAll', {
      http: {
        path: '/getAll',
        verb: 'get',
      },
      returns: {
        arg: 'getAll',
        type: 'array',
      },
    }
  );
};
