import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountExpiredClubSupporterSubscriptionOptionsFragment$key
} from '@//:artifacts/StaffAccountExpiredClubSupporterSubscriptionOptionsFragment.graphql'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Badge, Box, Menu, MenuButton, MenuList, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import displayPrice from '@//:modules/support/displayPrice'
import format from 'date-fns/format'
import { dateFormat } from '@//:modules/constants/format'
import Button from '@//:modules/form/Button/Button'
import StaffSyncSubscriptionButton
  from '../StaffSyncSubscriptionButton/StaffSyncSubscriptionButton'
import CopyCodeToClipboard from '../../../../../../../components/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'

interface Props {
  query: StaffAccountExpiredClubSupporterSubscriptionOptionsFragment$key
}

const Fragment = graphql`
  fragment StaffAccountExpiredClubSupporterSubscriptionOptionsFragment on AccountExpiredClubSupporterSubscription {
    expiredAt
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

export default function StaffAccountExpiredClubSupporterSubscriptionOptions ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const expiredAt = format(new Date(data.expiredAt as Date), dateFormat, { locale })
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
          <Badge borderRadius='base' fontSize='sm' colorScheme='purple'>
            <Trans>
              EXPIRED
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
          <Trans>
            {price}/mo
          </Trans>
        </SmallBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Expired At
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <Stack spacing={1}>
          <SmallBackgroundBox>
            {expiredAt}
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
