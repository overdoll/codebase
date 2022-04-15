import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffSubscriptionTransactionsFragment$key
} from '@//:artifacts/StaffSubscriptionTransactionsFragment.graphql'
import StaffActiveSubscriptionTransactions
  from './StaffActiveSubscriptionTransactions/StaffActiveSubscriptionTransactions'
import StaffCancelledSubscriptionTransactions
  from './StaffCancelledSubscriptionTransactions/StaffCancelledSubscriptionTransactions'
import StaffExpiredSubscriptionTransactions
  from './StaffExpiredSubscriptionTransactions/StaffExpiredSubscriptionTransactions'

interface Props {
  query: StaffSubscriptionTransactionsFragment$key
}

const Fragment = graphql`
  fragment StaffSubscriptionTransactionsFragment on AccountClubSupporterSubscription {
    __typename
    ... on AccountActiveClubSupporterSubscription {
      ...StaffActiveSubscriptionTransactionsFragment
    }
    ... on AccountCancelledClubSupporterSubscription{
      ...StaffCancelledSubscriptionTransactionsFragment
    }
    ... on AccountExpiredClubSupporterSubscription {
      ...StaffExpiredSubscriptionTransactionsFragment
    }
  }
`

export default function StaffSubscriptionTransactions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'AccountActiveClubSupporterSubscription':
      return (
        <StaffActiveSubscriptionTransactions
          query={data}
        />
      )
    case 'AccountCancelledClubSupporterSubscription':
      return (
        <StaffCancelledSubscriptionTransactions
          query={data}
        />
      )
    case 'AccountExpiredClubSupporterSubscription':
      return (
        <StaffExpiredSubscriptionTransactions
          query={data}
        />
      )
    default:
      return <></>
  }
}
