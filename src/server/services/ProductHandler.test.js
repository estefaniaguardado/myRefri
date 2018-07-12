const expect = require('unexpected');

// TODO: ProductHandler should start with lowercase
const productHandler = require('./ProductHandler');
const Product = require('../../model/Product');

describe('Product Handler', () => {
  const sut = productHandler();
  let product1;
  let product2;

  context('given no products', () => {
    beforeEach(() => {
      sut.setProducts([]);
      product1 = new Product('1', ['Bread'], ['kg'], true, 3, 'Food');
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
    beforeEach(() => {
      product2 = new Product('2', ['Aspirin'], ['pz'], false, 0, 'Pharmacy');
      sut.setProducts([product1, product2]);
    });

    describe('when requesting the list of products', () => {
      it('should return the current list of products', () => {
        expect(sut.getProductList(), 'to equal', [product1, product2]);
      });
    });

    describe('when requesting to find an existing product by ID', () => {
      it('should return the product', () => {
        expect(sut.findProduct(product2), 'to equal', product2);
      });
    });
  });
});
