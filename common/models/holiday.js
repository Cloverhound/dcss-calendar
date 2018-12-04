'use strict';

module.exports = function(Holiday) {
  Holiday.validatesUniquenessOf('name', {message: 'Name already exists'});
};
