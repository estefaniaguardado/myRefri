import { IUserDAO } from './IUserDAO';
import User from '../model/User';
import * as db from '../db/connector';

export default class UserDAO implements IUserDAO {

  async getUserByName(username: string): Promise<User | null> {
    try {
      const data = await db.oneOrNone('SELECT * FROM main.user WHERE username = $1', [username]);
      if (!data) return null;

      const user: User = {
        id: data.id,
        username: data.username,
        password: data.pass,
      };

      return user;
    } catch (error) {
      throw new Error('ERROR_FETCHING_USER');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const data = await db.oneOrNone('SELECT * FROM main.user WHERE id = $1', [id]);
      if (!data) return null;

      const user: User = {
        id: data.id,
        username: data.username,
        password: data.pass,
      };

      return user;
    } catch (error) {
      throw new Error('ERROR_FETCHING_USER');
    }
  }
}
