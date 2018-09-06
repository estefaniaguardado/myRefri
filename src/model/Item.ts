/**
 * Defines the properties of an item that user has set and added to his shopping list.
 * @typedef {object} Item
 */
import Product from './Product';
import unity from './Unity';

class Item {
  /**
   * @param {string} id - Item Identifier
   * @param {Product} product - Product reference to which the item belongs
   * @param {Date} date - Date item creation
   * @param {unity} unity - Selected item unit
   * @param {number} quantity - Selected item quantity
   * @param {boolean} active - Shopping status of item
   */

  id: string;
  product: Product;
  date!: Date;
  unity: unity;
  quantity: number;
  active: boolean;

  constructor(id: string, product: Product, date: Date, unity: unity, quantity: number, active: boolean) {
    this.id = id;
    this.product = product;
    this.date = date;
    this.unity = unity;
    this.quantity = quantity;
    this.active = active;
  }
}

export = Item;
