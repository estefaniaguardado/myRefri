import ExtendableError from 'es6-error';

export default class DetailsError extends ExtendableError {

  /**
   * HTTP response status code by the server to the client
   */
  statusCode: number;

  /**
   * Description to show in the client
   */
  description: string;

  /**
   * Details about the info that can help to fix
   */
  details: string;

  constructor(readonly name: string, message: string, code: number, description: string, details: string) {
    super(message);
  }
}
