const Products = require('../../database/Product');

module.exports = {
  getProductInfo({ selectedProduct }) {
    const productInfo = Products.find(product => product.id === Number(selectedProduct));
    return productInfo;
  },
};
