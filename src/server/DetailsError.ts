import ExtendableError from 'es6-error';

export default class DetailsError extends ExtendableError {

  constructor(readonly name: string, readonly message: string, readonly statusCode: number, readonly description: string, readonly details: string) {
    super(message);
  }
}
