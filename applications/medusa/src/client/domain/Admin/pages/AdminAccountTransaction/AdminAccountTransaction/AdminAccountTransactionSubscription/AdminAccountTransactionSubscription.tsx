import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminAccountTransactionSubscriptionFragment$key
} from '@//:artifacts/AdminAccountTransactionSubscriptionFragment.graphql'
import AdminClubSupporterSubscriptionPreview
  from '../../../AdminAccount/AdminAccount/AdminClubSupporterSubscriptions/AdminClubSupporterSubscription/AdminClubSupporterSubscriptionPreview'
import { TableBodyRowLink } from '@//:modules/content/ThemeComponents/Table/Table'

interface Props {
  query: AdminAccountTransactionSubscriptionFragment$key
}

const Fragment = graphql`
  fragment AdminAccountTransactionSubscriptionFragment on AccountTransaction {
    clubSupporterSubscription @required(action: THROW) {
      ... on IAccountClubSupporterSubscription {
        reference
      }
      ...AdminClubSupporterSubscriptionPreviewFragment
    }
  }
`

export default function AdminAccountTransactionSubscription ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TableBodyRowLink to={`/admin/subscription/${data?.clubSupporterSubscription?.reference as string}`}>
      <AdminClubSupporterSubscriptionPreview query={data.clubSupporterSubscription} />
    </TableBodyRowLink>
  )
}
