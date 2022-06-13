import { Request, Response } from 'express'
import { attach, Controller } from '../controller'
import { RecipeServiceImpl } from './service/recipe.service'
import { RecipeService } from './service/recipe.service.interface'

export class RecipeController extends Controller {
  private readonly service: RecipeService = new RecipeServiceImpl()

  constructor() {
    super('/api/v1/recipe')
  }

  init(): void {
    this.router.get('/', attach((req, res) => this.getAll(req, res)))
    this.router.post('/', attach((req, res) => this.create(req, res)))
    this.router.get('/:id', attach((req, res) => this.getById(req, res)))
    this.router.put('/:id', attach((req, res) => this.update(req, res)))
    this.router.delete('/:id', attach((req, res) => this.delete(req, res)))
  }

  private async getAll(req: Request, resp: Response) {
    resp.status(200).send(await this.service.getAll())
  }

  private async create(req: Request, resp: Response) {
    resp.status(201).send(await this.service.create(req.body))
  }

  private async getById(req: Request, resp: Response) {
    resp.status(200).send(await this.service.getById(req.params.id))
  }

  private async update(req: Request, resp: Response) {
    resp.status(200).send(await this.service.update(req.params.id, req.body))
  }

  private async delete(req: Request, resp: Response) {
    resp.status(204).send(await this.service.delete(req.params.id))
  }
}