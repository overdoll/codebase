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

  const template = contentLength > 1 ? '1fr 60px' : '1fr'

  return (
    <Grid
      w='100%'
      h='100%'
      gap={1}
      templateAreas={`
      "gallery"
      "carousel"
      `}
      templateRows={template}
    >
      {children}
    </Grid>
  )
}
