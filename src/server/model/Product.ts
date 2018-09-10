/**
 * Defines the properties of a product, which specifies additional
 * characteristics or properties that define an item.
 * @typedef {object} Product
 */

import unity from './Unity';
import category from './Category';

class Product {
  /**
   * @param {string} id - Product Identifier
   * @param {array} names - Potential names to identify a product
   * @param {[Unity]} unities - Potential units to size a product
   * @param {boolean} perishable - Define perishable possibility of a product
   * @param {number} notificationOffset - Days limit to consume a product when it is perishable
   * @param {Category} category - Define category to classify a product
   */
  id: string;
  names: [string];
  unities: Array<unity>;
  perishable: boolean;
  notificationOffset: number;
  category: category;

  constructor(id: string, names: [string], unities: Array<unity>, perishable: boolean, notificationOffset: number, category: category) {
    this.id = id;
    this.names = names;
    this.unities = unities;
    this.perishable = perishable;
    this.notificationOffset = notificationOffset;
    this.category = category;
  }
}

export = Product;
