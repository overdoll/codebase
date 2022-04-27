import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffPayoutOptionsFragment$key } from '@//:artifacts/StaffPayoutOptionsFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Badge, Box, HStack, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import format from 'date-fns/format'
import { dateFormatWithTime } from '@//:modules/constants/format'
import CopyCodeToClipboard from '@//:modules/content/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'
import {
  STATUS_COLORS
} from '../../../../../club/RootStaffClub/StaffClub/StaffClubPayouts/StaffClubPayoutsList/StaffClubPayoutCard/StaffClubPayoutCard'
import LargeAccountHeader from '../../../../../../../common/components/LargeAccountHeader/LargeAccountHeader'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ProfilePageButton
  from '../../../../../../profile/RootProfile/Profile/ProfileMenu/ProfilePageButton/ProfilePageButton'
import ProfileStaffButton
  from '../../../../../../profile/RootProfile/Profile/ProfileMenu/ProfileStaffButton/ProfileStaffButton'

interface Props {
  query: StaffPayoutOptionsFragment$key
}

const Fragment = graphql`
  fragment StaffPayoutOptionsFragment on ClubPayout {
    amount
    currency
    status
    depositDate
    payoutAccount {
      ...LargeAccountHeaderFragment
      ...ProfilePageButtonFragment
      ...ProfileStaffButtonFragment
    }
  }
`

export default function StaffPayoutOptions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const depositDate = format(new Date(data.depositDate as Date), dateFormatWithTime, { locale })
  const amount = displayPrice({
    amount: data.amount,
    currency: data.currency,
    locale: locale
  })

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Status
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          <Badge borderRadius='base' fontSize='sm' colorScheme={STATUS_COLORS[data.status]}>
            {data.status}
          </Badge>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Amount
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          <Trans>
            {amount}
          </Trans>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Deposit Date
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {depositDate}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Payout Account
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <HStack spacing={2} justify='space-between'>
          <LargeAccountHeader query={data.payoutAccount} />
          <Menu
            p={1}
          >
            <ProfilePageButton query={data.payoutAccount} />
            <ProfileStaffButton query={data.payoutAccount} />
          </Menu>
        </HStack>
      </Box>
    </Stack>
  )
}
