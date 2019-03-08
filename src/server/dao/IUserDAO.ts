import User from '../model/User';

export interface IUserDAO {
  /**
   * Register a new user
   * @param {string} username
   * @param {string} password
   */
  createNewUser(email: string, username: string, password: string): Promise<string | null>;

  /**
   * Return an user information by username.
   * @param {string} username
   */
  getUserByUsername(username: string): Promise<User | null>;

  /**
   * Return an user information by ID.
   * @param {string} id
   */
  getUserById(id: string): Promise<User | null>;

  // TODO: updateUser, desactivateUser
}
