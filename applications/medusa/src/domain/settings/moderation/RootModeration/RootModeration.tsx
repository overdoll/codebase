import type { PreloadedQuery } from 'react-relay/hooks'
import type { QueueSettingsQuery } from '@//:artifacts/QueueSettingsQuery.graphql'
import RootModerationSettings from './RootQueueSettings/RootQueueSettings'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    queueQuery: PreloadedQuery<QueueSettingsQuery>
  }
}

const RootModeration: PageProps<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>
          Moderation - Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <RootModerationSettings query={props.queryRefs.queueQuery} />
      </PageWrapper>
    </>
  )
}

export default RootModeration
