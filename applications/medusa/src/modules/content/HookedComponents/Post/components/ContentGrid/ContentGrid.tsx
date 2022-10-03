import { Grid, GridProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends GridProps {
  children: ReactNode
  contentLength: number
}

export default function ContentGrid (props: Props): JSX.Element {
  const {
    children,
    contentLength,
    ...rest
  } = props

  const template = contentLength > 1 ? '1fr 60px' : '1fr'

  return (
    <Grid
      w='100%'
      h='100%'
      gap={contentLength > 1 ? 1 : 0}
      templateAreas={`
      "gallery"
      "carousel"
      `}
      templateRows={template}
      {...rest}
    >
      {children}
    </Grid>
  )
}
