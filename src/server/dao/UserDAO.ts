import { IUserDAO } from './IUserDAO';
import User from '../model/User';
import pgPromise from 'pg-promise';

export default class UserDAO implements IUserDAO {
  constructor(readonly db: pgPromise.IDatabase<{}>) {}

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const data = await this.db.oneOrNone('SELECT * FROM main.user WHERE username = $1', [username]);
      if (!data) return null;

      const user: User = {
        id: data.id,
        email: data.email,
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
      const data = await this.db.oneOrNone('SELECT * FROM main.user WHERE id = $1', [id]);
      if (!data) return null;

      const user: User = {
        id: data.id,
        email: data.email,
        username: data.username,
        password: data.pass,
      };

      return user;
    } catch (error) {
      throw new Error('ERROR_FETCHING_USER');
    }
  }

  async createNewUser(email: string, username: string, password:string): Promise<string | null> {
    try {
      const query = 'INSERT INTO main.user (email, username, pass) VALUES ($1, $2, $3) RETURNING id';
      const idUser = await this.db.oneOrNone(query, [email, username, password]);
      if (!idUser) return null;

      return idUser.id;
    } catch (error) {
      throw new Error('ERROR_CREATING_NEW_USER');
    }
  }
}
