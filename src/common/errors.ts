export class ORMError extends Error {
  constructor(message: string) {
    super(`[ORM Error] : ${message}`);
  }
}

export class CustomInvalidError extends Error {
  statusCode = 403;
  constructor(message: string) {
    super(`[Invalid Error] : ${message}`);
  }
}

export class CustomInternalError extends Error {
  statusCode = 500;
  constructor(message: string) {
    super(`[Internal Error] : ${message}`);
  }
}

export class CustomNotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(`[Not Found Error] : ${message}`);
  }
}
