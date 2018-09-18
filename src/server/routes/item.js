"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var router = express_promise_router_1.default();
var ItemHandler_1 = __importDefault(require("../services/ItemHandler"));
var itemHandler = new ItemHandler_1.default();
var ProductHandler_1 = __importDefault(require("../services/ProductHandler"));
var productHandler = ProductHandler_1.default();
var DetailsError_1 = __importDefault(require("../DetailsError"));
/**
 * Return the item page.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function getItemList(req, res, next) {
    if (req.accepts('application/json')) {
        return res.json({ ok: true, result: itemHandler.getList() });
    }
    return next();
}
/**
 * Return the item list.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function shoopingListView(req, res, next) {
    if (req.accepts('text/html')) {
        return res.render('index', {
            message: 'Shopping List',
            products: productHandler.getProductList(),
            listOfItems: itemHandler.getList(),
        });
    }
    return next();
}
/**
 * Return the details of an item by the given id.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function getItemById(req, res, next) {
    var item = itemHandler.findItemById(req.params.id);
    if (item)
        return res.json({ result: item });
    var error = new DetailsError_1.default('ERROR_ITEM_NOT_FOUND', 404, 'The item has not been found in your shopping list.', "Item " + req.params.id + " has not found.");
    return next(error);
}
/**
 * @memberof Router.item
 * Ccreates and adds a new item with the given data into the shopping list.
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function createNewItem(req, res) {
    var product = productHandler.findProductById(req.body.selectedProduct);
    itemHandler.createNewItem(product, req.body);
    res.render('index', {
        message: 'Shopping List',
        products: productHandler.getProductList(),
        listOfItems: itemHandler.getList(),
    });
}
/**
 * Updates the page with the modified item.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function updateItem(req, res, next) {
    var item = itemHandler.findItemById(req.params.id);
    if (item) {
        itemHandler.modifyItem(req.params.id, req.body.unityItem, req.body.quantityItem);
        return res.render('index', {
            message: 'Shopping List',
            products: productHandler.getProductList(),
            listOfItems: itemHandler.getList(),
        });
    }
    var error = new DetailsError_1.default('ERROR_ITEM_NOT_FOUND', 404, 'The item has not been found in your shopping list.', "Item " + req.params.id + " has not found.");
    return next(error);
}
/**
 * Update the item page without the selected item.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function removeItem(req, res, next) {
    var item = itemHandler.findItemById(req.params.id);
    if (item) {
        itemHandler.removeItemOfList(req.params.id);
        return res.render('index', {
            message: 'Shopping List',
            products: productHandler.getProductList(),
            listOfItems: itemHandler.getList(),
        });
    }
    var error = new DetailsError_1.default('ERROR_ITEM_NOT_FOUND', 404, 'The item has not been found in your shopping list.', "Item " + req.params.id + " has not found.");
    return next(error);
}
router.get('/', shoopingListView, getItemList);
router.get('/:id', getItemById);
router.post('/', createNewItem);
router.put('/:id', updateItem);
router.delete('/:id', removeItem);
module.exports = router;
