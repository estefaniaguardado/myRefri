const router = require('express-promise-router')();

const item = require('./item');
const auth = require('./auth');
const products = require('./products');

function authorized(req, res, next) {
  if (!req.user) return res.redirect('/login');

  return next();
}

function noCache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

router.use(auth);
router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/item');
  } else {
    res.render('home');
  }
});

router.use('/item', authorized, noCache, item);
router.use('/products', authorized, products);

module.exports = router;
