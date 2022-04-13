import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountActiveClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/StaffAccountActiveClubSupporterSubscriptionPreviewFragment.graphql'
import { Badge } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'

interface Props {
  query: StaffAccountActiveClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment StaffAccountActiveClubSupporterSubscriptionPreviewFragment on AccountActiveClubSupporterSubscription {
    supporterSince
    nextBillingDate
    club {
      name
    }
  }
`

export default function StaffAccountActiveClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const supporterSince = format(new Date(data.supporterSince as Date), dateFormat, { locale })
  const nextBillingDate = format(new Date(data.nextBillingDate as Date), dateFormat, { locale })

  return (
    <TableBodyRow columns={8}>
      <TableBodyColumn column={2}>
        <Badge colorScheme='green'>
          <Trans>
            ACTIVE
          </Trans>
        </Badge>
      </TableBodyColumn>
      <TableBodyColumnText column={2}>
        {data.club.name}
      </TableBodyColumnText>
      <TableBodyColumnText column={2}>
        {supporterSince}
      </TableBodyColumnText>
      <TableBodyColumnText column={2}>
        {nextBillingDate}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
