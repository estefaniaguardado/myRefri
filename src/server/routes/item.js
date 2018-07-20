const router = require('express-promise-router')();

const ItemHandler = require('../services/ItemHandler');

const itemHandler = new ItemHandler();

const productHandler = require('../services/ProductHandler')();

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

router.get('/:id', (req, res) => {
  res.json({ result: itemHandler.findItemById(req.params.id) });
});

router.post('/', (req, res) => {
  const product = productHandler.findProductById(req.body.selectedProduct);
  itemHandler.createNewItem(product, req.body);
  res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
});

router.put('/:id', (req, res) => {
  itemHandler.modifyItem(req.params.id, req.body.unityItem, req.body.quantityItem);

  if (req.accepts('application/json')) {
    return res.json({ ok: true });
  }

  return res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
});

router.delete('/:id', (req, res) => {
  itemHandler.removeItemOfList(req.params.id);

  if (req.accepts('application/json')) {
    return res.json({ ok: true });
  }

  return res.render('index', { message: 'Shopping List', products: productHandler.getProductList(), listOfItems: itemHandler.getList() });
});

module.exports = router;
