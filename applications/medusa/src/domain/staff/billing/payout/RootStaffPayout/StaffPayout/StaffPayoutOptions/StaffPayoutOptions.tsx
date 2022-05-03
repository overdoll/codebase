import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffPayoutOptionsFragment$key } from '@//:artifacts/StaffPayoutOptionsFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Badge, Box, Menu, MenuButton, MenuList, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import format from 'date-fns/format'
import { dateFormatWithTime } from '@//:modules/constants/format'
import {
  STATUS_COLORS
} from '../../../../../club/RootStaffClub/StaffClub/StaffClubPayouts/StaffClubPayoutsList/StaffClubPayoutCard/StaffClubPayoutCard'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import UpdateClubPayoutDepositDateForm from './UpdateClubPayoutDepositDateForm/UpdateClubPayoutDepositDateForm'
import Button from '@//:modules/form/Button/Button'
import StaffCancelClubPayoutButton from './StaffCancelClubPayoutButton/StaffCancelClubPayoutButton'
import StaffRetryClubPayoutButton from './StaffRetryClubPayoutButton/StaffRetryClubPayoutButton'

interface Props {
  query: StaffPayoutOptionsFragment$key
}

const Fragment = graphql`
  fragment StaffPayoutOptionsFragment on ClubPayout {
    amount
    currency
    status
    depositDate
    ...UpdateClubPayoutDepositDateFormFragment
    ...StaffCancelClubPayoutButtonFragment
    ...StaffRetryClubPayoutButtonFragment
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
      <Stack spacing={2}>
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
        {(data.status === 'QUEUED' || data.status === 'FAILED') && (
          <Box>
            <Menu placement='bottom-end' autoSelect={false}>
              <MenuButton
                w='100%'
                size='lg'
                colorScheme='gray'
                as={Button}
              >
                <Trans>
                  Manage Payout
                </Trans>
              </MenuButton>
              <MenuList minW='230px' boxShadow='outline'>
                {data.status === 'FAILED' && <StaffRetryClubPayoutButton query={data} />}
                {(data.status === 'QUEUED' || data.status === 'FAILED') && <StaffCancelClubPayoutButton query={data} />}
              </MenuList>
            </Menu>
          </Box>
        )}
      </Stack>
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
      <Stack spacing={2}>
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
        {data.status === 'QUEUED' && (
          <Collapse>
            <CollapseButton>
              <Trans>
                Update Deposit Date
              </Trans>
            </CollapseButton>
            <CollapseBody>
              <UpdateClubPayoutDepositDateForm query={data} />
            </CollapseBody>
          </Collapse>
        )}
      </Stack>
    </Stack>
  )
}
