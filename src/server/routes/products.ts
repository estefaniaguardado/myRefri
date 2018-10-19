import { Request, Response } from 'express';
import expressPromiseRouter from 'express-promise-router';

const router = expressPromiseRouter();

import ProductHandler from '../services/ProductHandler';
import ProductDAO from '../dao/ProductDAO';

// TODO: Implement Dependency Injection
import { db } from '../db/connector';
const productDAO = new ProductDAO(db);
const productHandler = new ProductHandler(productDAO);

/**
 * Router serving product details by id product through the request.
 * @memberof Router.products
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
async function getProductDetails(req: Request, res: Response) {
  const product = await productHandler.findProductById(req.params.id);
  if (!product) return new Error('INCORRECT_PRODUCT_ID');

  return res.json({ id: req.params.id, units: product.units });
}

router.get('/:id', getProductDetails);

/**
 * @namespace Router.products
 */
export = router;
