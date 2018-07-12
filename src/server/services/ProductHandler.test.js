const expect = require('unexpected');

// TODO: ProductHandler should start with lowercase
const productHandler = require('./ProductHandler');
const Product = require('../../model/Product');

describe('Product Handler', () => {
  const sut = productHandler();
  let product1;

  context('given no products', () => {
    beforeEach(() => {
      sut.setProducts([]);
      product1 = new Product('1', ['Bread'], 'kg', true, 3, 'Food');
    });

    describe('when requesting the list of products', () => {
      it('should return an empty list', () => {
        expect(sut.getProductList(), 'to be empty');
      });
    });

    describe('when requesting to find a product by ID', () => {
      it('should return null', () => {
        expect(sut.findProduct(product1), 'to be null');
      });
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
