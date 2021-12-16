/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, Stack } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'

type Props = {
  children: string
};

export default function PostPlaceholder ({ children, ...rest }: Props): Node {
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
