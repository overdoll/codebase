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
        maxW='container.xs'
        px={2}
        spacing={4}
        w='100%'
        justify='space-between'
      >
        {children}
      </HStack>
    </Flex>
  )
}
