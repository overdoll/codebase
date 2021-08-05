/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Center,
  Flex,
  Stack
} from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PreparedUsernamesQuery } from '@//:artifacts/PreparedUsernamesQuery.graphql'
import type { PreparedEmailsQuery } from '@//:artifacts/PreparedEmailsQuery.graphql'
import PreparedEmails from './PreparedEmails/PreparedEmails'
import PreparedUsernames from './PreparedUsernames/PreparedUsernames'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'

type Props = {
  prepared: {
    usernamesQuery: PreloadedQueryInner<PreparedUsernamesQuery>,
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
              <Suspense fallback={<SkeletonStack />}>
                <PreparedUsernames query={props.prepared.usernamesQuery} />
              </Suspense>
            </Flex>
            <Flex direction='column'>
              <Suspense fallback={<SkeletonStack />}>
                <PreparedEmails query={props.prepared.emailsQuery} />
              </Suspense>
            </Flex>
          </Stack>
        </Flex>
      </Center>
    </>
  )
}
