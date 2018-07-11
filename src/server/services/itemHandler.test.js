const expect = require('unexpected');

const ItemHandler = require('./ItemHandler');

const Product = require('../../model/Product');
const Unity = require('../../model/Unity');
const Category = require('../../model/Category');

describe('Item Handler', () => {
  let sut;
  let item1;
  let item2;
  let itemData;
  const product = new Product('1', ['Bread'], [Unity.piece, Unity.kilogram, Unity.gram, Unity.pound, Unity.ounce], true, 3, Category.food);

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
