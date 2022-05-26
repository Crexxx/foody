import { NotFoundError } from '../../errors/notFoundError'

export class RecipeNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Could not find recipe with id: ${id}`)
  }
}