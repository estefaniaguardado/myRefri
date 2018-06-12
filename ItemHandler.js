
// TODO: The list must be persisted in a DB, no in memory

class ItemHandler {
  constructor() {
    // TODO: Remove once the list is in the DB
    this.list = [];
  }

  getList() {
    return [...this.list];
  }

  createNewItem(itemName) {
    const itemId = Math.random().toString(36).substring(2, 5);
    const memoryList = this.list;
    memoryList.push({ id: itemId, name: itemName });
    this.list = memoryList;
  }

  modifyItem(id, newName) {
    const memoryList = this.list;
    const indexModifiedItem = memoryList.findIndex(item => item.id === id);
    memoryList[indexModifiedItem].name = newName;
    this.list = memoryList;
  }

  removeItemOfList(id) {
    const filterList = this.list.filter(item => item.id !== id);
    this.list = filterList;
  }
}

module.exports = ItemHandler;
