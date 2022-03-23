import { graphql } from 'react-relay/hooks'
import {
  AdminClubSupporterSubscriptionsFragment$key
} from '@//:artifacts/AdminClubSupporterSubscriptionsFragment.graphql'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
import { AdminAccountQuery } from '@//:artifacts/AdminAccountQuery.graphql'
import {
  Table,
  TableBody,
  TableBodyRowLink,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { EmptyBoundary, EmptySubscriptions } from '@//:modules/content/Placeholder'
import AdminClubSupporterSubscriptionPreview
  from './AdminClubSupporterSubscription/AdminClubSupporterSubscriptionPreview'

interface Props {
  query: AdminClubSupporterSubscriptionsFragment$key
}

const Fragment = graphql`
  fragment AdminClubSupporterSubscriptionsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminClubSupporterSubscriptionsPaginationQuery" ) {
    clubSupporterSubscriptions (first: $first, after: $after)
    @connection(key: "AdminClubSupporterSubscriptions_clubSupporterSubscriptions") {
      edges {
        node {
          ... on IAccountClubSupporterSubscription {
            reference
          }
          ...AdminClubSupporterSubscriptionPreviewFragment
        }
      }
    }
  }
`

export default function AdminClubSupporterSubscriptions ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<AdminAccountQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={<EmptySubscriptions />}
      condition={data.clubSupporterSubscriptions.edges.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={8}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Status
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Club
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Supporting Since
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Next/End/Expired Date
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.clubSupporterSubscriptions.edges.map((item, index) => (
            <TableBodyRowLink key={index} to={`/admin/subscription/${item.node.reference as string}`}>
              <AdminClubSupporterSubscriptionPreview query={item.node} />
            </TableBodyRowLink>
          ))}
          <TableBodyRowLoadMore
            hasNext={hasNext}
            onLoadNext={() => loadNext(5)}
            isLoadingNext={isLoadingNext}
          />
        </TableBody>
      </Table>
    </EmptyBoundary>
  )
}
