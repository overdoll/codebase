/**
 * @flow
 */
import type { Node } from 'react'
import { Stack } from '@chakra-ui/react'

type Props = {
  children: string
};

export default function ListSpacer ({ children, ...rest }: Props): Node {
  return (
    <Stack {...rest} spacing={2}>
      {children}
    </Stack>
  )
}
