import { Container, Fab, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { CSSProperties } from 'react'
import { useTranslation } from 'next-i18next'
import { useGetRecipeByIdQuery } from '../../../recipes/recipeApi'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { RecipeIngredient, RecipeStep } from '../../../recipes/recipe.interface'
import Item from '../../../components/item'
import { capitalizeFirstLetter } from '../../../utils/stringUtils'
import BackBar from '../../../components/backbar'
import { Edit } from '@mui/icons-material'
import Link from 'next/link'

export default function Recipe() {
  const router = useRouter()
  const id = (router.query.id ?? '') as string
  const { data: recipe, error, isLoading } = useGetRecipeByIdQuery(id)

  const { t } = useTranslation()

  if (isLoading) return <p>Loading...</p>
  if (!recipe) return <p>Error</p>

  const imageStyle: CSSProperties = {
    position: 'relative',
    height: 500,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${recipe.imageUrl}")`,
    backgroundPositionX: '50%',
    backgroundPositionY: '50%',
    backgroundSize: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
  const imageTitleStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center'
  }


  return <Container>
    <BackBar />
    <Paper sx={{ borderRadius: 2 }}>
      <Grid container>
        <Grid item xs={12} style={imageStyle} sx={{ borderRadiusTop: 2 }}>
          <div style={imageTitleStyle}>
            <Typography variant="h2">{recipe.name}</Typography>
          </div>
          <Link href={`/recipes/${id}/edit`}>
            <Fab aria-label="edit" sx={{ position: 'absolute', bottom: -28, right: 16 }}>
              <Edit />
            </Fab>
          </Link>
        </Grid>
        <Grid item xs={12} md={4} sx={{ padding: 2 }}>
          <Typography variant="h5">{t('ingredients', { ns: 'recipe' })}</Typography>
          <TableContainer sx={{ marginTop: 2, overflowX: 'hidden' }}>
            <Table size="small" aria-label="ingredients-table">
              <TableBody>
                {recipe.ingredients.map((ing) => (
                  <TableRow key={ing.name}>
                    <TableCell>{ing.amount > 0 ? ing.amount : ''}</TableCell>
                    <TableCell>{ing.unit}</TableCell>
                    <TableCell sx={{ overflowWrap: 'anywhere' }}>{ing.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={8} sx={{ padding: 2 }}>
          <Typography variant="h5">{capitalizeFirstLetter(t('step', { count: 1337, ns: 'recipe' }))}</Typography>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            {recipe.steps.map((step: RecipeStep, idx: number) => (
              <Item key={idx} sx={{ textAlign: 'justify' }}><b>{`${idx + 1}. ${capitalizeFirstLetter(t('step', { ns: 'recipe' }))}`}</b><br />{step.text}</Item>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  </Container>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'recipe']))
    }
  }
}
