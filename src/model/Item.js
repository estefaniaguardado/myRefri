/**
 * Defines the properties of an item that user has set and added to his shopping list.
 * @typedef {object} Item
 */
class Item {
  /**
   * @param {String} id - Item Identifier
   * @param {Product} product - Product reference to which the item belongs
   * @param {Date} date - Date item creation
   * @param {Unity} unity - Selected item unit
   * @param {Number} quantity - Selected item quantity
   * @param {Boolean} active - Shopping status of item
   */
  constructor(id, product, date, unity, quantity, active) {
    this.id = id;
    this.product = product;
    this.added = date;
    this.unity = unity;
    this.quantity = quantity;
    this.active = active;
  }
}

module.exports = Item;
