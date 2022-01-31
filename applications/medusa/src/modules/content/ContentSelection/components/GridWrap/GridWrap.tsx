import { Grid, HTMLChakraProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function GridWrap ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Grid
      rowGap={4}
      columnGap={4}
      templateColumns='repeat(auto-fill, minmax(120px, 1fr))'
      justify='center'
      {...rest}
    >
      {children}
    </Grid>
  )
}
