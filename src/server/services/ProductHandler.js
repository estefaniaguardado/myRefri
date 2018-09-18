"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Product_1 = __importDefault(require("../model/Product"));
var Unity_1 = __importDefault(require("../model/Unity"));
var Category_1 = __importDefault(require("../model/Category"));
// TODO: Extract from DB using the DAO
var product1 = new Product_1.default('1', ['Bread'], [Unity_1.default.piece, Unity_1.default.kilogram, Unity_1.default.gram, Unity_1.default.pound, Unity_1.default.ounce], true, 3, Category_1.default.food);
var product2 = new Product_1.default('2', ['Beer'], [Unity_1.default.piece, Unity_1.default.liter, Unity_1.default.mililiter, Unity_1.default.quart, Unity_1.default.gallon], false, 0, Category_1.default.beverages);
var product3 = new Product_1.default('3', ['Aspirin'], [Unity_1.default.piece], false, 0, Category_1.default.pharmacy);
module.exports = function () {
    var products = [product1, product2, product3];
    /**
     * Set the available products into a local variable.
     * @param {[Product]} newProducts
     */
    function setProducts(newProducts) {
        products = newProducts;
    }
    /**
     * Return registered and active products.
     * @returns {[Product]} Array of products.
     */
    function getProductList() {
        return products.slice();
    }
    /**
     * Return a product by id.
     * @param {string} idProduct
     * @returns {Product} Product object
     */
    function findProductById(idProduct) {
        var detailsProduct = products.filter(function (product) { return product.id === idProduct; });
        return detailsProduct[0];
    }
    return {
        setProducts: setProducts,
        getProductList: getProductList,
        findProductById: findProductById,
    };
};
