import { Promise } from 'es6-promise';

const users = [{ id: '1', username: 'annie', password: 'hola' }];

/**
 * Return an user information by username.
 * @param {string} username
 * @returns {Promise<JSON>} User information
 */
function findUserByName(username: string) {
  return new Promise((resolve, reject) => {
    const userInfo = users.filter(user => user.username === username);
    if (!userInfo[0]) return reject(new Error('ERROR_USER_NOT_FOUND'));
    return resolve(userInfo[0]);
  });
}

/**
 * Return an user information by ID.
 * @param {string} id
 * @returns {Promise<JSON>} User information
 */
function findUserById(id: string) {
  return new Promise((resolve, reject) => {
    const userInfo = users.filter(user => user.id === id);
    if (!userInfo[0]) return reject(new Error('ERROR_USER_NOT_FOUND'));
    return resolve(userInfo[0]);
  });
}

/**
 * @module Handler of user
 */
export = {
  findUserByName,
  findUserById,
};
