/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Center,
  Flex,
  Stack
} from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import type { PreparedEmailsQuery } from '@//:artifacts/PreparedEmailsQuery.graphql'
import RootEmails from './RootEmails/RootEmails'
import RootUsernames from './RootUsernames/RootUsernames'

type Props = {
  prepared: {
    usernamesQuery: PreloadedQueryInner<UsernamesQuery>,
    emailsQuery: PreloadedQueryInner<PreparedEmailsQuery>,
  }
};

export default function Profile (props: Props): Node {
  return (
    <>
      <Helmet title='profile' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <Stack spacing={8}>
            <Flex direction='column'>
              <RootUsernames query={props.prepared.usernamesQuery} />
            </Flex>
            <Flex direction='column'>
              <RootEmails query={props.prepared.emailsQuery} />
            </Flex>
          </Stack>
        </Flex>
      </Center>
    </>
  )
}
