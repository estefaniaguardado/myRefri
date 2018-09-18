"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var router = express_promise_router_1.default();
var auth_1 = __importDefault(require("./auth"));
var item_1 = __importDefault(require("./item"));
var products_1 = __importDefault(require("./products"));
/**
 * Verifies if the user has an active session,
 * it redirects him to the login router if the given data is incorrect.
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function authorized(req, res, next) {
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
function noCache(req, res, next) {
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
function initialRoute(req, res) {
    if (req.user) {
        res.redirect('/item');
    }
    else {
        res.render('home');
    }
}
router.get('/', initialRoute);
/**
 * Load auth middleware.
 * @memberof Router.index
 * @param {auth} auth - Auth router
 */
router.use(auth_1.default);
/**
 * Load item middleware, it verifies the user active session and set no-cache into responses.
 * @memberof Router.index
 * @param {string} path - Express path
 * @param {Function} authorized - Function to verify user authorization
 * @param {Function} noCache - Function to set no-cahce into responses
 */
router.use('/item', authorized, noCache, item_1.default);
/**
 * Load product middleware, it verifies the user active session.
 * @memberof Router.index
 * @param {string} path - Express path
 * @param {Function} authorized - Function to verify user authorization
 */
router.use('/products', authorized, products_1.default);
module.exports = router;
