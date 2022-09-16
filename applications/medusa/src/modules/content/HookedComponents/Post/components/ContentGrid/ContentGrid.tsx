import { Grid } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  contentLength: number
}

export default function ContentGrid (props: Props): JSX.Element {
  const {
    children,
    contentLength
  } = props

  const template = contentLength > 1 ? '1fr 40px' : '1fr 0px'

  return (
    <Grid
      overflow='hidden'
      w='100%'
      h='100%'
      gap={2}
      templateAreas={`
      "gallery"
      "carousel"
      `}
      templateRows={{
        base: template
      }}
      templateColumns={{
        lg: template
      }}
    >
      {children}
    </Grid>
  )
}
