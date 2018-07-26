const passport = require('passport');
const router = require('express-promise-router')();

/**
 * @memberof Router.authenticate
 * @name get/login
 * @function
 * Router serving login form, but if the user has an active session,
 * it redirects to items route rather to login form.
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', req.flash());
  }
});

/**
 * @memberof Router.authenticate
 * @name post/login
 * @function
 * Router serving login form and authenticate the user, it begins user session
 * and redirect the user to the items route if the given data is correct.
 * @inner
 * @param {String} path - Express path
 * @param {callback} Passport.authenticate - Passport-Authenticate middleware
 */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

/**
 * @memberof Router.authenticate
 * @name get/logout
 * @function
 * Router serving to log out the user active session and redirect him to the homepage.
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

/**
 * @namespace Router.authenticate
 */
module.exports = router;
