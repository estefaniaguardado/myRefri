const router = require('express-promise-router')();

const productHandler = require('../services/ProductHandler')();

router.get('/:id', (req, res) => {
  const product = productHandler.findProductById(req.params.id);

  return res.json({ id: req.params.id, unities: product.unities });
});

module.exports = router;
