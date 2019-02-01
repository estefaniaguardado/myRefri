import Product from '../model/Product';
import { IProductDAO } from '../dao/IProductDAO';
import Category = require('../model/Category');
import Unit = require('../model/Unity');

/**
 * @module Handler of product
 */
export default class ProductHandler {
  constructor(readonly dao: IProductDAO) {}

  /**
   * Return registered and active products.
   * @returns {Promise} Promise object represents the array of products.
   */
  async fetchProductList(): Promise<Product[]> {
    return this.dao.fetchProducts();
  }

  /**
   * Return a product by id.
   * @param {string} idProduct
   * @returns {Promise} Promise object represents the found product
   */
  findProductById(idProduct: string): Promise<Product | null> {
    return this.dao.fetchProductById(idProduct);
  }

  /**
   * Return the id of created product
   * @param {string} name
   * @param {Unit[]} units
   * @param {boolean} perishable
   * @param {number} notificationOffset
   * @param {Category} category
   * @returns {Promise} Promise object represents the created product id
   */
  async registerProduct(names: string[],
                        units: Unit[],
                        perishable: boolean,
                        notificationOffset: number,
                        category: Category): Promise<Product | null> {
    const categoryId = await this.dao.getCategoryId(category);

    if (!categoryId) throw new Error('ERROR_GETTING_CATEGORY_INFORMATION');

    const productId = await this.dao.createProduct(perishable, notificationOffset, categoryId);

    if (!productId) throw new Error('ERROR_REGISTERING_PRODUCT');

    await this.dao.registerNamesProduct(productId, names);
    await this.dao.registerUnitsProduct(productId, units);

    return await this.dao.fetchProductById(productId);
  }
}
