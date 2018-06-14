const expect = require('unexpected');

const ItemHandler = require('../ItemHandler');

describe('Item Handler', () => {
  let sut;
  let item1;
  let item2;

  beforeEach(() => {
    sut = new ItemHandler();
  });

  context('when starting the system', () => {
    it('should start with an empty list', () => {
      expect(sut.getList(), 'to be empty');
    });

    describe('adding the item1', () => {
      beforeEach(() => {
        item1 = sut.createNewItem('item1');
      });

      it('should return the item1', () => {
        expect(sut.getList(), 'to satisfy', [item1]);
      });

      describe('when adding the same item again', () => {
        beforeEach(() => {
          item2 = sut.createNewItem('item1');
        });

        it('should have two of the same items', () => {
          expect(sut.getList(), 'to satisfy', [item1, item2]);
        });
      });

      describe('when modify the item1', () => {
        beforeEach(() => {
          item1 = sut.modifyItem(item1.id, { name: 'modifiedItem1' });
        });

        it('should not change the list', () => {
          expect(sut.getList(), 'to satisfy', [item1]);
        });

        it('should rename the item name', () => {
          expect(item1.name, 'to be', 'modifiedItem1');
        });
      });

      describe('when remove the item1', () => {
        beforeEach(() => {
          sut.removeItemOfList(item1.id);
        });

        it('should not have the item1', () => {
          expect(sut.getList(), 'to be empty');
        });
      });
    });
  });
});
