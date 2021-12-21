import { Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ListSpacer ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Stack
      {...rest}
      spacing={2}
    >
      {children}
    </Stack>
  )
}
