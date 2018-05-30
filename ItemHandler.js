
// TODO: The list must be persisted in a DB, no in memory
const memoryList = [];

class ItemHandler {
    constructor() {
        // TODO: Remove once the list is in the DB
        if (memoryList.length) return;

        for (let index = 0; index < 20; index++) {
            const name = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 15);
            memoryList.push({ index, name });
        }
    }

    getList() {
        return [...memoryList];
    }

    removeItemOfList(index) {
        if (typeof index !== 'number' || index < 0 || index >= memoryList.length ) return;

        memoryList.splice(index, 1);
    }
}

module.exports = ItemHandler;
