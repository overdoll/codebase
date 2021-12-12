import { Box } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function SmallBackgroundBox ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Box
      bg='gray.800'
      p={3}
      borderRadius='base'
      {...rest}
    >
      {children}
    </Box>
  )
}
