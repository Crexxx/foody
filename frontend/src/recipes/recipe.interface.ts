import { Ingredient, isIngredient, toExplicitIngredient } from '../ingredients/ingredient.interface'

export interface BaseRecipe {
  name: string
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  imageUrl: string
}

export interface Recipe extends BaseRecipe {
  id: string
}

export interface RecipeIngredient extends Ingredient {
  amount: number
  unit: string
  ref: string
}

export interface RecipeStep {
  text: string
  ingredientRefs: string[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBaseRecipe(obj: any): obj is BaseRecipe {
  return 'name' in obj &&
    'ingredients' in obj &&
    'steps' in obj &&
    'imageUrl' in obj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toExplicitBaseRecipe(obj: BaseRecipe): BaseRecipe {
  const ingredients = obj.ingredients.map(toExplicitRecipeIngredient)
  const steps = obj.steps.map(toExplicitRecipeStep)
  return {
    name: obj.name,
    ingredients: ingredients,
    steps: steps,
    imageUrl: obj.imageUrl
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRecipe(obj: any): obj is Recipe {
  return isBaseRecipe(obj) &&
    'id' in obj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toExplicitRecipe(obj: Recipe): Recipe {
  const exp = toExplicitBaseRecipe(obj) as Recipe
  exp.id = obj.id
  return exp
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRecipeIngredient(obj: any): obj is RecipeIngredient {
  return isIngredient(obj) &&
    'amount' in obj &&
    'unit' in obj &&
    'ref' in obj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toExplicitRecipeIngredient(obj: RecipeIngredient): RecipeIngredient {
  const exp = toExplicitIngredient(obj) as RecipeIngredient
  exp.amount = obj.amount
  exp.unit = obj.unit
  exp.ref = obj.ref
  return exp
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRecipeStep(obj: any): obj is RecipeStep {
  return 'text' in obj &&
    'ingredientRefs' in obj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toExplicitRecipeStep(obj: RecipeStep): RecipeStep {
  return {
    text: obj.text,
    ingredientRefs: obj.ingredientRefs
  }
}