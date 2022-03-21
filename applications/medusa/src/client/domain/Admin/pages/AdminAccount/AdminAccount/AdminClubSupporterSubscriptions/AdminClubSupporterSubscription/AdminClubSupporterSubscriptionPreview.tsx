import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/AdminClubSupporterSubscriptionPreviewFragment.graphql'
import AdminAccountActiveClubSupporterSubscriptionPreview
  from './AdminAccountActiveClubSupporterSubscriptionPreview/AdminAccountActiveClubSupporterSubscriptionPreview'
import AdminAccountCancelledClubSupporterSubscriptionPreview
  from './AdminAccountCancelledClubSupporterSubscriptionPreview/AdminAccountCancelledClubSupporterSubscriptionPreview'
import { TableBodyRowLink } from '@//:modules/content/ThemeComponents/Table/Table'
import AdminAccountExpiredClubSupporterSubscriptionPreview
  from './AdminAccountExpiredClubSupporterSubscriptionPreview/AdminAccountExpiredClubSupporterSubscriptionPreview'

interface Props {
  query: AdminClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment AdminClubSupporterSubscriptionPreviewFragment on AccountClubSupporterSubscription {
    __typename
    ... on IAccountClubSupporterSubscription {
      id
    }
    ... on AccountActiveClubSupporterSubscription {
      ...AdminAccountActiveClubSupporterSubscriptionPreviewFragment
    }
    ... on AccountCancelledClubSupporterSubscription {
      ...AdminAccountCancelledClubSupporterSubscriptionPreviewFragment
    }
    ...on AccountExpiredClubSupporterSubscription {
      ...AdminAccountExpiredClubSupporterSubscriptionPreviewFragment
    }
  }
`

export default function AdminClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'AccountActiveClubSupporterSubscription':
      return (
        <AdminAccountActiveClubSupporterSubscriptionPreview query={data} />
      )

    case 'AccountCancelledClubSupporterSubscription':
      return (
        <AdminAccountCancelledClubSupporterSubscriptionPreview query={data} />
      )

    case 'AccountExpiredClubSupporterSubscription':
      return (
        <AdminAccountExpiredClubSupporterSubscriptionPreview query={data} />
      )

    default:
      return <></>
  }
}
