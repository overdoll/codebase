import { Flex, Grid } from '@chakra-ui/react'
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
    <Flex h='100%' w='100%' align='center' justify='center'>
      <Grid
        h='100%'
        w='100%'
        maxW='container.sm'
        overflow='hidden'
        gap={1}
        justifyContent='center'
        templateColumns={galleryLength > 10 ? 'repeat(10, 1fr)' : `repeat(${galleryLength}, minmax(20px, 100px))`}
        templateRows={galleryLength > 10 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
      >
        {children}
      </Grid>
    </Flex>
  )
}
