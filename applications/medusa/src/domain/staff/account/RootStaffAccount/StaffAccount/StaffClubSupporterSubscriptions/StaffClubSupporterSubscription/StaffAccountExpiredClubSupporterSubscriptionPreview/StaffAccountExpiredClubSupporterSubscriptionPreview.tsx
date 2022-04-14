import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountExpiredClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/StaffAccountExpiredClubSupporterSubscriptionPreviewFragment.graphql'
import { Badge } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'

interface Props {
  query: StaffAccountExpiredClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment StaffAccountExpiredClubSupporterSubscriptionPreviewFragment on AccountExpiredClubSupporterSubscription {
    supporterSince
    expiredAt
    club {
      name
    }
  }
`

export default function StaffAccountExpiredClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const supporterSince = format(new Date(data.supporterSince as Date), dateFormat, { locale })
  const expiredAt = format(new Date(data.expiredAt as Date), dateFormat, { locale })

  return (
    <TableBodyRow columns={8}>
      <TableBodyColumn column={2}>
        <Badge colorScheme='purple'>
          <Trans>
            EXPIRED
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
        {expiredAt}
      </TableBodyColumnText>
    </TableBodyRow>
  )
}
