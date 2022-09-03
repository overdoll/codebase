import { graphql } from 'react-relay/hooks'
import {
  StaffClubSupporterSubscriptionsFragment$key
} from '@//:artifacts/StaffClubSupporterSubscriptionsFragment.graphql'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
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
import { StaffClubQuery } from '@//:artifacts/StaffClubQuery.graphql'
import StaffClubSupporterSubscriptionPreview
  from './StaffClubSupporterSubscriptionPreview/StaffClubSupporterSubscriptionPreview'

interface Props {
  query: StaffClubSupporterSubscriptionsFragment$key
}

const Fragment = graphql`
  fragment StaffClubSupporterSubscriptionsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffClubSupporterSubscriptionsPaginationQuery" ) {
    supporterSubscriptions (first: $first, after: $after)
    @connection(key: "StaffClubSupporterSubscriptions_supporterSubscriptions") {
      edges {
        node {
          ... on IAccountClubSupporterSubscription {
            id
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
  } = usePaginationFragment<StaffClubQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={<EmptySubscriptions />}
      condition={data.supporterSubscriptions.edges.length < 1}
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
                Account
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
          {data.supporterSubscriptions.edges.map((item, index) => (
            <TableBodyRowLink
              key={item.node.id}
              href={{
                pathname: '/staff/billing/subscription/[reference]',
                query: { reference: item.node.reference }
              }}
            >
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
