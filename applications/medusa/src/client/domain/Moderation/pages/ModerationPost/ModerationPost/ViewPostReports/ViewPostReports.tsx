import { graphql, usePaginationFragment } from 'react-relay'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Stack } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import {
  TableHeaderBackground,
  TableHeaderText,
  TableRow,
  TableRowBackground,
  TableRowColumnText
} from '@//:modules/content/ThemeComponents/TableRow/TableRow'
import { LoadMoreStackTile } from '@//:modules/content/ContentSelection'
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
      <Stack spacing={1}>
        <TableHeaderBackground>
          <TableRow columns={6}>
            <TableHeaderText column={2}>
              <Trans>
                Username
              </Trans>
            </TableHeaderText>
            <TableHeaderText column={4}>
              <Trans>
                Rule
              </Trans>
            </TableHeaderText>
          </TableRow>
        </TableHeaderBackground>
        <Stack spacing={2}>
          {data.reports.edges.map((item, index) => (
            <TableRowBackground key={index}>
              <TableRow columns={6}>
                <TableRowColumnText column={2}>
                  {item.node.account.username}
                </TableRowColumnText>
                <TableRowColumnText column={4}>
                  {item.node.rule.title}
                </TableRowColumnText>
              </TableRow>
            </TableRowBackground>))}
          <LoadMoreStackTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(5)}
            isLoadingNext={isLoadingNext}
          />
        </Stack>
      </Stack>
    </EmptyBoundary>
  )
}
