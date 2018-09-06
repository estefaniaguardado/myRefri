import expressRouter from "express-promise-router";
import passport from "passport";
import { Request, Response, Router } from "express";

const router = expressRouter();

/**
 * If the user has an active session, it redirects to items route rather to the login form.
 * @memberof Router.authenticate
 * @param {Request} req - Express object
 * @param {Response} res - Express object
 */
function login(req: Request, res: Response) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', req.flash());
  }
}

/**
 * Logout of the user active session and redirect him to the homepage.
 * @memberof Router.authenticate
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function logout(req: Request, res: Response) {
  req.session!.destroy(() => res.redirect('/'));
}

router.get('/login', login);
router.get('/logout', logout);

/**
 * Router serving login form and authenticate the user, it begins user session
 * and redirect the user to the items route if the given data is correct.
 * @memberof Router.authenticate
 * @param {string} path - Express path
 * @param {Function} Passport.authenticate - Passport-Authenticate middleware
 */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

/**
 * @namespace Router.authenticate
 */
export = router;
