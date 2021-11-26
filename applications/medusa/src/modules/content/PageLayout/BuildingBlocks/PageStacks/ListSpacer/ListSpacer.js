/**
 * @flow
 */
import type { Node } from 'react'
import { Stack } from '@chakra-ui/react'

type Props = {
  children: string
};

export default function ListSpacer ({ children }: Props): Node {
  return (
    <Stack spacing={2}>
      {children}
    </Stack>
  )
}
