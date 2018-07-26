const users = [{ id: 1, username: 'annie', password: 'hola' }];

/**
 * Return an user information by username from registered/active Users database.
 * @param {String} username
 * @returns {JSON} User information
 */
function findUserByName(username) {
  return new Promise((resolve, reject) => {
    const userInfo = users.find(user => user.username === username);
    if (!userInfo) return reject(new Error('ERROR_USER_NOT_FOUND'));
    return resolve(userInfo);
  });
}

/**
 * Return an user information by ID from registered/active Users database.
 * @param {String} id
 * @returns {JSON} User information
 */
function findUserById(id) {
  return new Promise((resolve, reject) => {
    const userInfo = users.find(user => user.id === id);
    if (!userInfo) return reject(new Error('ERROR_USER_NOT_FOUND'));
    return resolve(userInfo);
  });
}

/**
 * @module Handler of user
 */
module.exports = {
  findUserByName,
  findUserById,
};
