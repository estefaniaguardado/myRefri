
// TODO: The list must be persisted in a DB, no in memory

class ItemHandler {
  constructor() {
    // TODO: Remove once the list is in the DB
    this.list = [];
  }

  getList() {
    return [...this.list];
  }

  createNewItem(item) {
    const memoryList = this.list;
    memoryList.push(item);
    this.list = memoryList;
  }

  modifyItem(item) {
    const memoryList = this.list;
    const indexModifiedItem = memoryList.findIndex(previousItem => previousItem.id === item.id);
    memoryList[indexModifiedItem] = item;
    this.list = memoryList;
  }

  removeItemOfList(id) {
    const filterList = this.list.filter(item => item.id !== id);
    this.list = filterList;
  }
}

module.exports = ItemHandler;
