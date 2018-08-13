const supertest = require('supertest');
const expect = require('unexpected');

const app = require('../src/server/index');

describe('Item API', () => {
  let agent;
  let response;
  let user;

  before(() => {
    agent = supertest.agent(app);
  });

  context('when not authorized User', () => {
    context('when access to shopping list view', () => {
      it('should redirect to the login', async () => {
        response = await agent
          .get('/item')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .expect(401);

        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when fetching the item list', () => {
      it('should redirect to the login', async () => {
        response = await agent
          .get('/item')
          .set('Accept', 'application/json')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .expect(401);

        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when fetching the item by id', () => {
      it('should redirect to the login', async () => {
        response = await agent
          .get('/item/1')
          .set('Accept', 'application/json')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .expect(401);

        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when create a new item', () => {
      it('should redirect to the login', async () => {
        response = await agent
          .post('/item')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .send({
            selectedProduct: '1',
            unityItem: 'pz',
            quantityItem: 2,
          })
          .expect(401);

        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when update an item', () => {
      it('should redirect to the login', async () => {
        response = await agent
          .put('/item/1')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .send({
            unityItem: 'pz',
            quantityItem: 2,
          })
          .expect(401);

        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when delete an item', () => {
      it('should redirect to the login', async () => {
        response = await agent
          .delete('/item/1')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .expect(401);

        expect(response.headers.location, 'to be', '/login');
      });
    });
  });

  context('when accessing with the valid user', () => {
    before(async () => {
      user = { username: 'annie', password: 'hola' };
      response = await agent
        .post('/login')
        .send(user)
        .expect(302);
    });

    context('when the user has not items', () => {
      context('when access to shopping list view', () => {
        it('should render the empty shopping list', async () => {
          response = await agent
            .get('/item')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200);

          expect(response.text, 'not to contain', 'detailsItem');
        });
      });

      context('when fetching the item list', () => {
        it('should return the empty item list', async () => {
          response = await agent
            .get('/item')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);

          expect(response.body.result, 'to be empty');
        });
      });

      context('when fetching an item by id', () => {
        it('should not return info', async () => {
          response = await agent
            .get('/item/1')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(404);

          expect(response.body, 'to satisfy', { type: 'ERROR_ITEM_NOT_FOUND' });
        });
      });

      context('when update an item details', () => {
        it('should not update any item', async () => {
          response = await agent
            .put('/item/1')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .send({
              unityItem: 'pz',
              quantityItem: 2,
            })
            .expect(404);

          expect(response.body, 'to satisfy', { type: 'ERROR_ITEM_NOT_FOUND' });
        });
      });

      context('when delete an item', () => {
        it('should not delete any item', async () => {
          response = await agent
            .delete('/item/1')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(404);

          expect(response.body, 'to satisfy', { type: 'ERROR_ITEM_NOT_FOUND' });
        });
      });

      context('when create a new item', () => {
        it('should add a new item into the shopping list', async () => {
          response = await agent
            .post('/item')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .send({
              selectedProduct: '1',
              unityItem: 'pz',
              quantityItem: 2,
            })
            .expect(200);
        });
      });
    });

    context('when the user has at least one item', () => {
      let item1;

      before(async () => {
        response = await agent
          .post('/item')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .send({
            selectedProduct: '1',
            unityItem: 'pz',
            quantityItem: 2,
          })
          .expect(200);
      });

      context('when access to shopping list view', () => {
        it('should render the shopping list', async () => {
          response = await agent
            .get('/item')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200);

          expect(response.text, 'to contain', 'detailsItem');
        });
      });

      context('when fetching the item list', () => {
        it('should return the item list', async () => {
          response = await agent
            .get('/item')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);

          expect(response.body.result, 'to be non-empty')
            .and('to have an item satisfying', (item) => {
              item1 = item;
              expect(item.product.id, 'to be', '1');
            });
        });
      });

      context('when fetching an item by id', () => {
        it('should return the item details', async () => {
          response = await agent
            .get(`/item/${item1.id}`)
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);

          expect(response.body.result, 'to satisfy', item1);
        });
      });

      context('when update the item details', () => {
        it('should update the item', async () => {
          response = await agent
            .put(`/item/${item1.id}`)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .send({
              unityItem: 'L',
              quantityItem: 5,
            })
            .expect(200);

          const getUpdatedItem = await agent
            .get(`/item/${item1.id}`)
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);

          expect(getUpdatedItem.body.result, 'to satisfy', { unity: 'L', quantity: 5 });
        });
      });

      context('when delete an item', () => {
        it('should delete the item of the shopping list', async () => {
          response = await agent
            .delete(`/item/${item1.id}`)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);

          const getItemList = await agent
            .get('/item')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);

          expect(getItemList.body.result, 'not to satisfy', item1);
        });
      });

      context('when create a new item', () => {
        it('should add a new item into the shopping list', async () => {
          response = await agent
            .post('/item')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .send({
              selectedProduct: '2',
              unityItem: 'pz',
              quantityItem: 3,
            })
            .expect(200);
        });
      });
    });
  });
});
