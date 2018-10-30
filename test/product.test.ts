import expect from 'unexpected';
import supertest from 'supertest';

import Unit from '../src/server/model/Unity';
import Category from '../src/server/model/Category';
import app from '../src/server/index';

describe('Product API', () => {
  let user;
  let agent;

  before(() => {
    agent = supertest.agent(app);
  });

  context('when not authorized User', () => {
    context('when fetching the product by id', () => {
      it('should redirect to the login', async () => {
        const response = await agent
          .get('/products/1')
          .expect(401);

        expect(response.headers.location, 'to be', '/login');
      });
    });
  });

    // TODO: Support user creation - issue #55
  context('when accessing with authorized user', () => {
    before(async () => {
      user = { username: 'annie', password: 'hola' };
      await agent
        .post('/login')
        .send(user)
        .expect(302);
    });

    context('when exist at least one product', () => {
      let response;
      let product;
      before(async () => {
        response = await agent
          .post('/products/')
          .send({
            names: ['Milch'],
            units: [Unit.liter],
            perishable: true,
            notificationOffset: 5,
            category: Category.food,
          })
          .expect(200);

        product = response.body.product;
      });

      context('when fetch products', async () => {
        it('should return the registered products', async () => {
          response = await agent
            .get('/products')
            .expect(200);

          expect(response.body, 'not to be empty');
        });
      });

      context('when fetching the product by id', () => {
        it('should return the product info', async () => {
          response = await agent
            .get(`/products/${product.id}`)
            .expect(200);

          expect(response.body.id, 'to be', product.id);
        });
      });
    });
  });
});
