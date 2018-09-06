import { Request, Response, NextFunction } from 'express';
import expressRouter from 'express-promise-router';

const router = expressRouter();

import auth from './auth';
import item from './item';
import products from './products';

/**
 * Verifies if the user has an active session,
 * it redirects him to the login router if the given data is incorrect.
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function authorized(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401);
    res.set({ location: '/login' });
    return res.render('login');
  }

  return next();
}

/**
 * Sets the headers in the responses middleware to not save cache.
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function noCache(req: Request, res: Response, next: NextFunction) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

/**
 * Renders the homepage but if the user has an active session,
 * it redirects him to items route.
 * @memberof Router.index
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function initialRoute(req: Request, res: Response) {
  if (req.user) {
    res.redirect('/item');
  } else {
    res.render('home');
  }
}

router.get('/', initialRoute);

/**
 * Load auth middleware.
 * @memberof Router.index
 * @param {auth} auth - Auth router
 */
router.use(auth);

/**
 * Load item middleware, it verifies the user active session and set no-cache into responses.
 * @memberof Router.index
 * @param {string} path - Express path
 * @param {Function} authorized - Function to verify user authorization
 * @param {Function} noCache - Function to set no-cahce into responses
 */
router.use('/item', authorized, noCache, item);

/**
 * Load product middleware, it verifies the user active session.
 * @memberof Router.index
 * @param {string} path - Express path
 * @param {Function} authorized - Function to verify user authorization
 */
router.use('/products', authorized, products);

/**
 * @namespace Router.index
 */
export = router;
