import { Stack } from '@chakra-ui/react'

interface Props {
  children: string
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
