import expressPromiseRouter from 'express-promise-router';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

const router = expressPromiseRouter();

import user from './user';

/**
 * If the user has an active session, it redirects to items route rather to the login form.
 * @memberof Router.authenticate
 * @param {Request} req - Express object
 * @param {Response} res - Express object
 */
function entry(req: Request, res: Response) {
  res.render('entry', req.flash());
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

const authMiddleware = passport.authenticate('local', {
  failureRedirect: '/entry',
  failureFlash: true,
});

router.get('/entry', entry);
router.post('/signup', user.registerNewUser);
router.post('/login', authMiddleware, (req, res, next) => {
  req.session!.save((err) => {
    if (err) return next(err);

    res.redirect('/');
  });
});

router.get('/logout', logout);

/**
 * Verifies if the user has an active session,
 * it redirects him to the login router if the given data is incorrect.
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function authorized(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.redirect('/entry');
  }

  return next();
}

/**
 * @namespace Router.authenticate
 */
export = { router, authorized };
