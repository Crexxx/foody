import express, { Request, Response, NextFunction } from 'express'

export abstract class Controller {
  readonly path: string
  readonly router = express.Router()

  constructor(path: string) {
    this.path = path
  }

  abstract init(): void
}

export function attach(fn: (req: Request, resp: Response) => any): (req: Request, resp: Response, next: NextFunction) => void {
  return (req, resp, next) => {
    try {
      const ret = fn(req, resp)
      if (ret instanceof Promise) {
        ret.catch(next)
      }
    } catch (err) {
      next(err)
    }
  }
}