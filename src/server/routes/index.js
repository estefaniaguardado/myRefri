const router = require('express-promise-router')();

const item = require('./item');
const auth = require('./auth');
const products = require('./products');

/**
 * @function
 * Verifies if the user has an active session,
 * it redirects him to the login router if the given data is incorrect.
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 * @return {object} Give the control to the next step in the middleware.
 */
function authorized(req, res, next) {
  if (!req.user) return res.redirect('/login');

  return next();
}

/**
 * @function
 * Sets the headers in the responses middleware to not save cache.
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 * @return {object} Give the control to the next step in the middleware.
 */
function noCache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

/**
 * @memberof Router.index
 * @function
 * Load auth middleware.
 * @param {auth} auth - Auth router
 */
router.use(auth);

/**
 * @memberof Router.index
 * @name get/
 * @function
 * Router serving the homepage but if the user has an active session,
 * it redirects him to items route.
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/item');
  } else {
    res.render('home');
  }
});

/**
 * @memberof Router.index
 * @function
 * Load item middleware, it verifies the user active session and set no-cache into responses.
 * @param {String} path - Express path
 * @param {function} authorized - Function to verify user authorization
 * @param {function} noCache - Function to set no-cahce into responses
 */
router.use('/item', authorized, noCache, item);

/**
 * @memberof Router.index
 * @function
 * Load product middleware, it verifies the user active session.
 * @param {String} path - Express path
 * @param {function} authorized - Function to verify user authorization
 */
router.use('/products', authorized, products);

/**
 * @namespace Router.index
 */
module.exports = router;
