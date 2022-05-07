import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { AccountDetailsSettingsQuery } from '@//:artifacts/AccountDetailsSettingsQuery.graphql'
import UpdateAccountDetails from './UpdateAccountDetails/UpdateAccountDetails'

interface Props {
  query: PreloadedQuery<AccountDetailsSettingsQuery>
}

const Query = graphql`
  query AccountDetailsSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      ...UpdateAccountDetailsFragment
    }
  }
`

export default function AccountDetailsSettings (props: Props): JSX.Element {
  const data = usePreloadedQuery<AccountDetailsSettingsQuery>(
    Query,
    props.query
  )

  return (
    <UpdateAccountDetails query={data.viewer} />
  )
}
