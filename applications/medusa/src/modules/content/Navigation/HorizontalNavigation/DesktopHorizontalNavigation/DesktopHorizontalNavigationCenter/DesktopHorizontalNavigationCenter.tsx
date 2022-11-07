import { Flex, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DesktopHorizontalNavigationCenter (props: Props): JSX.Element {
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
        maxW={{
          base: 'container.xs',
          lg: 'container.md'
        }}
        px={2}
        w='100%'
        justify='space-evenly'
      >
        {children}
      </HStack>
    </Flex>
  )
}
