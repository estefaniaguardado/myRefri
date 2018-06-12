const assert = require('assert');

const ItemHandler = require('../ItemHandler');

describe('Item Handler', () => {
  const itemHandler = new ItemHandler();
  describe('#createNewList', () => {
    it('should return a new List', () => {
      assert.notEqual(itemHandler.getList().length, 0);
    });
  });
});
