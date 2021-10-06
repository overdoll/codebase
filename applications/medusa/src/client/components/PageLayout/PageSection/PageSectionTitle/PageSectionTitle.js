/**
 * @flow
 */
import type { Node } from 'react'
import { Divider, Heading } from '@chakra-ui/react'

type Props = {
  children: string
};

export default function PageSectionTitle ({ children }: Props): Node {
  return (
    <>
      <Heading fontSize='2xl' color='gray.00'>{children}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={1} />
    </>
  )
}
