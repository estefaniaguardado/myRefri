import expect from 'unexpected';
expect.clone();
import unexpectedSinon from 'unexpected-sinon';
expect.use(unexpectedSinon);
import sinon from 'sinon';

// TODO: ProductHandler should start with lowercase
import ProductHandler from './ProductHandler';
import Unity from '../model/Unity';
import Category from '../model/Category';
import ProductDAO from '../dao/ProductDAO';

describe.only('Product Handler', () => {
  let sut;
  let productDAO;

  beforeEach(() => {
    productDAO = sinon.createStubInstance(ProductDAO);

    sut = new ProductHandler(productDAO);
  });

  context('given no products', () => {
    beforeEach(() => productDAO.fetchProducts.resolves([]));

    describe('when requesting the list of products', () => {
      it('should return an empty list', () =>
        expect(sut.fetchProductList(), 'to be fulfilled with', []),
      );
    });

    describe('when requesting to find a product by ID', () => {
      const productId = '1dfad';
      beforeEach(() => productDAO.fetchProductById.resolves(null));

      it('should return null', () => {
        expect(sut.findProductById(productId), 'to be fulfilled with', null);
      });
    });
  });

  context('given products', () => {
    const productMock = sinon.mock();
    const productId = '1eaeaf';
    let response;

    describe('when create a new product', () => {
      const names = ['Bread'];
      const units = [Unity.kilogram];
      const perishable = true;
      const notificationOffset = 3;
      const category = Category.food;
      const categoryId = '1dasv';

      beforeEach(async () => {
        productDAO.getCategoryId.resolves(categoryId);
        productDAO.createProduct.resolves(productId);
        productDAO.registerNamesProduct.resolves();
        productDAO.registerUnitsProduct.resolves();
        productDAO.fetchProductById.resolves(productMock);

        response = await sut.registerProduct(names, units, perishable, notificationOffset, category);
      });

      it('should pass the category product', () => {
        expect(productDAO.getCategoryId, 'was called with', category);
      });

      it('should pass the name or names for the product', () => {
        expect(productDAO.registerNamesProduct, 'was called with', productId, names);
      });

      it('should pass the unit or units for the product', () => {
        expect(productDAO.registerUnitsProduct, 'was called with', productId, units);
      });

      it('should pass additional product details', () =>
        expect(productDAO.createProduct, 'was called with', perishable, notificationOffset, categoryId),
      );

      it('should pass the identifier of the created product', () => {
        expect(productDAO.fetchProductById, 'was called with', productId);
      });

      it('should return the new product', () =>
        expect(response, 'to be', productMock),
      );
    });

    describe('when requesting the list of products', () => {
      beforeEach(() => productDAO.fetchProducts.resolves([productMock]));

      it('should return the current list of products', () => {
        expect(sut.fetchProductList(), 'to be fulfilled with', [productMock]);
      });
    });

    describe('when requesting to find an existing product by ID', () => {
      beforeEach(async () => {
        productDAO.fetchProductById.resolves(productMock);

        response = await sut.findProductById(productId);
      });

      it('should return the product', () => {
        expect(response, 'to be', productMock);
      });
    });
  });
});
