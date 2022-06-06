import BadRequestError from '../../errors/badRequestError'

export class RecipeBadRequestError extends BadRequestError {
  constructor(additionalInformation: string) {
    super(`Recipe is invalid: ${additionalInformation}`)
  }
}