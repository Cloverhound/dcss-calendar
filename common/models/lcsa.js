'use strict';
var logger = require('../../server/logger')

module.exports = function(Lcsa) {
  Lcsa.validatesUniquenessOf('lcsa_id', {message: 'Lcsa Id already exists'});

  Lcsa.remoteMethod(
    'toggle', {
      http: {path: '/toggle', verb: 'put'},
      accepts: {arg: 'queue', type: 'any', http: {source: 'body'}},
      returns: {arg: 'status', type: 'any'},
  })

  Lcsa.toggle = (body) => {
    let where = {id: body.id}
    console.log('Toggling Lcsa ID: ', body.id);
    logger.info('Toggling Lcsa ID: ', {id: body.id});
    
    return Lcsa.upsertWithWhere(where, {lcsa_enabled: !body.bool})
      .then(res => res)
      .catch(err => err)
  }
};
