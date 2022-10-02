import { Flex, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function MobileHorizontalNavigationCenter (props: Props): JSX.Element {
  const { children } = props
  return (
    <Flex
      zIndex={-1}
      position='absolute'
      justify='center'
      margin='auto'
      w='100%'
    >
      <HStack
        spacing={7}
      >
        {children}
      </HStack>
    </Flex>
  )
}
