/**
 * @flow
 */
import type { Node } from 'react'
import { Stack } from '@chakra-ui/react'

type Props = {
  children: Node
}

export default function RowWrap ({ children }: Props): Node {
  return (
    <Stack spacing={2}>
      {children}
    </Stack>
  )
}
