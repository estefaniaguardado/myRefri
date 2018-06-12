const expect = require('unexpected');

const ItemHandler = require('../ItemHandler');

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
        sut.createNewItem('item1');
      });

      it('should return the item1', () => {
        expect(sut.getList(), 'to satisfy', [{ name: 'item1' }]);
      });

      describe('when adding the same item again', () => {
        beforeEach(() => {
          sut.createNewItem('item1');
        });

        it('should have two of the same items', () => {
          expect(sut.getList(), 'to satisfy', [{ name: 'item1' }, { name: 'item1' }]);
        });
      });
    });
  });
});
