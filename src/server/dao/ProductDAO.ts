// tslint:disable:max-line-length

import { IProductDAO } from '../dao/IProductDAO';
import Product from '../model/Product';
import pgPromise from 'pg-promise';

export default class ProductDAO implements IProductDAO {
  constructor(readonly db: pgPromise.IDatabase<{}>) {}

  async getProducts(): Promise<Product[]> {
    try {
      const query = `SELECT p.id, p.perishable, p.notification_offset, pu.unit, pn.name, c.category_name FROM main.product as p
      INNER JOIN main.category c ON p.category_id = c.id
      INNER JOIN main.product_unit pu ON p.id = pu.product_id
      INNER JOIN main.product_name pn ON p.id = pn.product_id`;
      const data = await this.db.manyOrNone(query);

      return mapProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
      throw new Error('ERROR_FETCHING_PRODUCTS');
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const query = `SELECT p.id, p.perishable, p.notification_offset, pu.unit, pn.name FROM main.product as p
      INNER JOIN main.product_unit pu ON pu.product_id = $1
      INNER JOIN main.product_name pn ON pn.product_id = $1
      INNER JOIN main.category c ON p.category_id = c.id WHERE p.id = $1`;
      const data = await this.db.manyOrNone(query, [id]);
      const products = mapProducts(data);

      return products.length ? products[0] : null;
    } catch (error) {
      console.error('Error fetching products', error);
      throw new Error('ERROR_FETCHING_PRODUCT');
    }
  }
}

function mapProducts(data): Product[] {
  const products = {
  };

  for (const result of data) {
    const { id: productId, name, category_name: category, perishable, unit, notification_offset: notificationOffset } = result;

    const product = products[productId] ? {
      ...products[productId],
    } : {
      category,
      perishable,
      notificationOffset,
      id: productId,
      unities: [],
      names: [],
    };

    if (!product.unities.includes(unit)) {
      product.unities = [...product.unities, unit];
    }

    if (!product.names.includes(name)) {
      product.names = [...product.names, name];
    }

    products[productId] = product;
  }

  return Object.values(products);
}
