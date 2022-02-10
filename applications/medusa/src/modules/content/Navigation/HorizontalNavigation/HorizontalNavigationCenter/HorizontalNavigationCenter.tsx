import { Flex, HStack } from '@chakra-ui/react'
import { RenderOnDesktop, RenderOnMobile } from '../../../PageLayout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function HorizontalNavigationCenter ({ children }: Props): JSX.Element {
  return (
    <Flex
      zIndex={-1}
      position='absolute'
      justify='center'
      margin='auto'
      w='100%'
    >
      <RenderOnDesktop>
        <HStack
          spacing={{
            base: 2,
            md: 12,
            lg: 28
          }}
        >
          {children}
        </HStack>
      </RenderOnDesktop>
      <RenderOnMobile>
        <HStack
          spacing={7}
        >
          {children}
        </HStack>
      </RenderOnMobile>
    </Flex>
  )
}
