const expect = require('unexpected');

// TODO: ProductHandler should start with lowercase
const productHandler = require('./ProductHandler');

describe('Product Handler', () => {
  context('given no products', () => {
    let sut;

    beforeEach(() => {
      sut = productHandler();
      sut.setProducts([]);
    });

    describe('when requesting the list of products', () => {
      it('should return an empty list', () => {
        expect(sut.findProductsList(), 'to be empty');
      });
    });

    describe('when requesting to find a product by ID', () => {
      xit('should return null');
    });
  });

  context('given products', () => {
    describe('when requesting the list of products', () => {
      xit('should return the current list of products');
    });

    describe('when requesting to find an existing product by ID', () => {
      xit('should return the product');
    });
  });
});
