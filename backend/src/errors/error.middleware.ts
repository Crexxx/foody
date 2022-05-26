import { NextFunction, Request, Response } from 'express'
import BadRequestError from './badRequestError'
import { BaseError } from './baseError'

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof BaseError) {
    res.status(err.statusCode).send(err)
  } else if (err instanceof SyntaxError) {
    const badRequest = new BadRequestError(err.message)
    res.status(badRequest.statusCode).send(badRequest)
  } else {
    const internalError = new BaseError(500, err.message)
    res.status(500).send(internalError)
  }
}