import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/StaffClubSupporterSubscriptionPreviewFragment.graphql'
import StaffActiveClubSupporterSubscriptionPreview
  from './StaffActiveClubSupporterSubscriptionPreview/StaffActiveClubSupporterSubscriptionPreview'
import StaffCancelledClubSupporterSubscriptionPreview
  from './StaffCancelledClubSupporterSubscriptionPreview/StaffCancelledClubSupporterSubscriptionPreview'
import StaffExpiredClubSupporterSubscriptionPreview
  from './StaffExpiredClubSupporterSubscriptionPreview/StaffExpiredClubSupporterSubscriptionPreview'

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
      ...StaffActiveClubSupporterSubscriptionPreviewFragment
    }
    ... on AccountCancelledClubSupporterSubscription {
      ...StaffCancelledClubSupporterSubscriptionPreviewFragment
    }
    ...on AccountExpiredClubSupporterSubscription {
      ...StaffExpiredClubSupporterSubscriptionPreviewFragment
    }
  }
`

export default function StaffClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'AccountActiveClubSupporterSubscription':
      return (
        <StaffActiveClubSupporterSubscriptionPreview query={data} />
      )

    case 'AccountCancelledClubSupporterSubscription':
      return (
        <StaffCancelledClubSupporterSubscriptionPreview query={data} />
      )

    case 'AccountExpiredClubSupporterSubscription':
      return (
        <StaffExpiredClubSupporterSubscriptionPreview query={data} />
      )

    default:
      return <></>
  }
}
