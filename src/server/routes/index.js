const router = require('express-promise-router')();

const item = require('./item');
const auth = require('./auth');
const products = require('./products');

function authorized(req, res, next) {
  if (!req.user) return res.redirect('/login');

  return next();
}

router.use(auth);
router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/item');
  } else {
    res.render('home');
  }
});

router.use('/item', authorized, item);
router.use('/products', authorized, products);

module.exports = router;
