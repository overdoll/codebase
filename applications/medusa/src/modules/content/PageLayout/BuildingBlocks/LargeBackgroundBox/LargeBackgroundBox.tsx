import { Box } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function LargeBackgroundBox ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Box
      bg='gray.800'
      p={4}
      borderRadius='md'
      {...rest}
    >
      {children}
    </Box>
  )
}
