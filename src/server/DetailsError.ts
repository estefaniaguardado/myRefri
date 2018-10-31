export default class DetailsError extends Error {

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

  constructor(name: string, message: string, code: number, description: string, details: string) {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = code;
    this.description = description;
    this.details = details;

    Object.setPrototypeOf(this, DetailsError.prototype);
  }
}
