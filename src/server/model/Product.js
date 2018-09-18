"use strict";
/**
 * Defines the properties of a product, which specifies additional
 * characteristics or properties that define an item.
 * @typedef {object} Product
 */
var Product = /** @class */ (function () {
    function Product(id, names, unities, perishable, notificationOffset, category) {
        this.id = id;
        this.names = names;
        this.unities = unities;
        this.perishable = perishable;
        this.notificationOffset = notificationOffset;
        this.category = category;
    }
    return Product;
}());
module.exports = Product;
