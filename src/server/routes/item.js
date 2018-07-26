const router = require('express-promise-router')();

const ItemHandler = require('../services/ItemHandler');

const itemHandler = new ItemHandler();

const productHandler = require('../services/ProductHandler')();

/**
 * @memberof Router.item
 * @name get/item
 * @function
 * Router serving the item page or the item list if the request accepts json
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', (req, res) => {
  if (req.accepts('text/html')) {
    return res.render('index', {
      message: 'Shopping List',
      products: productHandler.getProductList(),
      listOfItems: itemHandler.getList(),
    });
  }

  return res.json({ ok: true, result: itemHandler.getList() });
});

/**
 * @memberof Router.item
 * @name get/item/id
 * @function
 * Router serving the details of an item by the given id.
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/:id', (req, res) => {
  res.json({ result: itemHandler.findItemById(req.params.id) });
});

/**
 * @memberof Router.item
 * @name post/item
 * @function
 * Router serving creates and adds a new item with the given data,
 * updating the page with the new item.
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', (req, res) => {
  const product = productHandler.findProductById(req.body.selectedProduct);
  itemHandler.createNewItem(product, req.body);
  res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
});

/**
 * @memberof Router.item
 * @name put/item/id
 * @function
 * Router serving modifies a registered item by the given ID with the new data,
 * updating the page with the modified item.
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/:id', (req, res) => {
  itemHandler.modifyItem(req.params.id, req.body.unityItem, req.body.quantityItem);

  if (req.accepts('application/json')) {
    return res.json({ ok: true, result: req.params.id });
  }

  return res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
});

/**
 * @memberof Router.item
 * @name delete/item/id
 * @function
 * Router serving removes a selected item by the given id,
 * updating the page without the given item.
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/:id', (req, res) => {
  itemHandler.removeItemOfList(req.params.id);

  if (req.accepts('application/json')) {
    return res.json({ ok: true });
  }

  return res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
});

/**
 * @namespace Router.item
 */
module.exports = router;
