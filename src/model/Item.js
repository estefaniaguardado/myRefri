class Item {
  /**
   * @param {String} id
   * @param {Product} product
   * @param {Date} date
   * @param {Unity} unity
   * @param {Number} quantity
   * @param {Boolean} active
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
