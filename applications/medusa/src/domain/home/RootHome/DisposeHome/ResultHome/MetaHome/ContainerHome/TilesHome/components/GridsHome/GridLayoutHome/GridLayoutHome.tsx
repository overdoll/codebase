import { ReactNode } from 'react'
import { Grid } from '@chakra-ui/react'

interface Props {
  children: ReactNode
  rows?: number
  columns?: number
}

export default function GridLayoutHome (props: Props): JSX.Element {
  const {
    children,
    rows = 2,
    columns = 3
  } = props

  return (
    <Grid
      w='100%'
      gap={1}
      templateColumns={`repeat(${columns}, minmax(120px, 350px))`}
      templateRows={`repeat(${rows}, minmax(100px, 150px))`}
    >
      {children}
    </Grid>
  )
}
