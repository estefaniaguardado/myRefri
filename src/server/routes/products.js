"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var router = express_promise_router_1.default();
var ProductHandler_1 = __importDefault(require("../services/ProductHandler"));
var productHandler = ProductHandler_1.default();
/**
 * Router serving product details by id product through the request.
 * @memberof Router.products
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function getProductDetails(req, res) {
    var product = productHandler.findProductById(req.params.id);
    return res.json({ id: req.params.id, unities: product.unities });
}
router.get('/:id', getProductDetails);
module.exports = router;
