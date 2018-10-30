// tslint:disable:max-line-length

import { IProductDAO } from '../dao/IProductDAO';
import Product from '../model/Product';
import pgPromise from 'pg-promise';
import Unit = require('../model/Unity');
import Category = require('../model/Category');

export default class ProductDAO implements IProductDAO {
  constructor(readonly db: pgPromise.IDatabase<{}>) {}

  async fetchProducts(): Promise<Product[]> {
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

  async fetchProductById(id: string): Promise<Product | null> {
    try {
      const query = `SELECT p.id, p.perishable, p.notification_offset, pu.unit, pn.name, c.category_name FROM main.product as p
      INNER JOIN main.product_unit pu ON pu.product_id = $1
      INNER JOIN main.product_name pn ON pn.product_id = $1
      INNER JOIN main.category c ON p.category_id = c.id WHERE p.id = $1`;
      const data = await this.db.manyOrNone(query, id);

      if (!data.length) return null;

      return mapProducts(data)[0];
    } catch (error) {
      console.error('Error fetching product', error);
      throw new Error('ERROR_FETCHING_PRODUCT');
    }
  }

  async getCategoryId(name: Category): Promise<string | null> {
    try {
      const queryCategory = 'SELECT id FROM main.category WHERE category_name = $1';
      const data = await this.db.one(queryCategory, name);

      if (!data) return null;

      return data.id;
    } catch (error) {
      console.error('Error fetching category of product', error);
      throw new Error('ERROR_FETCHING_CATEGORY');
    }
  }

  async registerNamesProduct(productId:string, names: string[]) {
    try {
      const actions = names.map((name) => {
        const query = 'INSERT INTO main.product_name (product_id, name) VALUES ($1, $2)';
        return this.db.none(query, [productId, name]);
      });

      return await Promise.all(actions);
    } catch (error) {
      console.error('Error registering names of product', error);
      throw new Error('ERROR_REGISTERING_NAMES_PRODUCT');
    }
  }

  async registerUnitsProduct(productId:string, units: string[]) {
    try {
      const actions = units.map((unit) => {
        const query = 'INSERT INTO main.product_unit (product_id, unit) VALUES ($1, $2)';
        return this.db.none(query, [productId, unit]);
      });

      return await Promise.all(actions);
    } catch (error) {
      console.error('Error registering units of product', error);
      throw new Error('ERROR_REGISTERING_UNITS_PRODUCT');
    }
  }

  async createProduct(perishable: boolean,
                      notificationOffset: number,
                      categoryId: string): Promise<string | null> {
    try {
      const queryCreate = 'INSERT INTO main.product (perishable, notification_offset, category_id) VALUES ($1, $2, $3) RETURNING id';
      const data = await this.db.oneOrNone(queryCreate, [perishable, notificationOffset, categoryId]);

      if (!data) return null;

      return data.id;
    } catch (error) {
      console.error('Error creating product', error);
      throw new Error('ERROR_CREATING_PRODUCT');
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
      units: [],
      names: [],
    };

    if (!product.units.includes(unit)) {
      product.units = [...product.units, unit];
    }

    if (!product.names.includes(name)) {
      product.names = [...product.names, name];
    }

    products[productId] = product;
  }

  return Object.values(products);
}
