import Product from '../model/Product';

export interface IProductDAO {
  /**
   * Return registered and active products.
   */
  getProducts(): Promise<Product[]>;
  /**
   * Return a product by id.
   * @param {string} id
   */
  getProductById(id: string): Promise<Product | null>;

  // TODO: modify json value as entry
  /**
   * Create a new product.
   * @param {JSON} data
   */
  createProduct?(data: JSON): Promise<Product | null>;
  /**
   * Update a registered product.
   * @param {JSON} data
   */
  updateDataProduct?(data: JSON): Promise<Product>;
}
