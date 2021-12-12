import { Flex } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function NavigationContents ({ children }: Props): JSX.Element {
  return (
    <Flex direction={{
      base: 'column',
      md: 'row'
    }}
    >
      {children}
    </Flex>
  )
}
