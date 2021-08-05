/**
 * @flow
 */
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PreparedQueueSettingsQuery } from '@//:artifacts/PreparedQueueSettingsQuery.graphql'
import QueueSettings from './QueueSettings/QueueSettings'

const PreparedQueueGQL = graphql`
  query PreparedQueueSettingsQuery {
    ...QueueSettingsFragment
  }
`

type Props = {
  query: PreloadedQueryInner<PreparedQueueSettingsQuery>,
}

export default function PreparedQueueSettings (props: Props): Node {
  const data = usePreloadedQuery<PreparedQueueSettingsQuery>(
    PreparedQueueGQL,
    props.query
  )

  return (<QueueSettings account={data} />)
}
