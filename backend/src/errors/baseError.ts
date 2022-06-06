export class BaseError extends Error {
  readonly statusCode: number
  readonly message: string

  constructor(statusCode: number, message: string) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}