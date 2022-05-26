import { BaseRecipe, Recipe } from '../model/recipe.interface'

export interface RecipeService {
  getAll(): Promise<Recipe[]>
  getById(id: string): Promise<Recipe>
  create(recipe: BaseRecipe): Promise<Recipe>
  update(id: string, recipe: Recipe): Promise<Recipe>
  delete(id: string): Promise<void>
}