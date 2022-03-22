import { graphql, useFragment } from 'react-relay/hooks'
import type { AdminSubscriptionOptionsFragment$key } from '@//:artifacts/AdminSubscriptionOptionsFragment.graphql'
import AdminAccountActiveClubSupporterSubscriptionOptions
  from './AdminAccountActiveClubSupporterSubscriptionOptions/AdminAccountActiveClubSupporterSubscriptionOptions'
import AdminAccountCancelledClubSupporterSubscriptionOptions
  from './AdminAccountCancelledClubSupporterSubscriptionOptions/AdminAccountCancelledClubSupporterSubscriptionOptions'
import AdminAccountExpiredClubSupporterSubscriptionOptions
  from './AdminAccountExpiredClubSupporterSubscriptionOptions/AdminAccountExpiredClubSupporterSubscriptionOptions'

interface Props {
  query: AdminSubscriptionOptionsFragment$key
}

const Fragment = graphql`
  fragment AdminSubscriptionOptionsFragment on AccountClubSupporterSubscription {
    __typename
    ... on AccountActiveClubSupporterSubscription {
      ...AdminAccountActiveClubSupporterSubscriptionOptionsFragment
    }
    ... on AccountCancelledClubSupporterSubscription{
      ...AdminAccountCancelledClubSupporterSubscriptionOptionsFragment
    }
    ... on AccountExpiredClubSupporterSubscription {
      ...AdminAccountExpiredClubSupporterSubscriptionOptionsFragment
    }
  }
`

export default function AdminSubscriptionOptions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'AccountActiveClubSupporterSubscription':
      return (
        <AdminAccountActiveClubSupporterSubscriptionOptions
          query={data}
        />
      )
    case 'AccountCancelledClubSupporterSubscription':
      return (
        <AdminAccountCancelledClubSupporterSubscriptionOptions
          query={data}
        />
      )
    case 'AccountExpiredClubSupporterSubscription':
      return (
        <AdminAccountExpiredClubSupporterSubscriptionOptions
          query={data}
        />
      )
    default:
      return <></>
  }
}
