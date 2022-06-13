import { Save } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import BackBar from '../../components/backbar'
import { deepCopy } from '../../utils/objectUtils'
import { Recipe, RecipeIngredient } from '../recipe.interface'
import { useUpdateRecipeMutation } from '../recipeApi'
import { RecipeEditIngredients } from './recipeEditIngredients'
import { RecipeEditSteps } from './recipeEditSteps'

export interface RecipeEditComponentProps {
  recipe: Recipe
}

export default function RecipeEditComponent({ recipe: _recipe }: RecipeEditComponentProps) {
  const [recipe, setRecipe] = useState(deepCopy(_recipe))
  const [isSaving, setIsSaving] = useState(false)
  const [updateRecipe] = useUpdateRecipeMutation()
  const router = useRouter()
  const { t } = useTranslation()

  const handleAddStep = (stepIdx: number) => {
    setRecipe(prevState => {
      const steps = [...prevState.steps]
      steps.splice(stepIdx + 1, 0, { text: '', ingredientRefs: [] })

      return { ...prevState, steps }
    })
  }

  const handleDeleteStep = (stepIdx: number) => {
    setRecipe(prevState => {
      const steps = [...prevState.steps]
      steps.splice(stepIdx, 1)

      return { ...prevState, steps }
    })
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecipe(prevState => ({
      ...prevState,
      name: event.target.value
    }))
  }

  const handleStepTextChange = (newText: string, stepIdx: number) => {
    setRecipe(prevState => {
      const steps = prevState.steps
      steps[stepIdx].text = newText
      return { ...prevState, steps }
    })
  }

  const handleIngredientChange = (i: number, ingredient: RecipeIngredient) => {
    setRecipe(prevState => {
      const ingredients = prevState.ingredients
      if (i < ingredients.length) ingredients[i] = ingredient
      else ingredients.push(ingredient)
      return { ...prevState, ingredients }
    })
  }

  const handleIngredientDelete = (i: number) => {
    setRecipe(prevState => {
      const ingredients = prevState.ingredients
      ingredients.splice(i, 1)
      return { ...prevState, ingredients }
    })
  }

  const onSaveClick = () => {
    setIsSaving(true)
    
    updateRecipe(recipe).then(() => {
      setIsSaving(false)
      router.back()
    })
  }

  return <Container>
    <BackBar />
    <Paper sx={{ borderRadius: 2, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">{t('edit_recipe', { ns: 'recipe' })}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField id="name" label={t('name')} variant="standard" value={recipe.name} onChange={(e) => handleNameChange(e)} fullWidth />
        </Grid>
        <Grid item xs={12} md={4} >
          <RecipeEditIngredients
            recipe={recipe}
            onIngredientChange={handleIngredientChange}
            onIngredientDelete={handleIngredientDelete} />
        </Grid>
        <Grid item xs={12} md={8}>
          <RecipeEditSteps
            recipe={recipe}
            onStepTextChange={handleStepTextChange}
            onAddStep={handleAddStep}
            onDeleteStep={handleDeleteStep} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="end">
            <LoadingButton onClick={onSaveClick} loading={isSaving} variant="contained" startIcon={<Save />}>{t('save')}</LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  </Container>
}