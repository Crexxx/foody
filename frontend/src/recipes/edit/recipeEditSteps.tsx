import { Add, Delete, ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Fab, Stack, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { capitalizeFirstLetter } from '../../utils/stringUtils'
import { Recipe } from '../recipe.interface'

export interface RecipeEditStepsProps {
  recipe: Recipe
  onStepTextChange: (newText: string, stepIdx: number) => void
  onAddStep: (stepIdx: number) => void
  onDeleteStep: (stepIdx: number) => void
}

export function RecipeEditSteps({ recipe, onStepTextChange, onAddStep, onDeleteStep }: RecipeEditStepsProps) {
  const { t } = useTranslation()

  return <>
    <Typography variant="h5">
      {capitalizeFirstLetter(t('step', { count: 1337, ns: 'recipe' }))}
    </Typography>
    {recipe.steps.map((step, idx) => (<div key={`step-${idx}`}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`step-${idx + 1}`}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {`${idx + 1}. ${capitalizeFirstLetter(t('step', { ns: 'recipe' }))}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label={t('step_text', { ns: 'recipe' })}
            value={step.text}
            onChange={(e) => onStepTextChange(e.target.value, idx)}
            variant="outlined"
            multiline
            fullWidth />
        </AccordionDetails>
        <AccordionActions>
          <Button
            onClick={() => onDeleteStep(idx)}
            variant="outlined"
            size="small"
            color="error"
            startIcon={<Delete />}>
            {t('delete')}
          </Button>
        </AccordionActions>
      </Accordion>
      <Fab onClick={() => onAddStep(idx)}
        color="primary"
        aria-label="add-step"
        size="small"
        sx={{ left: '50%' }}>
        <Add />
      </Fab>
    </div>
    ))}
  </>
}