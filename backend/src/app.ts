import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import { Controller } from './controller'
import errorHandler from './errors/error.middleware'
import { RecipeController } from './recipes/recipe.controller'

export default class App {
  readonly app: Application
  readonly port: number

  constructor() {
    dotenv.config()
    this.port = parseInt(process.env.PORT ?? '8080')
    this.app = express()
  }

  start(controllers: Controller[]) {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use((req, _res, next) => {
      console.log(`[${new Date().toISOString()}]: ${req.method} ${req.path}`)
      next()
    })

    for (const controller of controllers) {
      controller.init()
      this.app.use(controller.path, controller.router)
    }

    this.app.use(errorHandler)
    this.app.listen(this.port, () => {
      console.log(`Listenen on port ${this.port}`)
    })
  }
}

new App().start([new RecipeController()])
