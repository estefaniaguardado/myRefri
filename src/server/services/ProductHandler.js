const Products = require('../../database/Product');

function findProductsList() {
  return Products;
}

function findProductInfo({ selectedProduct }) {
  const productInfo = Products.find(product => product.id === Number(selectedProduct));
  return productInfo;
}

module.exports = {
  findProductInfo,
  findProductsList,
};
