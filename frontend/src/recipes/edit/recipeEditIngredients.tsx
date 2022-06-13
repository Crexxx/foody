import { Add, Clear } from '@mui/icons-material'
import { Fab, IconButton, Input, InputAdornment, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { createRef, KeyboardEvent, useMemo, useState } from 'react'
import { Recipe, RecipeIngredient } from '../recipe.interface'

export interface RecipeEditIngreditensProps {
  recipe: Recipe
  onIngredientChange: (i: number, newIngredient: RecipeIngredient) => void
  onIngredientDelete: (i: number) => void
}

export function RecipeEditIngredients({ recipe, onIngredientChange, onIngredientDelete }: RecipeEditIngreditensProps) {
  const { t } = useTranslation()
  const [ingredients, setIngredients] = useState(mapRecipe(recipe))
  const [focus, setFocus] = useState(new Array(ingredients.length).fill(false))
  const ingredientRefs = useMemo(() => new Array(ingredients.length).fill(0).map(() => createRef<any>()), [ingredients.length])

  const handleChange = (i: number, text: string) => {
    setIngredients(prevState => {
      const ingredients = [...prevState]
      ingredients[i] = text
      return ingredients
    })
  }

  const handleBlur = (i: number, text: string) => {
    if (text.length === 0) {
      handleDelete(i)
      return
    }

    const parsed = convertStringToRecipeIngredient(text)
    console.log(parsed)

    if (i >= recipe.ingredients.length ||
      parsed.amount !== recipe.ingredients[i].amount ||
      parsed.unit !== recipe.ingredients[i].unit ||
      parsed.name !== recipe.ingredients[i].name) {
      onIngredientChange(i, parsed)
    }
  }

  const handleAdd = () => {
    setFocus(prevState => {
      return [...prevState, true]
    })
    setIngredients(prevState => {
      return [...prevState, '']
    })
  }

  const handleDelete = (i: number) => {
    setFocus(prevState => {
      prevState.splice(i, 1)
      return prevState
    })
    setIngredients(prevState => {
      prevState.splice(i, 1)
      return prevState
    })
    onIngredientDelete(i)
  }

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e)
    switch (e.key) {
      case 'Tab':
        if (e.shiftKey) {
          e.preventDefault()
          if (i > 0) ingredientRefs[i - 1].current!.focus()
          break
        }
      // else do the same as Enter, ArrowDown
      case 'Enter':
      case 'ArrowDown':
        e.preventDefault()
        if (i === ingredients.length - 1) {
          handleAdd()
        } else {
          ingredientRefs[i + 1].current!.focus()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (i > 0) ingredientRefs[i - 1].current!.focus()
        break
      case 'Backspace':
        if ((e.target as HTMLInputElement).value === '') {
          e.preventDefault()
          if (i > 0) ingredientRefs[i - 1].current!.focus()
        }
    }
  }

  return <>
    <Typography variant="h5">{t('ingredients', { ns: 'recipe' })}</Typography>
    <Stack spacing={1} pr={2}>
      {ingredients.map((ingredient, i) => (
        <Input
          key={i}
          value={ingredient}
          inputRef={ingredientRefs[i]}
          autoFocus={focus[i]}
          onBlur={(e) => handleBlur(i, e.target.value)}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          endAdornment={<InputAdornment position="end">
            <IconButton aria-label="delete" onClick={() => handleDelete(i)} size="small">
              <Clear fontSize='inherit' />
            </IconButton>
          </InputAdornment>}
          size="small"
          fullWidth />
      ))}
      <Fab onClick={() => handleAdd()} aria-label="add" size="small" color="primary" sx={{ left: '50%' }}>
        <Add />
      </Fab>
    </Stack>
  </>
}

// TODO fetch from backend
const units = [
  'g',
  'ml',
  'tl',
  'el',
  'bund'
]

function convertStringToRecipeIngredient(s: string): RecipeIngredient {
  // remove double spaces
  s = s.replace(/\s+/g, ' ').trim()

  const parts = s.split(' ')
  // check if amount is included
  if (parts.length <= 1) {
    return { amount: 0, unit: '', name: s, ref: '' }
  }

  // check if there is just no space between amount and unit
  let unit = units.find(unit => {
    return parts[0].includes(unit)
  })
  if (unit) {
    let amountSplit = parts[0].split(unit)
    if (amountSplit.length === 2 && !isNaN(+amountSplit[0])) {
      return { amount: +amountSplit[0], unit, name: parts.slice(1).join(' '), ref: '' }
    }
  } else if (isNaN(+parts[0])) {
    return { amount: 0, unit: '', name: s, ref: '' }
  }

  // check if a known (!) unit is entered
  if (!units.includes(parts[1].trim().toLowerCase())) {
    return { amount: +parts[0], unit: '', name: parts.slice(1).join(' '), ref: '' }
  }

  return { amount: +parts[0], unit: parts[1], name: parts.slice(2).join(' '), ref: '' }
}

function mapRecipe(recipe: Recipe) {
  return recipe.ingredients.map(ingredientString)
}

function ingredientString(ingredient: RecipeIngredient) {
  const amount = ingredient.amount > 0 ? `${ingredient.amount} ` : ''
  const unit = ingredient.unit ? `${ingredient.unit} ` : ''
  return amount + unit + ingredient.name
}