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
        spacing={{
          base: 2,
          md: 12,
          lg: 28
        }}
      >
        {children}
      </HStack>
    </Flex>
  )
}
