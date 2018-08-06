const router = require('express-promise-router')();

const productHandler = require('../services/ProductHandler')();

/**
 * Router serving product details by id product through the request.
 * @memberof Router.products
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function getProductDetails(req, res) {
  const product = productHandler.findProductById(req.params.id);

  return res.json({ id: req.params.id, unities: product.unities });
}

router.get('/:id', getProductDetails);

/**
 * @namespace Router.products
 */
module.exports = router;
