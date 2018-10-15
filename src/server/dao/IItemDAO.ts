import Item from '../model/Item';
import Unity from '../model/Unity';

export interface IItemDAO {
  /**
   * Return items list of the current user.
   */
  getItemListByUser(userId: string): Promise<Item[]>;
  /**
   * Return an item by id inside the items list of the current user.
   * @param {string} id
   */
  getItemById(id: string): Promise<Item | null>;
  /**
   * Create a new item with the specified data and add it to the items list of the current user.
   * @param {Product} productId
   * @param {date} date
   * @param {Unity} unity
   * @param {number} quantity
   * @param {string} userId
   */
  createItem(productId: string, date: Date, unity: Unity, quantity: number, userId: string);
  /**
   * Modify an existing item with the new data in the items list of the current user.
   * @param {string} id
   * @param {Unity} unity - Updated unity of item
   * @param {number} quantity - Updated quantity of item
   */
  updateItem(id: string, unity: Unity, quantity: number);
  /**
   * Remove an existing item by ID of the items list of the current user.
   * @param {string} id
   */
  deleteItem(id: string);
}
