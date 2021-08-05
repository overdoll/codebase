/**
 * @flow
 */
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import Emails from './Emails/Emails'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PreparedEmailsQuery } from '@//:artifacts/PreparedEmailsQuery.graphql'

const EmailsQueryGQL = graphql`
  query PreparedEmailsQuery($first: Int) {
    viewer {
      ...EmailsSettingsFragment
    }
  }
`

type Props = {
  query: PreloadedQueryInner<PreparedEmailsQuery>,
}

export default function PreparedEmails (props: Props): Node {
  const data = usePreloadedQuery<PreparedEmailsQuery>(
    EmailsQueryGQL,
    props.query
  )

  return (<Emails emails={data?.viewer} />)
}
