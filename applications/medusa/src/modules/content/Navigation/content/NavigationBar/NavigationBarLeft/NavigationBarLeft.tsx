import { Flex } from '@chakra-ui/react'

interface Props {
  children: Node
}

export default function NavigationBarLeft ({ children }: Props): JSX.Element {
  return (
    <Flex
      display={{
        base: 'none',
        md: 'flex'
      }}
      left={0}
      ml={3}
    >
      {children}
    </Flex>
  )
}
