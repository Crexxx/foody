import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../redux/store'
import { Recipe } from './recipe.interface'

interface RecipesState {
  recipes: Recipe[]
}

const initialState: RecipesState = {
  recipes: []
}

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
  }
})

export const selectRecipes = (state: AppState) => state.recipes.recipes

export default recipesSlice.reducer