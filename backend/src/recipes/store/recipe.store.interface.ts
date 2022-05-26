import { BaseRecipe, Recipe } from '../model/recipe.interface'

export interface RecipeStore {
  create(recipe: BaseRecipe): Promise<Recipe>
  update(recipe: Recipe): Promise<Recipe>
  delete(id: string): Promise<void>
  findAll(): Promise<Recipe[]>
  findById(id: string): Promise<Recipe>
}