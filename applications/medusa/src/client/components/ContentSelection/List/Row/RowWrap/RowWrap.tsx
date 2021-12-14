import { Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function RowWrap ({ children }: Props): JSX.Element {
  return (
    <Stack spacing={2}>
      {children}
    </Stack>
  )
}
