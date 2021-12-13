import { Box } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function RowItem ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Box
      w='100%'
      h={{
        base: 58,
        md: 90
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
