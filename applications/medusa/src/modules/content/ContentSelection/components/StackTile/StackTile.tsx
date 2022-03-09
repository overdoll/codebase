import { BoxProps, Flex } from '@chakra-ui/react'

export default function StackTile ({
  children,
  ...rest
}: BoxProps): JSX.Element {
  return (
    <Flex
      w='100%'
      minH={58}
      {...rest}
    >
      {children}
    </Flex>
  )
}
