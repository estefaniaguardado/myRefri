import User from '../model/User';
import { IUserDAO } from '../dao/IUserDAO';

export default class UserHandler {
  constructor(readonly dao: IUserDAO) {}

  findUserByUsername(username: string): Promise<User | null> {
    return this.dao.getUserByUsername(username);
  }

  findUserById(id: string): Promise<User | null> {
    return this.dao.getUserById(id);
  }

  async registerUser(registerEmail: string, registerUsername: string, registerPassword: string): Promise<User | null> {
    const idRegisteredUser = await this.dao.createNewUser(registerEmail, registerUsername, registerPassword);
    if (!idRegisteredUser) return null;

    const registeredUser: User = {
      id: idRegisteredUser,
      email: registerEmail,
      username: registerUsername,
      password: registerPassword,
    };

    return registeredUser;
  }
}
