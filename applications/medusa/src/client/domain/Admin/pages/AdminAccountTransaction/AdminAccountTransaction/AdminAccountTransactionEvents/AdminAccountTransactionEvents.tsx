import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminAccountTransactionEventsFragment$key
} from '@//:artifacts/AdminAccountTransactionEventsFragment.graphql'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import AdminAccountTransactionEvent from './AdminAccountTransactionEvent/AdminAccountTransactionEvent'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: AdminAccountTransactionEventsFragment$key
}

const Fragment = graphql`
  fragment AdminAccountTransactionEventsFragment on AccountTransaction {
    events {
      __typename
      ...AdminAccountTransactionEventFragment
    }
  }
`

export default function AdminAccountTransactionEvents ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <EmptyBoundary
      fallback={(
        <SmallBackgroundBox>
          <Trans>
            There are no events
          </Trans>
        </SmallBackgroundBox>)}
      condition={data.events.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={8}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Type
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Price
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
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.events.map((item, index) => (
            <AdminAccountTransactionEvent key={index} query={item} />
          ))}
        </TableBody>
      </Table>
    </EmptyBoundary>
  )
}
