import { Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends FlexProps {
  children: ReactNode
}

export default function PageFixedHeader ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Flex
      top={{
        base: 0,
        md: 54
      }}
      maxH='40px'
      left={0}
      right={0}
      p={1}
      bg='dimmers.100'
      zIndex='docked'
      position='fixed'
      justify='space-between'
      {...rest}
    >
      {children}
    </Flex>
  )
}
