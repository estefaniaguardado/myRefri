const Unity = require('./Unity');
const Category = require('./Category');

class Product {
  /**
   * Product details
   * @param {String} id - Product Identifier
   * @param {Array} names - Potential names to identify a product
   * @param {Array<Unity>} unities - Potential units to size a product
   * @param {Boolean} perishable - Define perishable possibility of a product
   * @param {Number} notificationOffset - Days limit to consume a product when it is perishable
   * @param {Category} category - Define category to classify a product
   */

  constructor(id, names, unities, perishable, notificationOffset, category) {
    this.id = id;
    this.names = names;
    this.unities = unities;
    this.perishable = perishable;
    this.notificationOffset = notificationOffset;
    this.category = category;
  }
}

module.exports = Product;
