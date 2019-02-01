/**
 * Defines the properties of a product, which specifies additional
 * characteristics or properties that define an item.
 * @typedef {object} Product
 */

import Unit from './Unity';
import Category from './Category';

export default interface Product {
  /**
  * Product Identifier
  */
  id: string;
  /**
   * Potential names to identify a product
   */
  names: string[];
  /**
   * Potential units to size a product
   */
  units: Unit[];
  /**
   * Define perishable possibility of a product
   */
  perishable: boolean;
  /**
   * Days limit to consume a product when it is perishable
   */
  notificationOffset: number;
  /**
   * Define category to classify a product
   */
  category: Category;
}
