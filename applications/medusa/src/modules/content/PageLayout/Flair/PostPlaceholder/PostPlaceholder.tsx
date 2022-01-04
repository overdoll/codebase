import { Flex, HTMLChakraProps, Stack } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'

interface Props extends HTMLChakraProps<any> {
  children: ReactNode
}

export default function PostPlaceholder ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <LargeBackgroundBox>
      <Flex
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='500px'
        {...rest}
      >
        <Stack align='center' spacing={4}>
          {children}
        </Stack>
      </Flex>
    </LargeBackgroundBox>
  )
}
