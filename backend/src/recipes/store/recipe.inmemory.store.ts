import { v4 as uuid } from 'uuid'

import { RecipeNotFoundError } from '../errors/recipeNotFoundError'
import { BaseRecipe, Recipe } from '../model/recipe.interface'
import { RecipeStore } from './recipe.store.interface'

const recipes: Recipe[] = [
  { "name": "Gnocchi-Pfanne mit grünem Gemüse und Basilikum-Sauce", "id": "3f5cd5d5-6910-4705-852d-b35c2f894e25", "imageUrl": "https://www.iqskitchen.de/wp-content/uploads/2020/03/DSC02352-2-750x750.jpg", "steps": [{ "text": "Die Zutaten für die Sauce in ein hohes Gefäß geben und pürieren. (Hinweis: Je nach dem, ob Proteinpulver dazukommt, etwas Wasser hinzugeben, sodass eine sämige Konsistenz entsteht.) Abschmecken und gegebenenfalls nachwürzen.", "ingredientRefs": [] }, { "text": "Die Gnocchi in einer leicht eingefetteten Pfanne goldbraun anbraten und in eine Schüssel geben.", "ingredientRefs": [] }, { "text": "Etwas Öl in die noch heiße Pfanne geben und den gehackten Knoblauch, den gewürfelten Spargel und die Frühlingszwiebel dazugeben. Scharf anbraten und kurz darauf die Erbsen und die halbierten Tomaten dazugeben. Gut würzen und die Temperatur auf mittlere Stufe reduzieren.", "ingredientRefs": [] }, { "text": "Mit der Sauce ablöschen und leicht köcheln lassen (nicht zu stark). Sobald die Sauce etwas eingekocht ist, die Pfanne von der Herdplatte nehmen und das Gericht mit frischem Basilikum und geriebenem Parmesan servieren.", "ingredientRefs": [] }], "ingredients": [{ "name": "Milch", "unit": "ml", "amount": 75, "ref": "" }, { "name": "Gemüsebrühpulver", "unit": "TL", "amount": 1, "ref": "" }, { "name": "Ggf. Wasser", "unit": "", "amount": 0, "ref": "" }, { "name": "Frischkäse", "unit": "g", "amount": 50, "ref": "" }, { "name": "Basilikum", "unit": "Bund", "amount": 1, "ref": "" }, { "name": "Senf", "unit": "TL", "amount": 1, "ref": "" }, { "name": "Total Protein \"Geschmacksneutral\"", "unit": "g", "amount": 20, "ref": "" }, { "name": "Gnocchi", "unit": "g", "amount": 250, "ref": "" }, { "name": "Knoblauchzehe", "unit": "", "amount": 1, "ref": "" }, { "name": "Grüner Spargel", "unit": "", "amount": 4.5, "ref": "" }, { "name": "Frühlingszwiebel", "unit": "", "amount": 1, "ref": "" }, { "name": "TK-Erbsen", "unit": "g", "amount": 100, "ref": "" }, { "name": "Kleine Tomaten", "unit": "", "amount": 6, "ref": "" }] },
  {
    id: '8dfd1de7-13f7-4d60-b84d-97185e1c59c3',
    name: 'Test2',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/classic-lasange-4a66137.jpg?quality=90&webp=true&resize=300,272',
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
  },
  {
    id: '8dfd1de7-13f7-4d60-b84d-97185e1c59c3',
    name: 'Test1',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
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
  },
  {
    id: '8dfd1de7-13f7-4d60-b84d-97185e1c59c3',
    name: 'Test2',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/classic-lasange-4a66137.jpg?quality=90&webp=true&resize=300,272',
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
  },
  {
    id: '8dfd1de7-13f7-4d60-b84d-97185e1c59c3',
    name: 'Test1',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
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
  },
  {
    id: '8dfd1de7-13f7-4d60-b84d-97185e1c59c3',
    name: 'Test2',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/classic-lasange-4a66137.jpg?quality=90&webp=true&resize=300,272',
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
  },
  {
    id: '8dfd1de7-13f7-4d60-b84d-97185e1c59c3',
    name: 'Test2',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/classic-lasange-4a66137.jpg?quality=90&webp=true&resize=300,272',
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
  }
]

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