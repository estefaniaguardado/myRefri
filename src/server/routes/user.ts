import { Request, Response, NextFunction } from 'express';
import expressPromiseRouter from 'express-promise-router';

const router = expressPromiseRouter();

// TODO: Implement Dependency Injection
import logger from '../logger';
import { db } from '../db/connector';
import UserDAO from '../dao/UserDAO';
import ItemDAO from '../dao/ItemDAO';
import DetailsError from '../DetailsError';
import UserHandler from '../services/UserHandler';
import ItemHandler from '../services/ItemHandler';

const log = logger('UserService');
const userDAO = new UserDAO(db);
const itemDAO = new ItemDAO(db);
const userHandler = new UserHandler(userDAO);
const itemHandler = new ItemHandler(itemDAO);

/**
 * @memberof Router.user
 * Register a new user.
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
async function registerNewUser(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email;
  const pass = req.body.password; // validate repeat password
  const username = req.body.username;

  try {
    const registeredUser = await userHandler.registerUser(email, username, pass);

    if (!registeredUser) {
      throw new DetailsError(
        'ERROR_USER',
        'ERROR_CREATING_NEW_USER',
        400,
        'The user has not be created.',
        `User by username ${username} has not be created.`);
    }

    const idList = await itemHandler.registerItemListForUser('shopping', registeredUser.id);

    if (!idList) {
      throw new DetailsError(
        'ERROR_USER',
        'ERROR_CREATING_LIST_USER',
        400,
        'The list of user has not be created.',
        `List of user by id ${registeredUser.id} has not be created.`);
    }

    req.login(registeredUser, (err) => {
      if (err) {
        const loginError = new DetailsError(
          'ERROR_LOGIN',
          'ERROR_LOGIN_USER',
          400,
          'The user can not login after sign up.',
          `User details: ${registeredUser} ${err}`);

        return next(loginError);
      }
    });
    req.session!.save((err) => {
      if (err) {
        const sessionError = new DetailsError(
            'ERROR_SESSION',
            'ERROR_SESSION_LOGIN_USER',
            400,
            'The session can not be saved during login user.',
            `User details: ${registeredUser} ${err}`);

        return next(sessionError);
      }
      return res.redirect('/item');
    });

  } catch (error) {
    log.error('ERROR_CREATING_NEW_USER', error);

    if (error instanceof DetailsError) { return next(error); }

    const userError = new DetailsError(
      'ERROR_USER',
      'ERROR_CREATING_NEW_USER',
      400,
      'The user has not be created.',
      `User by username ${username} has not be created.`);

    return next(userError);
  }
}

/**
 * @namespace Router.user
 */
export = { router, registerNewUser };
