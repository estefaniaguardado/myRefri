/**
 * Defines the information of a registered user.
 * @typedef {object} User
 */

export default interface User {
  /**
   * Id of user to identify
   */
  id: string;
  /**
   * Email of user to identify
   */
  email: string;
  /**
   * Username of user to access
   */
  username: string;
  /**
   * Password of user to access
   */
  password: string;
  /**
   * Access token of user external account (Google, Facebook)
   */
  token?: string;
}
