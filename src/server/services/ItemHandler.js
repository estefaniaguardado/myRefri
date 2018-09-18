"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Item_1 = __importDefault(require("../model/Item"));
// TODO: The list must be persisted in a DB, no in memory
var ItemHandler = /** @class */ (function () {
    function ItemHandler() {
        // TODO: Remove once the list is in the DB
        this.list = [];
    }
    /**
     * Return items list of the current user.
     * @returns {[Item]} Array of items.
     */
    ItemHandler.prototype.getList = function () {
        return this.list.slice();
    };
    /**
     * Return an item by id inside the items list of the current user.
     * @param {string} idItem
     * @returns {Item} Item object
     */
    ItemHandler.prototype.findItemById = function (idItem) {
        var detailsItem = this.list.filter(function (item) { return item.id === idItem; });
        return detailsItem[0];
    };
    // TODO: The creation of the item should not require the id, because that is generated by the DB
    /**
     * Create a new item with the specified data and add it to the items list of the current user.
     * @param {Product} product
     * @param {JSON} itemData
     * @returns {Item} New Item object
     */
    ItemHandler.prototype.createNewItem = function (product, itemData) {
        var unity = itemData.unityItem;
        var quantity = itemData.quantityItem;
        var id = Math.random().toString(36).substring(2, 5);
        var date = new Date();
        var newItem = new Item_1.default(id, product, date, unity, quantity, true);
        this.list.push(newItem);
        return newItem;
    };
    /**
     * Modify an existing item with the new data in the items list of the current user.
     * @param {string} itemId
     * @param {Unity} newUnityItem
     * @param {number} newQuantityItem
     */
    ItemHandler.prototype.modifyItem = function (itemId, newUnityItem, newQuantityItem) {
        var infoItem = this.list.filter(function (previousItem) { return previousItem.id === itemId; });
        var indexModifiedItem = this.list.indexOf(infoItem[0]);
        this.list[indexModifiedItem].unity = newUnityItem;
        this.list[indexModifiedItem].quantity = newQuantityItem;
    };
    /**
     * Remove an existing item by ID of the items list of the current user.
     * @param {string} id
     */
    ItemHandler.prototype.removeItemOfList = function (id) {
        var filterList = this.list.filter(function (item) { return item.id !== id; });
        this.list = filterList;
    };
    return ItemHandler;
}());
module.exports = ItemHandler;
