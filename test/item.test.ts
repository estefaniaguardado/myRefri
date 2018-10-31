import expect from 'unexpected';
import supertest from 'supertest';

import Category from '../src/server/model/Category';
import Unit from '../src/server/model/Unity';
import app from '../src/server/index';

describe('Item API', () => {
  let agent;
  let response;
  let user;

  before(() => {
    agent = supertest.agent(app);
  });

  context('when not authorized User', () => {
    context('when access to shopping list view', () => {
      before(async () => {
        response = await agent
          .get('/item')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .expect(401);
      });

      it('should redirect to the login', async () => {
        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when fetching the item list', () => {
      before(async () => {
        response = await agent
          .get('/item')
          .set('Accept', 'application/json')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .expect(401);
      });

      it('should redirect to the login', () => {
        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when fetching the item by id', () => {
      before(async () => {
        response = await agent
          .get('/item/1')
          .set('Accept', 'application/json')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .expect(401);
      });

      it('should redirect to the login', async () => {
        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when create a new item', () => {
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
          .expect(401);
      });

      it('should redirect to the login', () => {
        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when update an item', () => {
      before(async () => {
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
      });

      it('should redirect to the login', () => {
        expect(response.headers.location, 'to be', '/login');
      });
    });

    context('when delete an item', () => {
      before(async () => {
        response = await agent
          .delete('/item/1')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .expect(401);
      });

      it('should redirect to the login', () => {
        expect(response.headers.location, 'to be', '/login');
      });
    });
  });

  context('when access authorized user', () => {
    before(async () => {
      user = { username: 'annie', password: 'hola' };
      response = await agent
      .post('/login')
      .send(user)
      .expect(302);
    });

    context('when the user has not items', () => {
      const itemId = 'aa87496c-0685-4de5-a169-4958e71e4d74';

      context('when access to shopping list view', () => {
        before(async () => {
          response = await agent
            .get('/item')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200);
        });

        it('should render the empty shopping list', () => {
          expect(response.text, 'not to contain', 'detailsItem');
        });
      });

      context('when fetching the item list', () => {
        before(async () => {
          response = await agent
            .get('/item')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);
        });

        it('should return the empty item list', () => {
          expect(response.body.result, 'to be empty');
        });
      });

      context('when fetching an item by id', () => {
        before(async () => {
          response = await agent
            .get(`/item/${itemId}`)
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(404);
        });

        it('should not return info', async () => {
          expect(response.body, 'to satisfy', { name: 'ERROR_ITEM_NOT_FOUND' });
        });
      });

      context('when update an item details', () => {
        before(async () => {
          response = await agent
            .put(`/item/${itemId}`)
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .send({
              unityItem: 'piece',
              quantityItem: 2,
            })
            .expect(400);
        });

        it('should not update any item', () => {
          expect(response.body, 'to satisfy', { message: 'ERROR_INCORRECT_DATA_ITEM_TO_UPDATE' });
        });
      });

      context('when delete an item', () => {
        before(async () => {
          response = await agent
            .delete(`/item/${itemId}`)
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(400);
        });

        it('should not delete any item', () => {
          expect(response.body, 'to satisfy', { message: 'ERROR_INCORRECT_DATA_ITEM_TO_REMOVE' });
        });
      });
    });

    context('when the user has at least one item', () => {
      let item;
      let product;

      before(async () => {
        response = await agent
          .post('/products/')
          .send({
            names: ['Milk'],
            units: [Unit.liter, Unit.mililiter, Unit.piece],
            perishable: true,
            notificationOffset: 5,
            category: Category.food,
          })
          .expect(200);

        product = response.body.product;

        response = await agent
          .post('/item')
          .set('Accept', 'application/json')
          .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
          .set('Expires', '-1')
          .set('Pragma', 'no-cache')
          .send({
            selectedProduct: product.id,
            unityItem: 'liter',
            quantityItem: 2,
          })
          .expect(200);

        item = response.body.result;
      });

      context('when access to shopping list view', () => {
        before(async () => {
          response = await agent
            .get('/item')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200);
        });

        it('should render the items', async () => {
          expect(response.text, 'to contain', item.id);
        });
      });

      context('when fetching the item list', () => {
        before(async () => {
          response = await agent
            .get('/item')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);
        });

        it('should return the item list', async () => {
          expect(response.body.result, 'to satisfy', [item]);
        });
      });

      context('when fetching an item by id', () => {
        before(async () => {
          response = await agent
            .get(`/item/${item.id}`)
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);
        });

        it('should return the item details', async () => {
          expect(response.body.result, 'to satisfy', item);
        });
      });

      context('when update the item details', () => {
        let updateItem;
        before(async () => {
          response = await agent
            .put(`/item/${item.id}`)
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .send({
              unityItem: 'mililiter',
              quantityItem: 1500,
            })
            .expect(200);

          updateItem = response.body.result;
        });

        it('should update the item', async () => {
          expect(updateItem, 'not to equal', item);
        });
      });

      context('when delete an item', () => {
        before(async () => {
          response = await agent
            .delete(`/item/${item.id}`)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);

          response = await agent
            .get('/item')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);
        });

        it('should remove the item of the shopping list', () => {
          expect(response.body.result, 'not to satisfy', [item]);
        });
      });

      context('when create a new item', () => {
        let newItem;

        before(async () => {
          response = await agent
            .post('/item')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .send({
              selectedProduct: product.id,
              unityItem: 'piece',
              quantityItem: 1,
            })
            .expect(200);

          newItem = response.body.result;

          response = await agent
            .get('/item')
            .set('Accept', 'application/json')
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Expires', '-1')
            .set('Pragma', 'no-cache')
            .expect(200);
        });

        it('should add a new item into the shopping list', () => {
          expect(response.body.result, 'to satisfy', [newItem]);
        });
      });
    });
  });
});
