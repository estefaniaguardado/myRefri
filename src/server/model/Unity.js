"use strict";
/**
 * Defines the unities, which can measure a product or item.
 * @readonly
 * @enum {string}
 * @see {@link https://www.iso.org/standard/30669.html ISO/IEC 80000}
 */
var Unity;
(function (Unity) {
    Unity["piece"] = "pz";
    Unity["kilogram"] = "kg";
    Unity["gram"] = "gr";
    Unity["pound"] = "lb";
    Unity["ounce"] = "oz";
    Unity["liter"] = "L";
    Unity["mililiter"] = "mL";
    Unity["quart"] = "qt";
    Unity["gallon"] = "gal";
})(Unity || (Unity = {}));
module.exports = Unity;
