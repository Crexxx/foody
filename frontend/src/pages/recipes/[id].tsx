import { ArrowBack } from '@mui/icons-material'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useRouter } from 'next/router'
import { CSSProperties } from 'react'
import { useTranslation } from 'next-i18next'
import { useGetRecipeByIdQuery } from '../../recipes/recipeApi'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
    backgroundPositionY: '50%',
    backgroundSize: 'cover'
  }
  const imageTitleStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center'
  }

  return <Container sx={{}}>
    <Stack direction="row" alignItems="center" gap={1} onClick={() => router.back()} sx={{ width: 'fit-content', marginTop: 2, marginBottom: 2, cursor: 'pointer' }}>
      <ArrowBack />
      <Typography variant="body1">{t('back')}</Typography>
    </Stack>
    <Paper>
      <Grid container>
        <Grid item xs={12} style={imageStyle}>
          <div style={imageTitleStyle}>
            <Typography variant="h1">{recipe.name}</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  </Container>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}
