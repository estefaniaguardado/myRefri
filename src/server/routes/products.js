const router = require('express-promise-router')();

const productHandler = require('../services/ProductHandler')();

/**
 * @memberof Router.products
 * @name get/products/id
 * @function
 * Router serving product details by id product through the request.
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 * @return {json} Id product and available unities
 */
router.get('/:id', (req, res) => {
  const product = productHandler.findProductById(req.params.id);

  return res.json({ id: req.params.id, unities: product.unities });
});

/**
 * @namespace Router.products
 */
module.exports = router;
