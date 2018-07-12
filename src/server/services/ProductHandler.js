const Product = require('../../model/Product');
const Unity = require('../../model/Unity');
const Category = require('../../model/Category');

// TODO: Extract from DB
const product1 = new Product('1', ['Bread'], [Unity.piece, Unity.kilogram, Unity.gram, Unity.pound, Unity.ounce], true, 3, Category.food);
const product2 = new Product('2', ['Beer'], [Unity.piece, Unity.liter, Unity.mililiter, Unity.quart, Unity.gallon], false, 0, Category.beverages);
const product3 = new Product('3', ['Aspirin'], [Unity.piece], false, 0, Category.pharmacy);


module.exports = (productList) => {
  const products = productList || [product1, product2, product3];

  function findProductsList() {
    return products;
  }

  function findProductInfo({ selectedProduct }) {
    const productInfo = JSON.parse(selectedProduct);

    return products.find(product => product.id === productInfo.id);
  }

  return {
    findProductInfo,
    findProductsList,
  };
};
