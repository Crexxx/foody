import { RecipeBadRequestError } from '../errors/recipeBadRequestError'
import { isBaseRecipe, isRecipe, Recipe, toExplicitBaseRecipe, toExplicitRecipe } from '../model/recipe.interface'
import { RecipeInMemoryStore } from '../store/recipe.inmemory.store'
import { RecipeStore } from '../store/recipe.store.interface'
import { RecipeService } from './recipe.service.interface'

export class RecipeServiceImpl implements RecipeService {
  store: RecipeStore = new RecipeInMemoryStore()

  async getAll(): Promise<Recipe[]> {
    return this.store.findAll()
  }

  async getById(id: string): Promise<Recipe> {
    return this.store.findById(id)
  }

  async create(recipe: unknown): Promise<Recipe> {
    if (!isBaseRecipe(recipe)) {
      throw new RecipeBadRequestError('invalid object')
    }

    return this.store.create(toExplicitBaseRecipe(recipe))
  }

  async update(id: string, recipe: unknown): Promise<Recipe> {
    if (!isRecipe(recipe)) {
      throw new RecipeBadRequestError('invalid object')
    }

    if (id !== recipe.id) {
      throw new RecipeBadRequestError('invalid id')
    }

    return this.store.update(toExplicitRecipe(recipe))
  }

  async delete(id: string): Promise<void> {
    await this.store.delete(id)
  }
}
