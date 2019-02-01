import Item from '../model/Item';
import Unit from '../model/Unity';

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
   * Return the identifier of new item with the specified data and add it to the items list of the current user.
   * @param {Product} productId
   * @param {date} date
   * @param {Unit} unity
   * @param {number} quantity
   * @param {string} userId
   */
  createItem(productId: string, date: Date, unity: Unit, quantity: number, userId: string): Promise<string | null>;
  /**
   * Update an item with the new data in the items list of the current user.
   * @param {string} id
   * @param {Unit} unity - Updated unity of item
   * @param {number} quantity - Updated quantity of item
   */
  updateItem(id: string, unity: Unit, quantity: number);
  /**
   * Remove an existing item by ID of the items list of the current user.
   * @param {string} id
   */
  deleteItem(id: string);
}
