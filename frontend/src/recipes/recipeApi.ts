import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Recipe } from '../recipes/recipe.interface'

const baseUrl = 'http://localhost:8080/api/v1/recipe'
// const baseUrl = 'http://192.168.178.33:8080/api/v1/recipe'

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Recipes'],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => '',
      providesTags: (result) => result ? result.map(({ id }) => ({ type: 'Recipes', id })) : ['Recipes']
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Recipes', id }]
    }),
    updateRecipe: builder.mutation<Recipe, Recipe>({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Recipes']
    })
  })
})

export const { useGetRecipesQuery, useGetRecipeByIdQuery, useUpdateRecipeMutation } = recipeApi