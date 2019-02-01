import Product from '../model/Product';
import Unit = require('../model/Unity');
import Category = require('../model/Category');

export interface IProductDAO {
  /**
   * Return registered and active products.
   * @returns {Promise} Promise object represent the list of registered products
   */
  fetchProducts(): Promise<Product[]>;
  /**
   * Return a product by id.
   * @param {string} id
   * @returns {Promise} Promise object represent the product information
   */
  fetchProductById(id: string): Promise<Product | null>;

  /**
   * Return the identifier of category.
   * @param {Category} name
   * @returns {Promise} Promise object represent the category data
   */
  getCategoryId(name: Category): Promise<string | null>;

  /**
   * Return the product identifier that has been created.
   * @param {boolean} perishable
   * @param {string[]} notificationOffset
   * @param {Unit[]} categoryId
   * @returns {Promise} Promise object represent the information of created product
   */
  createProduct(perishable: boolean,
                notificationOffset: number,
                categoryId: string): Promise<string | null>;

  /**
   * Register the names information of the product.
   * @param {string} productId
   * @param {string[]} names
   */
  registerNamesProduct(productId:string, names: string[]);

  /**
   * Register the units information of the product.
   * @param {string} productId
   * @param {Unit[]} units
   */
  registerUnitsProduct(productId:string, units: string[]);

  // TODO: modify json value as entry
  /**
   * Update a registered product.
   * @param {JSON} data
   */
  updateDataProduct?(data: JSON): Promise<Product>;
}
