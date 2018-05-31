
// TODO: The list must be persisted in a DB, no in memory

class ItemHandler {
  constructor() {
    // TODO: Remove once the list is in the DB
    const memoryList = [];

    for (let index = 0; index < 20; index += 1) {
      const name = Math.random().toString(36).substring(2, 7);
      memoryList.push({ index, name });
    }
    this.list = memoryList;
  }
  getList() {
    return [...this.list];
  }
  removeItemOfList(index) {
    const memoryList = this.list;

    if (typeof index !== 'number' || index < 0 || index >= memoryList.length ) return;
    memoryList.splice(index, 1);
    this.list = memoryList;
  }
}

module.exports = ItemHandler;