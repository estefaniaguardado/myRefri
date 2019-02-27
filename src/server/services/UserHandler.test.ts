import expect from 'unexpected';
expect.clone();
import unexpectedSinon from 'unexpected-sinon';
expect.use(unexpectedSinon);
import sinon from 'sinon';

import UserDAO from '../dao/UserDAO';
import UserHandler from './UserHandler';

describe('User Handler', () => {
  let sut;
  let userDAO;
  let userMock;

  beforeEach(() => {
    userDAO = sinon.createStubInstance(UserDAO);

    sut = new UserHandler(userDAO);
  });

  context('when starting the system', () => {
    const usernameTest = 'test';
    const userId = '5jadsfn';
    const pass = 'testPass';
    const emailTest = 'test@example.com';
    let response;

    describe('when register a new user', () => {
      let idUserMock;

      beforeEach(async () => {
        idUserMock = sinon.mock();

        userDAO.createNewUser.resolves(idUserMock);

        response = await sut.registerUser(emailTest, usernameTest, pass);
      });

      it('should pass the user details', () =>
        expect(userDAO.createNewUser, 'was called with', emailTest, usernameTest, pass),
      );

      it('should return the registered user', () =>
        expect(response, 'to equal', {
          id: idUserMock,
          email: emailTest,
          username: usernameTest,
          password: pass,
        }),
      );
    });

    describe('when searching an user by id', () => {
      beforeEach(async () => {
        userMock = sinon.mock();

        userDAO.getUserById.resolves(userMock);

        response = await sut.findUserById(userId);
      });

      it('should pass the user identifier', () =>
        expect(userDAO.getUserById, 'was called with', userId),
      );

      it('should return the searched user', () =>
        expect(response, 'to be', userMock),
      );
    });

    describe('when searching an user by username', () => {
      beforeEach(async () => {
        userMock = sinon.mock();

        userDAO.getUserByUsername.resolves(userMock);

        response = await sut.findUserByUsername(usernameTest);
      });

      it('should pass the username', () => {
        expect(userDAO.getUserByUsername, 'was called with', usernameTest);
      });

      it('should return the searched user', () => {
        expect(response, 'to be', userMock);
      });
    });
  });
});
