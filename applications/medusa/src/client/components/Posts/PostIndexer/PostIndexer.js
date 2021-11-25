/**
 * @flow
 */
import type { Node } from 'react'
import { Box, HStack } from '@chakra-ui/react'

type Props = {
  length: number,
  currentIndex: number,
  slidesPerView?: number,
}

export default function PostIndexer ({ length, currentIndex, slidesPerView, ...rest }: Props): Node {
  const calculateIndex = (length) => {
    return length - (slidesPerView - 1) < 0 ? 1 : length - (slidesPerView - 1)
  }

  return (
    <HStack
      py={2} spacing={1} display={length <= slidesPerView ? 'none' : 'flex'} align='center'
      justify='center' {...rest}
    >
      {[...Array(calculateIndex(length)).keys()].map((key) => {
        return (
          <Box
            borderWidth={1}
            borderColor='gray.300'
            w={key === currentIndex ? 2 : 1} h={key === currentIndex ? 2 : 1}
            bg={key === currentIndex ? 'gray.500' : 'gray.700'} borderRadius='sm'
            key={key}
          />
        )
      })}
    </HStack>
  )
}
PostIndexer.defaultProps = {
  slidesPerView: 1
}
