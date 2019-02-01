import User from '../model/User';

export interface IUserDAO {
  /**
   * Return an user information by username.
   * @param {string} username
   */
  getUserByName(username: string): Promise<User | null>;

  /**
   * Return an user information by ID.
   * @param {string} id
   */
  getUserById(id: string): Promise<User | null>;

  // TODO: createUser, updateUser, desactivateUser
}
