import { ReactNode } from 'react'
import { HStack, StackProps } from '@chakra-ui/react'

interface Props extends StackProps {
  children: ReactNode
}

export default function HStackScroll ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <HStack
      display='initial'
      whiteSpace='nowrap'
      overflowX='auto'
      spacing={2}
      {...rest}
    >
      {children}
    </HStack>
  )
}
