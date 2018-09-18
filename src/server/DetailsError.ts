class DetailsError extends Error {
  statusCode: number;
  description: string;
  details: string;

  constructor(message: string, status: number, description: string, details: string) {
    super(message);

    this.statusCode = status;
    this.description = description;
    this.details = details;
  }
}

export = DetailsError;
