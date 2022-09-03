import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffPayoutEventsFragment$key } from '@//:artifacts/StaffPayoutEventsFragment.graphql'
import { Trans } from '@lingui/macro'
import {
  Table,
  TableBody,
  TableBodyColumnText,
  TableBodyRow,
  TableBodyRowBackground,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { format } from 'date-fns'
import { dateFormatWithTime } from '@//:modules/constants/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: StaffPayoutEventsFragment$key
}

const Fragment = graphql`
  fragment StaffPayoutEventsFragment on ClubPayout {
    events {
      id
      error
      createdAt
    }
  }
`

export default function StaffPayoutEvents ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  return (
    <EmptyBoundary
      fallback={(
        <SmallBackgroundBox>
          <Trans>
            No events
          </Trans>
        </SmallBackgroundBox>)}
      condition={data.events.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={3}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Error
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={1}>
              <Trans>
                Timestamp
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.events.map((item) => (
            <TableBodyRowBackground key={item.id}>
              <TableBodyRow columns={3}>
                <TableBodyColumnText column={2}>
                  {item.error}
                </TableBodyColumnText>
                <TableBodyColumnText column={1}>
                  {format(new Date(item.createdAt as Date), dateFormatWithTime, { locale })}
                </TableBodyColumnText>
              </TableBodyRow>
            </TableBodyRowBackground>
          ))}
        </TableBody>
      </Table>
    </EmptyBoundary>

  )
}
