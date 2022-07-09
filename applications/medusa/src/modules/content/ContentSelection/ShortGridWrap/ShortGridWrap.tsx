import { Grid, GridProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends GridProps {
  children: ReactNode
}

export default function ShortGridWrap ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Grid
      overflow='visible'
      rowGap={1}
      columnGap={1}
      templateColumns='repeat(auto-fill, minmax(90px, 1fr))'
      justify='center'
      {...rest}
    >
      {children}
    </Grid>
  )
}
