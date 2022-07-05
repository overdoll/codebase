import { Grid, GridProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends GridProps {
  children: ReactNode
}

export default function GridWrap ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Grid
      rowGap={3}
      columnGap={3}
      templateColumns='repeat(auto-fill, minmax(120px, 1fr))'
      justify='center'
      {...rest}
    >
      {children}
    </Grid>
  )
}
