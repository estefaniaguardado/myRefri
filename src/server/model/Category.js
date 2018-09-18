"use strict";
/**
 * Defines different categories, where a product can be classified and belongs to one of these.
 * @readonly
 * @enum {string}
 */
var Category;
(function (Category) {
    Category["food"] = "Food";
    Category["beverages"] = "Beverages";
    Category["household"] = "Household";
    Category["pharmacy"] = "Pharmacy";
    Category["health"] = "Health";
    Category["beauty"] = "Beauty";
    Category["outdoor"] = "Outdoor";
    Category["pets"] = "Pets";
})(Category || (Category = {}));
module.exports = Category;
