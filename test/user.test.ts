import expect from 'unexpected';
import supertest from 'supertest';

import app from '../src/server/index';

describe('User API', () => {
  let agent;
  let response;
  let user;

  before(() => {
    agent = supertest.agent(app);
  });

  context('when user sign up in the system', () => {
    before(async() => {
      user = { email: 'test1@example.com', username: 'test1', password: 'test1' };
      response = await agent
        .post('/signup')
        .send(user)
        .expect(302);
    });

    it('should redirect to the item view', async () => {
      expect(response.headers.location, 'to be', '/item');
    });

    it('should render an empty items list', () => {
      expect(response.text, 'not to contain', 'detailsItem');
    });
  });
});
