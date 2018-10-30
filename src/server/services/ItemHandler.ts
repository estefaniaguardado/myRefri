
import Item from '../model/Item';
import Unit from '../model/Unity';
import { IItemDAO } from '../dao/IItemDAO';

export default class ItemHandler {
  constructor(readonly dao: IItemDAO) { }

  getList(userId: string): Promise<Item[]> {
    return this.dao.getItemListByUser(userId);
  }

  findItemById(idItem: string): Promise<Item | null> {
    return this.dao.getItemById(idItem);
  }

  async createNewItem(productId: string, unityItem: Unit, quantityItem: number, userId: string): Promise<Item | null> {
    const date = new Date();
    const itemId = await this.dao.createItem(productId, date, unityItem, quantityItem, userId);

    if (!itemId) throw new Error('ERROR_CREATING_NEW_ITEM');

    return await this.dao.getItemById(itemId['id']);
  }

  async modifyItem(itemId: string, newUnityItem: Unit, newQuantityItem: number): Promise<Item | null> {
    const item = await this.dao.getItemById(itemId);

    if (!item) throw new Error('ERROR_FETCHING_ITEM_TO_UPDATE');

    await this.dao.updateItem(itemId, newUnityItem, newQuantityItem);

    return await this.dao.getItemById(itemId);
  }

  async removeItemOfList(id: string) {
    const item = await this.dao.getItemById(id);

    if (!item) throw new Error('ERROR_FETCHING_ITEM_TO_DELETE');

    await this.dao.deleteItem(id);
  }
}
