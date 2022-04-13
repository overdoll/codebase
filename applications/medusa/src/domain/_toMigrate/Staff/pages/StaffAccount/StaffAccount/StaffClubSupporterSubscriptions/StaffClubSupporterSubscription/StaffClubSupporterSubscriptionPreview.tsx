import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/StaffClubSupporterSubscriptionPreviewFragment.graphql'
import StaffAccountActiveClubSupporterSubscriptionPreview
  from './StaffAccountActiveClubSupporterSubscriptionPreview/StaffAccountActiveClubSupporterSubscriptionPreview'
import StaffAccountCancelledClubSupporterSubscriptionPreview
  from './StaffAccountCancelledClubSupporterSubscriptionPreview/StaffAccountCancelledClubSupporterSubscriptionPreview'
import StaffAccountExpiredClubSupporterSubscriptionPreview
  from './StaffAccountExpiredClubSupporterSubscriptionPreview/StaffAccountExpiredClubSupporterSubscriptionPreview'

interface Props {
  query: StaffClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment StaffClubSupporterSubscriptionPreviewFragment on AccountClubSupporterSubscription {
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

export default function StaffClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
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
