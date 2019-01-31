'use strict';

module.exports = function(Lcsa) {
  Lcsa.validatesUniquenessOf('lcsa_id', {message: 'Lcsa Id already exists'});
};
