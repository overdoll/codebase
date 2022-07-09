import { Grid, GridProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends GridProps {
  children: ReactNode
}

export default function MediumGridWrap ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Grid
      overflow='visible'
      rowGap={2}
      columnGap={2}
      templateColumns={{
        base: 'repeat(auto-fill, minmax(90px, 1fr))',
        md: 'repeat(auto-fill, minmax(120px, 1fr))'
      }}
      justify='center'
      {...rest}
    >
      {children}
    </Grid>
  )
}
