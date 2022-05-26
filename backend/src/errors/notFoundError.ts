import { BaseError } from './baseError'

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(404, message)
  }
}