import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffDepositRequestsQuery } from '@//:artifacts/StaffDepositRequestsQuery.graphql'
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
import { Trans } from '@lingui/macro'
import StaffDepositRequestCard from './StaffDepositRequestCard/StaffDepositRequestCard'

interface Props {
  query: PreloadedQuery<StaffDepositRequestsQuery>
}

const Query = graphql`
  query StaffDepositRequestsQuery {
    ...StaffDepositRequestsFragment
  }
`

const Fragment = graphql`
  fragment StaffDepositRequestsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "DepositRequestsPaginationQuery" ) {
    depositRequests (first: $first, after: $after)
    @connection(key: "DepositRequestsFragment_depositRequests") {
      edges {
        node {
          reference
          ...StaffDepositRequestCardFragment
        }
      }
    }
  }
`

export default function StaffDepositRequests ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffDepositRequestsQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffDepositRequestsQuery, any>(
    Fragment,
    queryData
  )

  return (
    <Table>
      <TableHeader>
        <TableHeaderRow columns={5}>
          <TableHeaderColumnText column={2}>
            <Trans>
              Total
            </Trans>
          </TableHeaderColumnText>
          <TableHeaderColumnText column={1}>
            <Trans>
              Method
            </Trans>
          </TableHeaderColumnText>
          <TableHeaderColumnText column={2}>
            <Trans>
              Due Date
            </Trans>
          </TableHeaderColumnText>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {data.depositRequests.edges.map((item, index) => (
          <TableBodyRowLink
            key={index}
            href={{
              pathname: '/staff/billing/deposit-requests/[reference]',
              query: { reference: item.node.reference }
            }}
          >
            <StaffDepositRequestCard query={item.node} />
          </TableBodyRowLink>
        ))}
        <TableBodyRowLoadMore
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </TableBody>
    </Table>
  )
}
