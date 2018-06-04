
// TODO: The list must be persisted in a DB, no in memory

class ItemHandler {
  constructor() {
    // TODO: Remove once the list is in the DB
    const memoryList = [];

    for (let index = 0; index < 5; index += 1) {
      const id = Math.random().toString(36).substring(2, 5);
      const name = Math.random().toString(36).substring(2, 7);
      memoryList.push({ id, name });
    }
    this.list = memoryList;
  }

  getList() {
    return [...this.list];
  }

  createNewItem(itemName) {
    const itemId = Math.random().toString(36).substring(2, 5);
    const item = { itemId, itemName };
    const memoryList = this.list;
    memoryList.push(item);
    this.list = memoryList;
  }

  removeItemOfList(id) {
    const memoryList = this.list;
    const filterList = memoryList.filter(item => item.id !== id);
    this.list = filterList;
  }
}

module.exports = ItemHandler;
