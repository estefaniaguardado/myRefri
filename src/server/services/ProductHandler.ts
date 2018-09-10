import Product from '../model/Product';
import unity from '../model/Unity';
import category from '../model/Category';

// TODO: Extract from DB using the DAO
const product1 = new Product('1', ['Bread'], [unity.piece, unity.kilogram, unity.gram, unity.pound, unity.ounce], true, 3, category.food);
const product2 = new Product('2', ['Beer'], [unity.piece, unity.liter, unity.mililiter, unity.quart, unity.gallon], false, 0, category.beverages);
const product3 = new Product('3', ['Aspirin'], [unity.piece], false, 0, category.pharmacy);

/**
 * @module Handler of product
 */
export = () => {
  let products = [product1, product2, product3];

  /**
   * Set the available products into a local variable.
   * @param {[Product]} newProducts
   */
  function setProducts(newProducts: [Product]) {
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
