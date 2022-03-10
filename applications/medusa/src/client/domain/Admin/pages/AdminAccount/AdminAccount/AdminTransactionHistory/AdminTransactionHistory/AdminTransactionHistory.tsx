import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
import { AdminTransactionHistoryQuery } from '@//:artifacts/AdminTransactionHistoryQuery.graphql'
import {
  Table,
  TableBody,
  TableBodyColumnText,
  TableBodyRow,
  TableBodyRowLink,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { EmptyBoundary, EmptyTransactions } from '@//:modules/content/Placeholder'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

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
          __typename
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

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  return (
    <EmptyBoundary
      fallback={<EmptyTransactions />}
      condition={data.transactionHistory.edges.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={2}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Club
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.transactionHistory.edges.map((item, index) => (
            <TableBodyRowLink
              key={index}
              to='#'
            >
              <TableBodyRow columns={2}>
                <TableBodyColumnText column={2}>
                  {item.node.__typename}
                </TableBodyColumnText>
              </TableBodyRow>
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
