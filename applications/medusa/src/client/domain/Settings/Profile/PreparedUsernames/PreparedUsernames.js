/**
 * @flow
 */
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PreparedUsernamesQuery } from '@//:artifacts/PreparedUsernamesQuery.graphql'
import Usernames from './Usernames/Usernames'

const UsernameQueryGQL = graphql`
  query PreparedUsernamesQuery($first: Int) {
    viewer {
      ...UsernamesSettingsFragment
    }
  }
`

type Props = {
  query: PreloadedQueryInner<PreparedUsernamesQuery>,
}

export default function PreparedUsernames (props: Props): Node {
  const data = usePreloadedQuery<PreparedUsernamesQuery>(
    UsernameQueryGQL,
    props.query
  )

  return (<Usernames usernames={data?.viewer} />)
}
