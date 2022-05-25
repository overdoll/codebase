import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubSuspensionLogFragment$key } from '@//:artifacts/StaffClubSuspensionLogFragment.graphql'
import { TableBodyColumn, TableBodyColumnText, TableBodyRow } from '@//:modules/content/ThemeComponents/Table/Table'
import { Badge } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { format } from 'date-fns'
import { dateFormatWithTime } from '@//:modules/constants/format'
import { Trans } from '@lingui/macro'

interface Props {
  query: StaffClubSuspensionLogFragment$key
}

const Fragment = graphql`
  fragment StaffClubSuspensionLogFragment on ClubSuspensionLog {
    __typename
    ...on ClubIssuedSuspensionLog {
      issuedAccount: account {
        username
      }
      reason
      suspendedUntil
    }
    ...on ClubRemovedSuspensionLog {
      removedAccount: account {
        username
      }
    }
  }
`

export default function StaffClubSuspensionLog ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  switch (data.__typename) {
    case 'ClubIssuedSuspensionLog':
      return (
        <TableBodyRow columns={8}>
          <TableBodyColumn column={2}>
            <Badge colorScheme='orange'>
              <Trans>
                Issued
              </Trans>
            </Badge>
          </TableBodyColumn>
          <TableBodyColumnText column={2}>
            {data?.issuedAccount?.username}
          </TableBodyColumnText>
          <TableBodyColumnText column={2}>
            {data.reason}
          </TableBodyColumnText>
          <TableBodyColumnText column={2}>
            {format(new Date(data.suspendedUntil as Date), dateFormatWithTime, { locale })}
          </TableBodyColumnText>
        </TableBodyRow>
      )

    case 'ClubRemovedSuspensionLog':
      return (
        <TableBodyRow columns={8}>
          <TableBodyColumn column={2}>
            <Badge colorScheme='green'>
              <Trans>
                Removed
              </Trans>
            </Badge>
          </TableBodyColumn>
          <TableBodyColumnText column={2}>
            {data?.removedAccount?.username}
          </TableBodyColumnText>
        </TableBodyRow>
      )
    default:
      return <></>
  }
}
