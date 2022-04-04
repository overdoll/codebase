import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountTransactionEventsFragment$key
} from '@//:artifacts/StaffAccountTransactionEventsFragment.graphql'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import StaffAccountTransactionEvent from './StaffAccountTransactionEvent/StaffAccountTransactionEvent'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: StaffAccountTransactionEventsFragment$key
}

const Fragment = graphql`
  fragment StaffAccountTransactionEventsFragment on AccountTransaction {
    events {
      __typename
      ...StaffAccountTransactionEventFragment
    }
  }
`

export default function StaffAccountTransactionEvents ({ query }: Props): JSX.Element {
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
            <StaffAccountTransactionEvent key={index} query={item} />
          ))}
        </TableBody>
      </Table>
    </EmptyBoundary>
  )
}
