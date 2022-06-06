import { Container, ImageList, ImageListItem, ImageListItemBar, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { useGetRecipesQuery } from '../../recipes/recipeApi'

export default function Recipes() {
  const { data: recipes, error, isLoading } = useGetRecipesQuery()

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const isLg = useMediaQuery(theme.breakpoints.down('lg'))
  const cols = isSm ? 1 : isMd ? 2 : isLg ? 3 : 4

  let items = []
  if (isLoading) {
    items = Array.from({ length: 15 }, (_, i) => (
      <ImageListItem key={i}>
        <Skeleton variant="rectangular" height={341} />
        <ImageListItemBar title={<Skeleton variant="text" />} />
      </ImageListItem>
    ))
    // return <p>Loading...</p>
  } else {
    if (!recipes) return <p>No recipes</p>

    items = (recipes as any[]).map((recipe, idx) => (
      <Link key={idx} href={`/recipes/${recipe.id}`}>
        <ImageListItem sx={{ cursor: 'pointer' }}>
          <img src={recipe.imageUrl} alt={recipe.name} loading="lazy" />
          <ImageListItemBar title={recipe.name} />
        </ImageListItem>
      </Link>
    ))
  }

  return <Container maxWidth="lg">
    <ImageList cols={cols} gap={2}>
      {items}
    </ImageList>
  </Container>
}