import { Request, Response } from 'express';
import expressRouter from 'express-promise-router';

const router = expressRouter();

import ProductHandler from '../services/ProductHandler';

const productHandler = ProductHandler();

/**
 * Router serving product details by id product through the request.
 * @memberof Router.products
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
function getProductDetails(req: Request, res: Response) {
  const product = productHandler.findProductById(req.params.id);

  return res.json({ id: req.params.id, unities: product.unities });
}

router.get('/:id', getProductDetails);

/**
 * @namespace Router.products
 */
export = router;
