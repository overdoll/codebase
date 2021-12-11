/**
 * @flow
 */
import { Flex, Spinner } from '@chakra-ui/react'
import type { Node } from 'react'

export default function CenteredSpinner (): Node {
  return (
    <Flex mt={40} h='100%' align='center' justify='center' direction='column'>
      <Spinner mb={6} thickness={4} size='xl' color='primary.500' />
    </Flex>
  )
}
