const Product = require('../../model/Product');
const Unity = require('../../model/Unity');
const Category = require('../../model/Category');

// TODO: Extract from DB using the DAO
const product1 = new Product('1', ['Bread'], [Unity.piece, Unity.kilogram, Unity.gram, Unity.pound, Unity.ounce], true, 3, Category.food);
const product2 = new Product('2', ['Beer'], [Unity.piece, Unity.liter, Unity.mililiter, Unity.quart, Unity.gallon], false, 0, Category.beverages);
const product3 = new Product('3', ['Aspirin'], [Unity.piece], false, 0, Category.pharmacy);

/**
 * @module Handler of product
 */
module.exports = () => {
  let products = [product1, product2, product3];

  /**
   * Set the available products into a local variable.
   * @function
   * @param {[Product]} newProducts
   */
  function setProducts(newProducts) {
    products = newProducts;
  }

  /**
   * Return registered and active products.
   * @function
   * @returns {[Product]} Array of products.
   */
  function getProductList() {
    return [...products];
  }

  /**
   * Return a product by id.
   * @function
   * @param {String} idProduct
   * @returns {Product} Product object
   */
  function findProductById(idProduct) {
    const detailsProduct = products.find(product => product.id === idProduct);

    return detailsProduct;
  }

  return {
    setProducts,
    getProductList,
    findProductById,
  };
};
