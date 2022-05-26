import { v4 as uuid } from 'uuid'

import { RecipeNotFoundError } from '../errors/recipeNotFoundError'
import { BaseRecipe, Recipe } from '../model/recipe.interface'
import { RecipeStore } from './recipe.store.interface'

const recipes: Recipe[] = [{
  id: '8dfd1de7-13f7-4d60-b84d-97185e1c59c3',
  name: 'Test1',
  ingredients: [{
    name: 'Salz',
    amount: 1,
    unit: 'TL',
    ref: '2c92f15c-1f06-45cf-96bf-af6e31c57dc0'
  }],
  steps: [{
    text: 'Salzen',
    ingredientRefs: ['2c92f15c-1f06-45cf-96bf-af6e31c57dc0']
  }]
}]

export class RecipeInMemoryStore implements RecipeStore {
  async create(recipe: BaseRecipe): Promise<Recipe> {
    (recipe as Recipe).id = uuid()
    recipes.push(recipe as Recipe)
    return recipe as Recipe
  }

  async update(recipe: Recipe): Promise<Recipe> {
    const idx = recipes.findIndex((r) => r.id === recipe.id)
    if (idx === -1) {
      throw new RecipeNotFoundError(recipe.id)
    }

    recipes[idx] = recipe
    return recipes[idx]
  }

  async delete(id: string): Promise<void> {
    const idx = recipes.findIndex((r) => r.id === id)
    if (idx === -1) {
      throw new RecipeNotFoundError(id)
    }

    recipes.splice(idx, 1)
  }

  async findAll(): Promise<Recipe[]> {
    return recipes
  }

  async findById(id: string): Promise<Recipe> {
    const idx = recipes.findIndex((r) => r.id === id)
    if (idx === -1) {
      throw new RecipeNotFoundError(id)
    }

    return recipes[idx]
  }

}