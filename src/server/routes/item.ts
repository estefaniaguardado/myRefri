import { Request, Response, NextFunction } from 'express';
import expressPromiseRouter from 'express-promise-router';

const router = expressPromiseRouter();

// TODO: Implement Dependency Injection
import { db } from '../db/connector';
import ItemHandler from '../services/ItemHandler';
import ItemDAO from '../dao/ItemDAO';
import ProductHandler from '../services/ProductHandler';
import ProductDAO from '../dao/ProductDAO';
import DetailsError from '../DetailsError';

const itemDAO = new ItemDAO(db);
const itemHandler = new ItemHandler(itemDAO);
const productDAO = new ProductDAO(db);
const productHandler = new ProductHandler(productDAO);

/**
 * Return the item list.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
async function getItemList(req: Request, res: Response, next: NextFunction) {
  if (req.accepts('application/json')) {
    return res.json({ ok: true, result: await itemHandler.getList(req.user.id) });
  }

  return next();
}

/**
 * Return the item page.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
async function shoopingListView(req: Request, res: Response, next: NextFunction) {
  if (req.accepts('text/html')) {
    return res.render('index', {
      products: await productHandler.fetchProductList(),
      message: 'Shopping List',
      listOfItems: await itemHandler.getList(req.user.id),
    });
  }

  return next();
}

/**
 * Return the details of an item by the given id.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
async function getItemById(req: Request, res: Response, next: NextFunction) {
  const item = await itemHandler.findItemById(req.params.id);

  if (item) return res.json({ result: item });

  const error: DetailsError = {
    name: 'ERROR_ITEM',
    message: 'ERROR_ITEM_NOT_FOUND',
    statusCode: 404,
    description: 'The item has not been found in your list.',
    details: `Item ${req.params.id} has not found.`,
  };

  return next(error);
}

/**
 * @memberof Router.item
 * Ccreates and adds a new item with the given data into the list.
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
async function createNewItem(req: Request, res: Response, next: NextFunction) {
  const productId = req.body.selectedProduct;
  const unity = req.body.unityItem;
  const quantity = req.body.quantityItem;
  const userId = req.user.id;

  try {
    // TODO: Review the userId as parameter to identigy list(s)
    const newItem = await itemHandler.createNewItem(productId, unity, quantity, userId);

    if (req.accepts('application/json')) {
      return res.json({ ok: true, result: newItem });
    }

    return res.render('index', {
      message: 'Shopping List',
      products: await productHandler.fetchProductList(),
      listOfItems: await itemHandler.getList(req.user.id),
    });
  } catch (error) {
    console.error(error);

    const itemError: DetailsError = {
      name: 'ERROR_ITEM',
      message: 'ERROR_ITEM_HAS_NOT_BE_CREATED',
      statusCode: 404,
      description: 'The item has not be created into your list.',
      details: `Item has not be created with the input values: idProduct: ${productId},
      unity: ${unity}, quantity: ${quantity}, userId: ${userId}`,
    };

    return next(itemError);
  }
}

/**
 * Updates the page with the modified item.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
async function updateItem(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedItem = await itemHandler.modifyItem(req.params.id, req.body.unityItem, req.body.quantityItem);

    if (req.accepts('application/json')) {
      return res.json({ ok: true, result: updatedItem });
    }

    return res.render('index', {
      message: 'Shopping List',
      products: await productHandler.fetchProductList(),
      listOfItems: await itemHandler.getList(req.user.id),
    });
  } catch (error) {
    console.error(error);

    const itemError: DetailsError = {
      name: 'ERROR_ITEM',
      message: 'ERROR_ITEM_HAS_NOT_BE_UPDATED',
      statusCode: 400,
      description: 'The item has not be updated.',
      details: `Item ${req.params.id} has not be updated with the input values:
      unity: ${req.body.unityItem}, quantity: ${req.body.quantityItem}`,
    };

    return next(itemError);
  }
}

/**
 * Update the item page without the selected item.
 * @memberof Router.item
 * @param {object} req - Express object
 * @param {object} res - Express object
 * @param {object} next - Express object
 */
async function removeItem(req: Request, res: Response, next: NextFunction) {
  try {
    await itemHandler.removeItemOfList(req.params.id);

    return res.render('index', {
      message: 'Shopping List',
      products: await productHandler.fetchProductList(),
      listOfItems: await itemHandler.getList(req.user.id),
    });
  } catch (error) {
    console.error(error);

    const itemError: DetailsError = {
      name: 'ERROR_ITEM',
      message: 'ERROR_ITEM_HAS_NOT_BE_REMOVED',
      statusCode: 400,
      description: 'The item has not be removed of your list.',
      details: `Item ${req.params.id} has not be removed of the list`,
    };

    return next(itemError);
  }
}

router.get('/', shoopingListView, getItemList);
router.get('/:id', getItemById);
router.post('/', createNewItem);
router.put('/:id', updateItem);
router.delete('/:id', removeItem);

/**
 * @namespace Router.item
 */
export = router;
