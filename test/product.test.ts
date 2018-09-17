const expect = require('unexpected');
import supertest from 'supertest';

const app = require('../src/server/index');

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

    context('when accessing with the valid user', () => {
      let response;
      before(async () => {
        user = { username: 'annie', password: 'hola' };
        response = await agent
          .post('/login')
          .send(user)
          .expect(302);
      });

      context('when fetching the product by id', () => {
        it('should return the product info', async () => {
          response = await agent
            .get('/products/1')
            .expect(200);

          expect(response.body, 'to satisfy', {
            id: '1',
            unities: ['pz', 'kg', 'gr', 'lb', 'oz'],
          });
        });
      });
    });
  });
});
