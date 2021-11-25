/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Center, Flex } from '@chakra-ui/react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { QueueSettingsQuery } from '@//:artifacts/QueueSettingsQuery.graphql'
import RootQueueSettings from './RootQueueSettings/RootQueueSettings'
import { PageWrapper } from '../../../../modules/content/PageLayout'

type Props = {
  prepared: {
    queueQuery: PreloadedQueryInner<QueueSettingsQuery>,
  }
};

export default function Moderation (props: Props): Node {
  return (
    <>
      <Helmet title='moderation settings' />
      <PageWrapper>
        <RootQueueSettings query={props.prepared.queueQuery} />
      </PageWrapper>
    </>
  )
}
