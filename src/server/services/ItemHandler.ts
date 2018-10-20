
import Item from '../model/Item';
import Unity from '../model/Unity';
import { IItemDAO } from '../dao/IItemDAO';

export default class ItemHandler {
  constructor(readonly dao: IItemDAO) { }

  getList(userId: string): Promise<Item[]> {
    return this.dao.getItemListByUser(userId);
  }

  findItemById(idItem: string): Promise<Item | null> {
    return this.dao.getItemById(idItem);
  }

  async createNewItem(productId: string, unityItem: Unity, quantityItem: number, userId: string) {
    const date = new Date();
    await this.dao.createItem(productId, date, unityItem, quantityItem, userId);
  }

  async modifyItem(itemId: string, newUnityItem: Unity, newQuantityItem: number) {
    await this.dao.updateItem(itemId, newUnityItem, newQuantityItem);
  }

  async removeItemOfList(id: string) {
    await this.dao.deleteItem(id);
  }
}
