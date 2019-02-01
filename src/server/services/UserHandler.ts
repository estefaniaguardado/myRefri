import User from '../model/User';
import { IUserDAO } from '../dao/IUserDAO';

export default class UserHandler {
  constructor(readonly dao: IUserDAO) {}

  findUserByName(username: string): Promise<User | null> {
    return this.dao.getUserByName(username);
  }

  findUserById(id: string): Promise<User | null> {
    return this.dao.getUserById(id);
  }
}
