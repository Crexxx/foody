const recipe = require('../cluster/foody/backup/1/recipe.json')

// steps
const steps = recipe.steps.map(step => ({
  text: step.instruction,
  ingredientRefs: []
}))

// ingredients
const ingredients = recipe.steps.flatMap(step => step.ingredients).map(ing => ({
  name: ing.food.name,
  unit: ing.unit?.name ?? '',
  amount: ing.amount,
  ref: ''
}))

const mapped = {
  name: recipe.name,
  id: '',
  imageUrl: '',
  steps,
  ingredients,
}

console.log(JSON.stringify(mapped))