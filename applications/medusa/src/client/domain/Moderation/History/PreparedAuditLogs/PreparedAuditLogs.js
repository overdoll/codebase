/**
 * @flow
 */
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PreparedAuditLogsQuery } from '@//:artifacts/PreparedAuditLogsQuery.graphql'
import AuditLogs from './AuditLogs/AuditLogs'

const AuditLogsGQL = graphql`
  query PreparedAuditLogsQuery {
    viewer {
      ...AuditLogsFragment
    }
  }
`

type Props = {
  query: PreloadedQueryInner<PreparedAuditLogsQuery>,
}

export default function PreparedAuditLogs (props: Props): Node {
  const data = usePreloadedQuery<PreparedAuditLogsQuery>(
    AuditLogsGQL,
    props.query
  )

  return (
    <AuditLogs auditLogs={data?.viewer} />
  )
}
