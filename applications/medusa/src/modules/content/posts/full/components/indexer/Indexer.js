/**
 * @flow
 */
import type { Node } from 'react'
import { Box, HStack } from '@chakra-ui/react'

type Props = {
  length: number,
  currentIndex: number
}

export default function Indexer ({ length, currentIndex }: Props): Node {
  return (
    <HStack align='center' justify='center'>
      {[...Array(length).keys()].map((key) => {
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
