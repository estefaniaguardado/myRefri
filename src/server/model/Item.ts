/**
 * Defines the properties of an item that user has set and added to his shopping list.
 * @typedef {object} Item
 */
import Unity from './Unity';

export default interface Item {
  /**
   * Item Identifier
   */
  id: string;
  /**
   * Name of item
   */
  name: string;
  /**
   * Product reference to which the item belongs
   */
  productId: string;
  /**
   * Date item creation
   */
  date: Date;
  /**
   * Selected item unit
   */
  unity: Unity;
  /**
   * Selected item quantity
   */
  quantity: number;
  /**
   * Shopping status of item
   */
  active: boolean;
}
