const router = require('express-promise-router')();

const ItemHandler = require('../services/ItemHandler');

const itemHandler = new ItemHandler();

const productHandler = require('../services/ProductHandler')();

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
function getItemById(req, res) {
  const item = itemHandler.findItemById(req.params.id);
  if (item) return res.json({ result: item });
  return res.status(404).send({
    type: 'ERROR_ITEM_NOT_FOUND',
    descripcion: 'The item has not been found in your shopping list.',
    details: `Item ${req.params.id} has not found.`,
  });
}

/**
 * @memberof Router.item
 * Ccreates and adds a new item with the given data into the shopping list.
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function createNewItem(req, res) {
  const product = productHandler.findProductById(req.body.selectedProduct);
  itemHandler.createNewItem(product, req.body);
  res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
}

/**
 * Updates the page with the modified item.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function updateItem(req, res) {
  const item = itemHandler.findItemById(req.params.id);

  if (item) {
    itemHandler.modifyItem(req.params.id, req.body.unityItem, req.body.quantityItem);

    return res.render('index', {
      message: 'Shopping List',
      products: productHandler.getProductList(),
      listOfItems: itemHandler.getList(),
    });
  }

  return res.status(404).send({
    type: 'ERROR_ITEM_NOT_FOUND',
    descripcion: 'The item has not been found in your shopping list.',
    details: `Item ${req.params.id} has not found.`,
  });
}

/**
 * Removes a selected item by the given id.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function removeItem(req, res, next) {
  itemHandler.removeItemOfList(req.params.id);

  if (req.accepts('application/json')) {
    return res.json({ ok: true });
  }

  return next();
}

/**
 * Update the item page without the selected item.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
function removeItemOfItemView(req, res, next) {
  itemHandler.removeItemOfList(req.params.id);

  if (req.accepts('text/html')) {
    return res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
  }

  return next();
}

router.get('/', shoopingListView, getItemList);
router.get('/:id', getItemById);
router.post('/', createNewItem);
router.put('/:id', updateItem);
router.delete('/:id', removeItemOfItemView, removeItem);

/**
 * @namespace Router.item
 */
module.exports = router;
