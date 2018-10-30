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

/**
 * Router serving registered products.
 * @memberof Router.products
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
async function getProducts(req: Request, res: Response) {
  const products = await productHandler.fetchProductList();
  if (!products) return new Error('ERROR_FETCHING_PRODUCTS');

  return res.json({ products });
}

/**
 * Router creating new product.
 * @memberof Router.products
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
async function createNewProduct(req: Request, res: Response) {
  const names = req.body.names;
  const units = req.body.units;
  const perishable = req.body.perishable;
  const notificationOffset = req.body.notification;
  const category = req.body.category;

  const product = await productHandler.registerProduct(names, units, perishable, notificationOffset, category);
  if (!product) return new Error('NOT_REGISTER_NEW_PRODUCT');

  return res.json({ product });
}

router.get('/:id', getProductDetails);
router.get('/', getProducts);
router.post('/', createNewProduct);

/**
 * @namespace Router.products
 */
export = router;
