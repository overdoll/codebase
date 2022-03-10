import { graphql, usePaginationFragment } from 'react-relay'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import {
  Table,
  TableBody,
  TableBodyColumn,
  TableBodyRow,
  TableBodyRowBackground,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ViewPostReportsQuery } from '@//:artifacts/ViewPostReportsQuery.graphql'

type Props = ComponentSearchArguments<any>

const Query = graphql`
  query ViewPostReportsQuery($reference: String!, $from: Time!, $to: Time) {
    post(reference: $reference) @required(action: THROW) {
      ...ViewPostReportsFragment
    }
  }
`

const Fragment = graphql`
  fragment ViewPostReportsFragment on Post
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String},
  )
  @refetchable(queryName: "ViewPostReportsPaginationQuery" ) {
    reports (first: $first, after: $after, from: $from, to: $to)
    @connection(key: "ViewPostReports_reports") {
      edges {
        node {
          id
          account {
            username
          }
          rule {
            title
          }
        }
      }
    }
  }
`

export default function ViewPostReports ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<ViewPostReportsQuery>(Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ViewPostReportsQuery, any>(
    Fragment,
    queryData.post
  )

  return (
    <EmptyBoundary
      fallback={<SmallBackgroundBox><Trans>No reports found</Trans></SmallBackgroundBox>}
      condition={data.reports.edges.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={6}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Username
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={4}>
              <Trans>
                Rule
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.reports.edges.map((item, index) => (
            <TableBodyRowBackground key={index}>
              <TableBodyRow columns={6}>
                <TableBodyColumn column={2}>
                  {item.node.account.username}
                </TableBodyColumn>
                <TableBodyColumn column={4}>
                  {item.node.rule.title}
                </TableBodyColumn>
              </TableBodyRow>
            </TableBodyRowBackground>))}
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
