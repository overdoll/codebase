import { Stack } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function RowWrap ({ children }: Props): JSX.Element {
  return (
    <Stack spacing={2}>
      {children}
    </Stack>
  )
}
