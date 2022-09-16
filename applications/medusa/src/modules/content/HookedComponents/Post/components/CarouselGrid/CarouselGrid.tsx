import { Grid } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  galleryLength: number
  children: ReactNode
}

export default function CarouselGrid (props: Props): JSX.Element {
  const {
    galleryLength,
    children
  } = props

  if (galleryLength <= 1) {
    return <></>
  }

  return (
    <Grid
      w='100%'
      h='100%'
      maxW='container.md'
      gap={1}
      templateColumns={galleryLength > 10 ? 'repeat(10, 1fr)' : `repeat(${galleryLength}, 1fr)`}
      templateRows={galleryLength > 10 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
    >
      {children}
    </Grid>
  )
}
