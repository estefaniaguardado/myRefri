const users = [{ id: 1, username: 'annie', password: 'hola' }];

function findUserByName(username, done) {
  process.nextTick(() => {
    const userInfo = users.find(user => user.username === username);
    if (!userInfo) return done(null, null);
    return done(null, userInfo);
  });
}

function findUserById(id, done) {
  process.nextTick(() => {
    const userInfo = users.find(user => user.id === id);
    if (!userInfo) return done(null, null);
    return done(null, userInfo);
  });
}

module.exports = {
  findUserByName,
  findUserById,
};
