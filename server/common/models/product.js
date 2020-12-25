'use strict';

module.exports = function (Product) {
  // Product.afterRemote("findById", async ctx => {
  //   const result = ctx.result;
  //   const category = await result.category.get();
  //   console.log(category);

  //   // category.name = category.__data.name
  //   if (category) ctx.result.categoryName = category.__data.name
  // })

  // Product.afterRemote('create', async function( ctx) {
  //   const result = ctx.result;
  //   const category = await result.category.get();

  //   // category.name = category.__data.name
  //   if (category) ctx.result.categoryName = category.__data.name;
  // })
};
