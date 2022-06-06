import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { recipeApi } from '../recipes/recipeApi'
import { recipesSlice } from '../recipes/recipesSlice'
import { themeSlice } from '../theme/themeSlice'

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    recipes: recipesSlice.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware)
})

setupListeners(store.dispatch)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store