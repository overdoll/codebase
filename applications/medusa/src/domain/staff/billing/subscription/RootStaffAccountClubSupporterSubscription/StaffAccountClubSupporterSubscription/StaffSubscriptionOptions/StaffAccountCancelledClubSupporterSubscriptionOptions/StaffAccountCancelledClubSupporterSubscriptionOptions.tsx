import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountCancelledClubSupporterSubscriptionOptionsFragment$key
} from '@//:artifacts/StaffAccountCancelledClubSupporterSubscriptionOptionsFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Badge, Box, Menu, MenuButton, MenuList, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import Button from '@//:modules/form/Button/Button'
import StaffSyncSubscriptionButton from '../StaffSyncSubscriptionButton/StaffSyncSubscriptionButton'
import CopyCodeToClipboard from '@//:modules/content/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'

interface Props {
  query: StaffAccountCancelledClubSupporterSubscriptionOptionsFragment$key
}

const Fragment = graphql`
  fragment StaffAccountCancelledClubSupporterSubscriptionOptionsFragment on AccountCancelledClubSupporterSubscription {
    endDate
    cancelledAt
    cancellationReason {
      title
    }
    billingAmount
    billingCurrency
    ccbillSubscription {
      ccbillSubscriptionId
    }
    ...StaffSyncSubscriptionButtonFragment
  }
`

export default function StaffAccountCancelledClubSupporterSubscriptionOptions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const endDate = format(new Date(data.endDate as Date), dateFormat, { locale })
  const cancelledAt = format(new Date(data.cancelledAt as Date), dateFormat, { locale })
  const price = displayPrice({
    amount: data.billingAmount,
    currency: data.billingCurrency,
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
          <Badge borderRadius='base' fontSize='sm' colorScheme='orange'>
            <Trans>
              CANCELLED
            </Trans>
          </Badge>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Pricing
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {price}/mo
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Cancelled At
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <Stack spacing={1}>
          <SmallBackgroundBox>
            {cancelledAt}
          </SmallBackgroundBox>
          <SmallBackgroundBox>
            {data?.cancellationReason?.title}
          </SmallBackgroundBox>
        </Stack>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              End Date
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          {endDate}
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              CCBill Subscription ID
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <SmallBackgroundBox>
          <CopyCodeToClipboard>
            {data?.ccbillSubscription?.ccbillSubscriptionId as string}
          </CopyCodeToClipboard>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <Menu placement='bottom-end' autoSelect={false}>
          <MenuButton
            w='100%'
            size='lg'
            colorScheme='gray'
            as={Button}
          >
            <Trans>
              Manage Subscription
            </Trans>
          </MenuButton>
          <MenuList minW='230px' boxShadow='outline'>
            <StaffSyncSubscriptionButton query={data} />
          </MenuList>
        </Menu>
      </Box>
    </Stack>
  )
}
