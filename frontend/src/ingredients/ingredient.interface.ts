export interface Ingredient {
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIngredient(obj: any): obj is Ingredient {
  return 'name' in obj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toExplicitIngredient(obj: any): Ingredient {
  return {
    name: obj.name
  }
}