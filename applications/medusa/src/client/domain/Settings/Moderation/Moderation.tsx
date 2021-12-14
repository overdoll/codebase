import { Helmet } from 'react-helmet-async'
import type { PreloadedQuery } from 'react-relay/hooks'
import type { QueueSettingsQuery } from '@//:artifacts/QueueSettingsQuery.graphql'
import RootQueueSettings from './RootQueueSettings/RootQueueSettings'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  prepared: {
    queueQuery: PreloadedQuery<QueueSettingsQuery>
  }
}

export default function Moderation (props: Props): JSX.Element {
  return (
    <>
      <Helmet title='moderation settings' />
      <PageWrapper>
        <RootQueueSettings query={props.prepared.queueQuery} />
      </PageWrapper>
    </>
  )
}
