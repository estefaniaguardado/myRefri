const expect = require('unexpected');

const ItemHandler = require('../ItemHandler');

const Item = require('../model/Item');

describe('Item Handler', () => {
  let sut;

  beforeEach(() => {
    sut = new ItemHandler();
  });

  context('when starting the system', () => {
    it('should start with an empty list', () => {
      expect(sut.getList(), 'to be empty');
    });

    describe('adding the item1', () => {
      beforeEach(() => {
        const item1 = new Item('1', 'item1');
        sut.createNewItem(item1);
      });

      it('should return the item1', () => {
        expect(sut.getList(), 'to satisfy', [new Item('1', 'item1')]);
      });

      describe('when adding the same item again', () => {
        beforeEach(() => {
          const item1 = new Item('2', 'item1');
          sut.createNewItem(item1);
        });

        it('should have two of the same items', () => {
          expect(sut.getList(), 'to satisfy', [new Item('1', 'item1'), new Item('2', 'item1')]);
        });
      });
    });

    describe('when modify the item1', () => {
      beforeEach(() => {
        const item1 = new Item('1', 'item1');
        sut.createNewItem(item1);
        item1.name = 'modifiedItem1';
        sut.modifyItem(item1);
      });

      it('should have the new data of item1', () => {
        expect(sut.getList(), 'to satisfy', [new Item('1', 'modifiedItem1')]);
      });
    });

    describe('when remove the item1', () => {
      beforeEach(() => {
        const item1 = new Item('1', 'item1');
        sut.createNewItem(item1);
        sut.removeItemOfList('1');
      });

      it('should not have the item1', () => {
        expect(sut.getList(), 'not to contain', [new Item('1', 'item1')]);
      });
    });
  });
});
