class ApiError {
  public readonly message: string

  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    this.message = message
    this.statusCode = statusCode
  }
}

class BadRequestError extends ApiError {
  public readonly message: string

  constructor(message: string) {
    super(message, 400)
  }
}

class UnauthorizedError extends ApiError {
  public readonly message: string

  constructor(message: string) {
    super(message, 401)
  }
}

class NotFoundError extends ApiError {
  public readonly message: string

  constructor(message: string) {
    super(message, 404)
  }
}

export { ApiError, BadRequestError, UnauthorizedError, NotFoundError }
