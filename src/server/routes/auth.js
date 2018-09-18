"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var passport_1 = __importDefault(require("passport"));
var router = express_promise_router_1.default();
/**
 * If the user has an active session, it redirects to items route rather to the login form.
 * @memberof Router.authenticate
 * @param {Request} req - Express object
 * @param {Response} res - Express object
 */
function login(req, res) {
    if (req.user) {
        res.redirect('/');
    }
    else {
        res.render('login', req.flash());
    }
}
/**
 * Logout of the user active session and redirect him to the homepage.
 * @memberof Router.authenticate
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function logout(req, res) {
    req.session.destroy(function () { return res.redirect('/'); });
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
router.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));
module.exports = router;
