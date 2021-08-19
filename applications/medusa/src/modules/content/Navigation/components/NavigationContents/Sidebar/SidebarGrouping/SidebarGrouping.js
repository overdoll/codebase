/**
 * @flow
 */
import { Text } from '@chakra-ui/react'
import type { Node } from 'react'

type Props = {
  children: Node,
  label: string,
}

export default function SidebarGrouping ({ children, label }: Props): Node {
  return (
    <>
      {label !== 'undefined' && <Text mb={1}>{label}</Text>}
      {children}
    </>
  )
}
