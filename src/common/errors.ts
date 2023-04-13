export class ORMError extends Error {
  constructor(message: string) {
    super(`[ORM Error] : ${message}`);
  }
}

export class CustomInvalidError extends Error {
  constructor(message: string) {
    super(`[Invalid Error] : ${message}`);
  }
}

export class CustomInternalError extends Error {
  constructor(message: string) {
    super(`[Internal Error] : ${message}`);
  }
}
