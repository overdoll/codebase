import { graphql, usePaginationFragment } from 'react-relay'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { PostReportsQuery } from '@//:artifacts/PostReportsQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Button, Stack } from '@chakra-ui/react'
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

type Props = ComponentSearchArguments<any>

const Query = graphql`
  query PostReportsQuery ($dateRange: PostReportDateRange!) {
    ...PostReportsFragment
  }
`

const Fragment = graphql`
  fragment PostReportsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "PostReportsPaginationQuery" ) {
    postReports (first: $first, after: $after, dateRange: $dateRange)
    @connection(key: "PostReports_postReports") {
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

export default function PostReports ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<PostReportsQuery>(Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<PostReportsQuery, any>(
    Fragment,
    queryData
  )

  return (
    <EmptyBoundary
      fallback={<SmallBackgroundBox><Trans>No reports found</Trans></SmallBackgroundBox>}
      condition={data.postReports.edges.length < 1}
    >
      <Stack spacing={1}>
        <TableHeaderBackground>
          <TableRow columns={8}>
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
            <TableHeaderText column={2}>
              <Trans>
                Post
              </Trans>
            </TableHeaderText>
          </TableRow>
        </TableHeaderBackground>
        <Stack spacing={2}>
          {data.postReports.edges.map((item, index) => (
            <TableRowBackground key={index}>
              <TableRow columns={8}>
                <TableRowColumnText column={2}>
                  {item.node.account.username}
                </TableRowColumnText>
                <TableRowColumnText column={4}>
                  {item.node.rule.title}
                </TableRowColumnText>
                <TableRowColumnText column={2}>
                  <Button size='sm' variant='link'>
                    <Trans>
                      View Post
                    </Trans>
                  </Button>
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