import { Paper, styled, Theme } from '@mui/material'

const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  ...theme.typography.body1,
  padding: theme.spacing(1)
}))

export default Item