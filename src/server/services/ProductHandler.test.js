const expect = require('unexpected');

// TODO: ProductHandler should start with lowercase
const productHandler = require('./ProductHandler');
const Product = require('../../model/Product');

describe('Product Handler', () => {
  const sut = productHandler();
  const product1 = new Product('1', ['Bread'], ['kg'], true, 3, 'Food');

  context('given no products', () => {
    beforeEach(() => {
      sut.setProducts([]);
    });

    describe('when requesting the list of products', () => {
      it('should return an empty list', () => {
        expect(sut.getProductList(), 'to be empty');
      });
    });

    describe('when requesting to find a product by ID', () => {
      it('should return null', () => {
        expect(sut.findProductById(product1.id), 'to be falsy');
      });
    });
  });

  context('given products', () => {
    beforeEach(() => {
      sut.setProducts([product1]);
    });

    describe('when requesting the list of products', () => {
      it('should return the current list of products', () => {
        expect(sut.getProductList(), 'to equal', [product1]);
      });
    });

    describe('when requesting to find an existing product by ID', () => {
      it('should return the product', () => {
        expect(sut.findProductById(product1.id), 'to equal', product1);
      });
    });
  });
});
