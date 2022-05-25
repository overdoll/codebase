import { graphql } from 'react-relay/hooks'
import {
  StaffAccountClubSupporterSubscriptionsFragment$key
} from '@//:artifacts/StaffAccountClubSupporterSubscriptionsFragment.graphql'
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
import StaffAccountClubSupporterSubscriptionPreview
  from './StaffAccountClubSupporterSubscriptionPreview/StaffAccountClubSupporterSubscriptionPreview'

interface Props {
  query: StaffAccountClubSupporterSubscriptionsFragment$key
}

const Fragment = graphql`
  fragment StaffAccountClubSupporterSubscriptionsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffAccountClubSupporterSubscriptionsPaginationQuery" ) {
    clubSupporterSubscriptions (first: $first, after: $after)
    @connection(key: "StaffAccountClubSupporterSubscriptions_clubSupporterSubscriptions") {
      edges {
        node {
          ... on IAccountClubSupporterSubscription {
            reference
          }
          ...StaffAccountClubSupporterSubscriptionPreviewFragment
        }
      }
    }
  }
`

export default function StaffAccountClubSupporterSubscriptions ({ query }: Props): JSX.Element {
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
            <TableBodyRowLink
              key={index}
              href={{
                pathname: '/staff/billing/subscription/[reference]',
                query: { reference: item.node.reference }
              }}
            >
              <StaffAccountClubSupporterSubscriptionPreview query={item.node} />
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
