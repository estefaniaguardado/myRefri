const expect = require('unexpected');

const ItemHandler = require('./ItemHandler');

const Product = require('../../model/Product');

describe('Item Handler', () => {
  let sut;
  let item1;
  let item2;
  let itemData;
  const product = new Product('1');

  beforeEach(() => {
    sut = new ItemHandler();
  });

  context('when starting the system', () => {
    it('should start with an empty list', () => {
      expect(sut.getList(), 'to be empty');
    });

    describe('adding the item1', () => {
      beforeEach(() => {
        itemData = { unityItem: 'pz', quantityItem: 2 };
        item1 = sut.createNewItem(product, itemData);
      });

      it('should return the item1', () => {
        expect(sut.getList(), 'to satisfy', [item1]);
      });

      describe('when adding another item again of the same product type', () => {
        beforeEach(() => {
          itemData = { unityItem: 'kg', quantityItem: 1 };
          item2 = sut.createNewItem(product, itemData);
        });

        it('should have two items of the same product type', () => {
          expect(sut.getList(), 'to satisfy', [item1, item2]);
        });
      });

      describe('when modify the item1', () => {
        beforeEach(() => {
          sut.modifyItem(item1.id, 'pz', 2);
        });

        it('should not change the list', () => {
          expect(sut.getList(), 'to satisfy', [item1]);
        });

        it('should modify the item unity', () => {
          expect(item1.unity, 'to be', 'pz');
        });

        it('should modify the item quantity', () => {
          expect(item1.quantity, 'to be', 2);
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
