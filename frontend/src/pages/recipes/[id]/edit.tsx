
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetRecipeByIdQuery } from '../../../recipes/recipeApi'
import RecipeEditComponent from '../../../recipes/edit/recipeEdit'

export default function RecipeEdit() {
  const router = useRouter()

  const id = (router.query.id ?? '') as string
  const { data: recipe, error, isLoading } = useGetRecipeByIdQuery(id)

  if (isLoading) return <p>Loading...</p>
  if (error || !recipe) return <p>Error!</p>

  return <RecipeEditComponent recipe={recipe} />
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'recipe']))
    }
  }
}