const users = [{ id: 1, username: 'annie', password: 'hola' }];

function findUserByName(username) {
  return new Promise((resolve, reject) => {
    const userInfo = users.find(user => user.username === username);
    if (!userInfo) return reject(new Error('ERROR_USER_NOT_FOUND'));
    return resolve(userInfo);
  });
}

function findUserById(id) {
  return new Promise((resolve, reject) => {
    const userInfo = users.find(user => user.id === id);
    if (!userInfo) return reject(new Error('ERROR_USER_NOT_FOUND'));
    return resolve(userInfo);
  });
}

module.exports = {
  findUserByName,
  findUserById,
};
