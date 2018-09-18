"use strict";
var es6_promise_1 = require("es6-promise");
var users = [{ id: '1', username: 'annie', password: 'hola' }];
/**
 * Return an user information by username.
 * @param {string} username
 * @returns {Promise<JSON>} User information
 */
function findUserByName(username) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        var userInfo = users.filter(function (user) { return user.username === username; });
        if (!userInfo[0])
            return reject(new Error('ERROR_USER_NOT_FOUND'));
        return resolve(userInfo[0]);
    });
}
/**
 * Return an user information by ID.
 * @param {string} id
 * @returns {Promise<JSON>} User information
 */
function findUserById(id) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        var userInfo = users.filter(function (user) { return user.id === id; });
        if (!userInfo[0])
            return reject(new Error('ERROR_USER_NOT_FOUND'));
        return resolve(userInfo[0]);
    });
}
module.exports = {
    findUserByName: findUserByName,
    findUserById: findUserById,
};
