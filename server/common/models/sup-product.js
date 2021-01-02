'use strict';
const app = require('../../server/server')
const superProduct = require("./super-product");

module.exports = function(Supproduct) {
  Supproduct.afterRemote('create', async function( ctx) {
      const result = ctx.result;
      console.log(result)
      const superproduct = await result.superProduct.get();
      // let newColors = superproduct.__data.colors || [];
      // if (!newColors.includes(result.color)) {
      //   newColors.push(result.color)
      // }
      // await superproduct.updateAttributes({
      //   colors: newColors
      // })
      console.log(superproduct)

    //   // category.name = category.__data.name
    //   if (superproduct) {
    //     if (ctx.result.colors) 
    //       ctx.result.colors.push(superproduct.__data.) = category.__data.name;}
    
    // let index = superProduct.findIndex(item => item.id === superproduct.id)
  })

};
