import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  label: string
}

export default function SidebarGrouping ({
  children,
  label
}: Props): JSX.Element {
  return (
    <>
      {label !== 'undefined' && <Text mb={1}>{label}</Text>}
      {children}
    </>
  )
}
