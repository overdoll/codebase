/**
 * @flow
 */
import type { Node } from 'react'

import { Stack, Box, Heading, Text, Wrap, WrapItem, Flex } from '@chakra-ui/react'

type Props = {
  id: string,
  thumbnail: string,
  label: string
}

export default function TagPreview ({ id, thumbnail, label, ...rest }: Props): Node {
  return (
    <Flex bg='gray.800' {...rest}>
      <Text>
        tag preview
      </Text>
    </Flex>
  )
}
