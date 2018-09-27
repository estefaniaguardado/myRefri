import User from '../model/User';
import UserDAO from '../dao/UserDAO';

const dao = new UserDAO();

export default class UserHandler {
  findUserByName(username: string): Promise<User | null> {
    return dao.getUserByName(username);
  }

  findUserById(id: string): Promise<User | null> {
    return dao.getUserById(id);
  }
}
