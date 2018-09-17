import Product from '../model/Product';
import Unity from '../model/Unity';
import Category from '../model/Category';

// TODO: Extract from DB using the DAO
const product1 = new Product('1', ['Bread'], [Unity.piece, Unity.kilogram, Unity.gram, Unity.pound, Unity.ounce], true, 3, Category.food);
const product2 = new Product('2', ['Beer'], [Unity.piece, Unity.liter, Unity.mililiter, Unity.quart, Unity.gallon], false, 0, Category.beverages);
const product3 = new Product('3', ['Aspirin'], [Unity.piece], false, 0, Category.pharmacy);

/**
 * @module Handler of product
 */
export = () => {
  let products = [product1, product2, product3];

  /**
   * Set the available products into a local variable.
   * @param {[Product]} newProducts
   */
  function setProducts(newProducts: Array<Product>) {
    products = newProducts;
  }

  /**
   * Return registered and active products.
   * @returns {[Product]} Array of products.
   */
  function getProductList() {
    return [...products];
  }

  /**
   * Return a product by id.
   * @param {string} idProduct
   * @returns {Product} Product object
   */
  function findProductById(idProduct: string) {
    const detailsProduct = products.filter((product: Product) => product.id === idProduct);

    return detailsProduct[0];
  }

  return {
    setProducts,
    getProductList,
    findProductById,
  };
};
