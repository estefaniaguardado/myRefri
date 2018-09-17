const expect = require('unexpected');

// TODO: ProductHandler should start with lowercase
import productHandler from './ProductHandler';
import Product from '../model/Product';
import Unity from '../model/Unity';
import Category from '../model/Category';

describe('Product Handler', () => {
  const sut = productHandler();
  const product1 = new Product('1', ['Bread'], [Unity.kilogram], true, 3, Category.food);

  context('given no products', () => {
    beforeEach(() => {
      sut.setProducts(Array<Product>());
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
