import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountTransactionSubscriptionFragment$key
} from '@//:artifacts/StaffAccountTransactionSubscriptionFragment.graphql'
import StaffClubSupporterSubscriptionPreview
  from '../../../StaffAccount/StaffAccount/StaffClubSupporterSubscriptions/StaffClubSupporterSubscription/StaffClubSupporterSubscriptionPreview'
import { TableBodyRowLink } from '@//:modules/content/ThemeComponents/Table/Table'

interface Props {
  query: StaffAccountTransactionSubscriptionFragment$key
}

const Fragment = graphql`
  fragment StaffAccountTransactionSubscriptionFragment on AccountTransaction {
    clubSupporterSubscription @required(action: THROW) {
      ... on IAccountClubSupporterSubscription {
        reference
      }
      ...StaffClubSupporterSubscriptionPreviewFragment
    }
  }
`

export default function StaffAccountTransactionSubscription ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TableBodyRowLink href={`/staff/subscription/${data?.clubSupporterSubscription?.reference as string}`}>
      <StaffClubSupporterSubscriptionPreview query={data.clubSupporterSubscription} />
    </TableBodyRowLink>
  )
}
