import { graphql, usePaginationFragment } from 'react-relay'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { PostReportsQuery } from '@//:artifacts/PostReportsQuery.graphql'
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
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

type Props = ComponentSearchArguments<any>

const Query = graphql`
  query PostReportsQuery ($from: Time!, $to: Time) {
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
    postReports (first: $first, after: $after, from: $from, to: $to)
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
          post {
            reference
            club {
              slug
            }
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
      <Table>
        <TableHeader>
          <TableHeaderRow columns={6}>
            <TableHeaderColumnText column={1}>
              <Trans>
                Username
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={4}>
              <Trans>
                Rule
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={1}>
              <Trans>
                Post
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.postReports.edges.map((item, index) => (
            <TableBodyRowBackground key={index}>
              <TableBodyRow columns={6}>
                <TableBodyColumn column={1}>
                  {item.node.account.username}
                </TableBodyColumn>
                <TableBodyColumn column={4}>
                  {item.node.rule.title}
                </TableBodyColumn>
                <TableBodyColumn column={1}>
                  <LinkButton
                    size='sm'
                    variant='link'
                    to={`${item.node.post.club.slug}/p/${item.node.post.reference as string}`}
                  >
                    <Trans>
                      View Post
                    </Trans>
                  </LinkButton>
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
