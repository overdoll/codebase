import { Center, Flex, Grid } from '@chakra-ui/react'
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
    <Center w='100%'>
      <Flex
        maxW='container.sm'
        overflowY='hidden'
        overflowX='scroll'
        justify='center'
        w='100%'
        h='100%'
        px={1}
      >
        <Grid
          h='50px'
          w='100%'
          justifyContent={galleryLength > 5 ? 'flex-start' : 'center'}
          gap={1}
          templateColumns={`repeat(${galleryLength}, minmax(50px, 100px))`}
        >
          {children}
        </Grid>
      </Flex>
    </Center>
  )
}
