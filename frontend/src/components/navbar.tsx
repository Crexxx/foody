import { alpha, AppBar, Box, Divider, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, styled, SwipeableDrawer, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { toggleDarkMode } from '../theme/themeSlice'
import React from 'react'
import { LocalPizza } from '@mui/icons-material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Language } from '@mui/icons-material'
import { useRouter } from 'next/router'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const Offset = styled('div')(({ theme }: { theme: Theme }) => theme.mixins.toolbar)

export default function NavBar() {
  const darkMode = useAppSelector(state => state.theme.darkMode)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation()
  const [state, setState] = React.useState({
    drawerOpen: false
  })
  const [language, setLanguage] = React.useState(router.locale ?? 'en')
  const handleLanguageChange = (event: SelectChangeEvent) => {
    const locale = event.target.value as string
    setLanguage(locale)
    router.push(router.asPath, router.asPath, { locale })
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return
    }
    setState({ ...state, drawerOpen: !state.drawerOpen })
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Foody
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('search')}
              inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </AppBar>
      <Offset />
      <SwipeableDrawer anchor='left' open={state.drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box sx={{ width: 250, height: '100%' }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <Link href="/">
              <ListItemButton>
                <ListItem disablePadding>
                  <ListItemText primary={'Foody'} />
                </ListItem>
              </ListItemButton>
            </Link>
            <Divider />
            <Link href="/recipes">
              <ListItemButton>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <LocalPizza />
                  </ListItemIcon>
                  <ListItemText primary={t('recipes')} />
                </ListItem>
              </ListItemButton>
            </Link>
            <Divider />
          </List>
          <List style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <ListItem>
              <ListItemIcon><Language /></ListItemIcon>
              <ListItemText primary={t('language')} />
              <Select id="language-select" value={language} onChange={handleLanguageChange}>
                <MenuItem value={'en'}>{'en'}</MenuItem>
                <MenuItem value={'de'}>{'de'}</MenuItem>
              </Select>
            </ListItem>
            <ListItemButton onClick={(_event) => dispatch(toggleDarkMode())}>
              <ListItem>
                <ListItemIcon>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </ListItemIcon>
                <ListItemText primary={t('darkMode')} />
              </ListItem>
            </ListItemButton>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  )
}