import { graphql } from 'react-relay/hooks'
import {
  AdminClubSupporterSubscriptionsFragment$key
} from '@//:artifacts/AdminClubSupporterSubscriptionsFragment.graphql'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
import { AdminAccountQuery } from '@//:artifacts/AdminAccountQuery.graphql'
import {
  Table,
  TableBody,
  TableBodyColumnText,
  TableBodyRow,
  TableBodyRowBackground,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { EmptyBoundary, EmptySubscriptions } from '@//:modules/content/Placeholder'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { Badge } from '@chakra-ui/react'

interface Props {
  query: AdminClubSupporterSubscriptionsFragment$key
}

const Fragment = graphql`
  fragment AdminClubSupporterSubscriptionsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminClubSupporterSubscriptionsPaginationQuery" ) {
    clubSupporterSubscriptions (first: $first, after: $after)
    @connection(key: "AdminClubSupporterSubscriptions_clubSupporterSubscriptions") {
      edges {
        node {
          id
          supporterSince
          status
          club {
            name
          }
          ccbillSubscription {
            ccbillSubscriptionId
          }
        }
      }
    }
  }
`

export default function AdminClubSupporterSubscriptions ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<AdminAccountQuery, any>(
    Fragment,
    query
  )

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  return (
    <EmptyBoundary
      fallback={<EmptySubscriptions />}
      condition={data.clubSupporterSubscriptions.edges.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={6}>
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
                Status
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.clubSupporterSubscriptions.edges.map((item, index) => (
            <TableBodyRowBackground
              key={index}
            >
              <TableBodyRow columns={6}>
                <TableBodyColumnText column={2}>
                  {item.node.club.name}
                </TableBodyColumnText>
                <TableBodyColumnText column={2}>
                  {format(new Date(item.node.supporterSince as Date), dateFormat, { locale })}
                </TableBodyColumnText>
                <TableBodyColumnText column={2}>
                  <Badge colorScheme={item.node.status === 'ACTIVE' ? 'green' : 'orange'}>
                    {item.node.status}
                  </Badge>
                </TableBodyColumnText>
              </TableBodyRow>
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
