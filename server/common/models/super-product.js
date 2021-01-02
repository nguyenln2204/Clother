'use strict';

module.exports = function(Superproduct) {
  Superproduct.afterRemote('prototype.__create__supProducts', async ctx => {
    console.log('create product')
  })
};
