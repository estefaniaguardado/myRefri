import { IItemDAO } from '../dao/IItemDAO';
import Item from '../model/Item';
import Unit from '../model/Unity';
import pgPromise from 'pg-promise';

export default class ItemDAO implements IItemDAO {
  constructor(readonly db: pgPromise.IDatabase<{}>) {}

  async getItemListByUser(userId: string): Promise<Item[]> {
    try {
      const query = `SELECT i.id, i.product_id, i.added, i.unit, i.quantity, i.active, pn."name" FROM main.user_list ul
      INNER JOIN main.item i ON i.list_id = ul.list_id
      INNER JOIN main.product_name pn on pn.product_id = i.product_id
      INNER JOIN main."user" u ON u.id = ul.user_id WHERE u.id = $1`;
      const data = await this.db.manyOrNone(query, [userId]);

      if (!data) return data;

      const items: Item[] = [];

      // TODO: Review when product have more than one name and returns an array of names to item query
      for (const result of data) {
        const { id, name, product_id: productId, added: date, unit: unity, quantity, active } = result;

        items.push({
          id,
          productId,
          date,
          unity,
          quantity,
          active,
          name,
        });
      }

      return items;
    } catch (error) {
      console.error('Error fetching items', error);
      throw new Error('ERROR_FETCHING_ITEMS');
    }
  }

  async getItemById(id: string): Promise<Item | null> {
    try {
      const query = `SELECT i.id, i.product_id, i.added, i.unit, i.quantity, i.active, pn.name FROM main.item i
      INNER JOIN main.product_name pn on pn.product_id = i.product_id WHERE i.id = $1`;
      const data = await this.db.oneOrNone(query, [id]);

      if (!data) return null;

      const item: Item = {
        id: data.id,
        name: data.name,
        productId: data.product_id,
        date: data.added,
        unity: data.unit,
        quantity: data.quantity,
        active: data.active,
      };

      return item;
    } catch (error) {
      console.error('Error fetching item by Id', error);
      throw new Error('ERROR_FETCHING_ITEM');
    }
  }

  // TODO: Review the userId as parameter to identigy list(s)
  async createItem(productId: string, date: Date, unity: Unit, quantity: number, userId: string): Promise<string | null> {
    try {
      const query = `INSERT INTO main.item (product_id, added, unit, quantity, list_id, active)
      VALUES ($1, $2, $3, $4, (SELECT ul.list_id FROM main.user_list ul WHERE ul.user_id = $5), true) RETURNING id`;
      const data = await this.db.oneOrNone(query, [productId, date, unity, quantity, userId]);

      if (!data) return null;

      return data;
    } catch (error) {
      console.error('Error creating Item', error);
      throw new Error('ERROR_CREATING_ITEM');
    }
  }

  async updateItem(id: string, unity: Unit, quantity: number) {
    try {
      const query = 'UPDATE main.item SET unit = $1, quantity = $2 where id = $3';

      return await this.db.none(query, [unity, quantity, id]);
    } catch (error) {
      console.error('Error updating Item', error);
      throw new Error('ERROR_UPDATING_ITEM');
    }
  }

  async deleteItem(id: string) {
    try {
      const query = 'DELETE FROM main.item WHERE id = $1';

      return await this.db.none(query, [id]);
    } catch (error) {
      console.error('Error deleting Item', error);
      throw new Error('ERROR_DELETING_ITEM');
    }
  }

}
