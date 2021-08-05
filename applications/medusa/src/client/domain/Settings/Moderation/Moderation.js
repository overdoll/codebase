/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex } from '@chakra-ui/react'
import { Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PreparedQueueSettingsQuery } from '@//:artifacts/PreparedQueueSettingsQuery.graphql'
import PreparedQueueSettings from './PreparedQueueSettings/PreparedQueueSettings'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'

type Props = {
  prepared: {
    queueQuery: PreloadedQueryInner<PreparedQueueSettingsQuery>,
  }
};

export default function Moderation (props: Props): Node {
  return (
    <>
      <Helmet title='moderation' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <Suspense fallback={<SkeletonStack />}>
            <PreparedQueueSettings query={props.prepared.queueQuery} />
          </Suspense>
        </Flex>
      </Center>
    </>
  )
}
