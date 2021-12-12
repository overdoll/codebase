import { Text } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
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
