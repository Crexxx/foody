import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/layout'
import { useAppSelector } from '../redux/hooks'
import store from '../redux/store'
import '../config/i18n'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <ThemeContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext>
  </Provider>
}

const ThemeContext = (props: any) => {
  const darkMode = useAppSelector(state => state.theme.darkMode)
  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } })

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {props.children}
  </ThemeProvider>
}