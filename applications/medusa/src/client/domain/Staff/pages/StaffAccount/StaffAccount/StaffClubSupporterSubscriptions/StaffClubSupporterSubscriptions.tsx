import { graphql } from 'react-relay/hooks'
import {
  StaffClubSupporterSubscriptionsFragment$key
} from '@//:artifacts/StaffClubSupporterSubscriptionsFragment.graphql'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
import { StaffAccountQuery } from '@//:artifacts/StaffAccountQuery.graphql'
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
import StaffClubSupporterSubscriptionPreview
  from './StaffClubSupporterSubscription/StaffClubSupporterSubscriptionPreview'

interface Props {
  query: StaffClubSupporterSubscriptionsFragment$key
}

const Fragment = graphql`
  fragment StaffClubSupporterSubscriptionsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffClubSupporterSubscriptionsPaginationQuery" ) {
    clubSupporterSubscriptions (first: $first, after: $after)
    @connection(key: "StaffClubSupporterSubscriptions_clubSupporterSubscriptions") {
      edges {
        node {
          ... on IAccountClubSupporterSubscription {
            reference
          }
          ...StaffClubSupporterSubscriptionPreviewFragment
        }
      }
    }
  }
`

export default function StaffClubSupporterSubscriptions ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffAccountQuery, any>(
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
            <TableBodyRowLink key={index} to={`/staff/subscription/${item.node.reference as string}`}>
              <StaffClubSupporterSubscriptionPreview query={item.node} />
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
