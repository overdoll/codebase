import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/StaffAccountClubSupporterSubscriptionPreviewFragment.graphql'
import StaffAccountActiveClubSupporterSubscriptionPreview
  from './StaffAccountActiveClubSupporterSubscriptionPreview/StaffAccountActiveClubSupporterSubscriptionPreview'
import StaffAccountCancelledClubSupporterSubscriptionPreview
  from './StaffAccountCancelledClubSupporterSubscriptionPreview/StaffAccountCancelledClubSupporterSubscriptionPreview'
import StaffAccountExpiredClubSupporterSubscriptionPreview
  from './StaffAccountExpiredClubSupporterSubscriptionPreview/StaffAccountExpiredClubSupporterSubscriptionPreview'

interface Props {
  query: StaffAccountClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment StaffAccountClubSupporterSubscriptionPreviewFragment on AccountClubSupporterSubscription {
    __typename
    ... on IAccountClubSupporterSubscription {
      id
    }
    ... on AccountActiveClubSupporterSubscription {
      ...StaffAccountActiveClubSupporterSubscriptionPreviewFragment
    }
    ... on AccountCancelledClubSupporterSubscription {
      ...StaffAccountCancelledClubSupporterSubscriptionPreviewFragment
    }
    ...on AccountExpiredClubSupporterSubscription {
      ...StaffAccountExpiredClubSupporterSubscriptionPreviewFragment
    }
  }
`

export default function StaffAccountClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'AccountActiveClubSupporterSubscription':
      return (
        <StaffAccountActiveClubSupporterSubscriptionPreview query={data} />
      )

    case 'AccountCancelledClubSupporterSubscription':
      return (
        <StaffAccountCancelledClubSupporterSubscriptionPreview query={data} />
      )

    case 'AccountExpiredClubSupporterSubscription':
      return (
        <StaffAccountExpiredClubSupporterSubscriptionPreview query={data} />
      )

    default:
      return <></>
  }
}
