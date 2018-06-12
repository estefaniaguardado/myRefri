const assert = require('assert');

const ItemHandler = require('../ItemHandler');

const itemHandler = new ItemHandler();

describe('Item Handler', () => {
  describe('#createNewList', () => {
    it('should return true when exist the list', () => {
      assert.notEqual(itemHandler.getList(), []);
    });
  });
  describe('#addNewItem', () => {
    it('should return true when exist added item into the list', () => {
      const newItem = 'adfadsf';
      itemHandler.createNewItem(newItem);
      const updatedItems = itemHandler.getList();
      assert.equal(updatedItems.some(item => item.name === newItem), true);
    });
  });
});
