import { ReactNode } from 'react'
import { Stack, StackProps } from '@chakra-ui/react'

interface Props extends StackProps {
  children: ReactNode
}

export default function HStackScroll ({
  children,
  ...rest
}: Props): JSX.Element {
  //

  return (
    <Stack
      direction='row'
      display={{
        base: 'initial',
        md: undefined
      }}
      whiteSpace={{
        base: 'nowrap',
        md: 'normal'
      }}
      overflowX={{
        base: 'auto',
        md: undefined
      }}
      spacing={2}
      {...rest}
    >
      {children}
    </Stack>
  )
}
