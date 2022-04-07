import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffSubscriptionOptionsFragment$key } from '@//:artifacts/StaffSubscriptionOptionsFragment.graphql'
import StaffAccountActiveClubSupporterSubscriptionOptions
  from './StaffAccountActiveClubSupporterSubscriptionOptions/StaffAccountActiveClubSupporterSubscriptionOptions'
import StaffAccountCancelledClubSupporterSubscriptionOptions
  from './StaffAccountCancelledClubSupporterSubscriptionOptions/StaffAccountCancelledClubSupporterSubscriptionOptions'
import StaffAccountExpiredClubSupporterSubscriptionOptions
  from './StaffAccountExpiredClubSupporterSubscriptionOptions/StaffAccountExpiredClubSupporterSubscriptionOptions'

interface Props {
  query: StaffSubscriptionOptionsFragment$key
}

const Fragment = graphql`
  fragment StaffSubscriptionOptionsFragment on AccountClubSupporterSubscription {
    __typename
    ... on AccountActiveClubSupporterSubscription {
      ...StaffAccountActiveClubSupporterSubscriptionOptionsFragment
    }
    ... on AccountCancelledClubSupporterSubscription{
      ...StaffAccountCancelledClubSupporterSubscriptionOptionsFragment
    }
    ... on AccountExpiredClubSupporterSubscription {
      ...StaffAccountExpiredClubSupporterSubscriptionOptionsFragment
    }
  }
`

export default function StaffSubscriptionOptions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'AccountActiveClubSupporterSubscription':
      return (
        <StaffAccountActiveClubSupporterSubscriptionOptions
          query={data}
        />
      )
    case 'AccountCancelledClubSupporterSubscription':
      return (
        <StaffAccountCancelledClubSupporterSubscriptionOptions
          query={data}
        />
      )
    case 'AccountExpiredClubSupporterSubscription':
      return (
        <StaffAccountExpiredClubSupporterSubscriptionOptions
          query={data}
        />
      )
    default:
      return <></>
  }
}
