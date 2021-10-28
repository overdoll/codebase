/**
 * @flow
 */
import type { Node } from 'react'
import { Stack } from '@chakra-ui/react'

type Props = {}

export default function RowWrap ({ children }: Props): Node {
  return (
    <Stack spacing={2}>
      {children}
    </Stack>
  )
}
