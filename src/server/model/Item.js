"use strict";
var Item = /** @class */ (function () {
    function Item(id, product, date, unity, quantity, active) {
        this.id = id;
        this.product = product;
        this.date = date;
        this.unity = unity;
        this.quantity = quantity;
        this.active = active;
    }
    return Item;
}());
module.exports = Item;
