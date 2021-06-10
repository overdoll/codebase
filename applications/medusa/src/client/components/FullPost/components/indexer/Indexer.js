/**
 * @flow
 */
import type { Node } from 'react'
import { Box, HStack } from '@chakra-ui/react'

type Props = {
  length: number,
  currentIndex: number,
  sidesPerView?: number,
}

export default function Indexer ({ length, currentIndex, slidesPerView, ...rest }: Props): Node {
  const calculateIndex = (length) => {
    return length - (slidesPerView - 1) < 0 ? 1 : length - (slidesPerView - 1)
  }

  return (
    <HStack display={length <= slidesPerView ? 'none' : 'flex'} align='center' justify='center' {...rest}>
      {[...Array(calculateIndex(length)).keys()].map((key) => {
        return (
          <Box
            w={key === currentIndex ? 2 : 1} h={key === currentIndex ? 2 : 1}
            bg={key === currentIndex ? 'gray.500' : 'gray.700'} borderRadius='full'
            key={key}
          />
        )
      })}
    </HStack>
  )
}
Indexer.defaultProps = {
  slidesPerView: 1
}
