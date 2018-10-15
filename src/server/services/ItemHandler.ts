
import Item from '../model/Item';
import Unity from '../model/Unity';
import Product from '../model/Product';
import { IItemDAO } from '../dao/IItemDAO';
// TODO: The list must be persisted in a DB, no in memory

export default class ItemHandler {
  constructor(readonly dao: IItemDAO) { }

  getList(userId: string): Promise<Item[]> {
    return this.dao.getItemListByUser(userId);
  }

  findItemById(idItem: string): Promise<Item | null> {
    return this.dao.getItemById(idItem);
  }

  createNewItem(productId: string, unityItem: Unity, quantityItem: number, userId: string) {
    const date = new Date();
    return this.dao.createItem(productId, date, unityItem, quantityItem, userId);
  }

  modifyItem(itemId: string, newUnityItem: Unity, newQuantityItem: number) {
    return this.dao.updateItem(itemId, newUnityItem, newQuantityItem);
  }

  removeItemOfList(id: string) {
    return this.dao.deleteItem(id);
  }
}
