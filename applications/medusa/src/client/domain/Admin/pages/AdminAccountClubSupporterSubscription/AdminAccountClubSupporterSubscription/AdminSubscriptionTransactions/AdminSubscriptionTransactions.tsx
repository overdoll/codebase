import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminSubscriptionTransactionsFragment$key
} from '@//:artifacts/AdminSubscriptionTransactionsFragment.graphql'
import AdminActiveSubscriptionTransactions
  from './AdminActiveSubscriptionTransactions/AdminActiveSubscriptionTransactions'
import AdminCancelledSubscriptionTransactions
  from './AdminCancelledSubscriptionTransactions/AdminCancelledSubscriptionTransactions'
import AdminExpiredSubscriptionTransactions
  from './AdminExpiredSubscriptionTransactions/AdminExpiredSubscriptionTransactions'

interface Props {
  query: AdminSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment AdminSubscriptionTransactionsFragment on AccountClubSupporterSubscription {
    __typename
    ... on AccountActiveClubSupporterSubscription {
      ...AdminActiveSubscriptionTransactionsFragment
    }
    ... on AccountCancelledClubSupporterSubscription{
      ...AdminCancelledSubscriptionTransactionsFragment
    }
    ... on AccountExpiredClubSupporterSubscription {
      ...AdminExpiredSubscriptionTransactionsFragment
    }
  }
`

export default function AdminSubscriptionTransactions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'AccountActiveClubSupporterSubscription':
      return (
        <AdminActiveSubscriptionTransactions
          query={data}
        />
      )
    case 'AccountCancelledClubSupporterSubscription':
      return (
        <AdminCancelledSubscriptionTransactions
          query={data}
        />
      )
    case 'AccountExpiredClubSupporterSubscription':
      return (
        <AdminExpiredSubscriptionTransactions
          query={data}
        />
      )
    default:
      return <></>
  }
}
