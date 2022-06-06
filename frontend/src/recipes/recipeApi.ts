import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Recipe } from '../recipes/recipe.interface'

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/recipe' }),
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({ query: () => '' }),
    getRecipeById: builder.query<Recipe, string>({ query: (id) => `/${id}` })
  })
})

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipeApi