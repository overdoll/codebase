import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
import { AdminTransactionHistoryQuery } from '@//:artifacts/AdminTransactionHistoryQuery.graphql'
import {
  Table,
  TableBody,
  TableBodyRowBackground,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { EmptyBoundary, EmptyTransactions } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import AccountTransactionHistoryCard from './AccountTransactionHistory/AccountTransactionHistoryCard'

type Props = ComponentSearchArguments<any>

const Query = graphql`
  query AdminTransactionHistoryQuery ($startDate: Time!, $endDate: Time, $username: String!) {
    account(username: $username) {
      ...AdminTransactionHistoryFragment
    }
  }
`

const Fragment = graphql`
  fragment AdminTransactionHistoryFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminTransactionHistoryPaginationQuery" ) {
    transactionHistory (first: $first, after: $after, startDate: $startDate, endDate: $endDate)
    @connection(key: "AdminTransactionHistory_transactionHistory") {
      edges {
        node {
          ...AccountTransactionHistoryCardFragment
        }
      }
    }
  }
`

export default function AdminTransactionHistory ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminTransactionHistoryQuery>(Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<AdminTransactionHistoryQuery, any>(
    Fragment,
    queryData.account
  )

  return (
    <EmptyBoundary
      fallback={<EmptyTransactions />}
      condition={data.transactionHistory.edges.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={9}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Type
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Club
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Date
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={3}>
              <Trans>
                Info
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.transactionHistory.edges.map((item, index) => (
            <TableBodyRowBackground key={index}>
              <AccountTransactionHistoryCard query={item.node} />
            </TableBodyRowBackground>
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
