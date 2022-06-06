import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../redux/store'

interface ThemeState {
  darkMode: boolean
}

const initialState: ThemeState = {
  darkMode: true
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
    }
  }
})

export const { toggleDarkMode } = themeSlice.actions
export const selectDarkMode = (state: AppState) => state.theme.darkMode

export default themeSlice.reducer