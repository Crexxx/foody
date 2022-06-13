import { ArrowBack } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function BackBar() {
  const router = useRouter()
  const { t } = useTranslation()

  return <Stack direction="row" alignItems="center" gap={1} onClick={() => router.back()} sx={{ width: 'fit-content', marginTop: 2, marginBottom: 2, cursor: 'pointer' }}>
    <ArrowBack />
    <Typography variant="body1">{t('back')}</Typography>
  </Stack>
}