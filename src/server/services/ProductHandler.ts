import Product from '../model/Product';
import { IProductDAO } from '../dao/IProductDAO';

/**
 * @module Handler of product
 */
export default class ProductHandler {
  constructor(readonly dao: IProductDAO) {}

  /**
   * Return registered and active products.
   * @returns {[Product]} Array of products.
   */
  fetchProductList(): Promise<Product[]> {
    return this.dao.getProducts();
  }

  /**
   * Return a product by id.
   * @param {string} idProduct
   * @returns {Product} Product object
   */
  findProductById(idProduct: string): Promise<Product | null> {
    return this.dao.getProductById(idProduct);
  }
}
