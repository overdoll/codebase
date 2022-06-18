import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import { Box, Stack } from '@chakra-ui/react'
import { PaymentMethodIdentifier, PremiumStar, SubscriptionIdentifier, TimeHourGlass } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { SUPPORTER_GUIDELINES } from '@//:modules/constants/links'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

const RootBillingSettings: PageProps<{}> = () => {
  return (
    <>
      <Head>
        <title>
          Billing Settings - overdoll
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Billing
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <Stack spacing={2}>
              <PagePanelWrap href='/settings/billing/subscriptions'>
                <PagePanelIcon icon={SubscriptionIdentifier} colorScheme='green' />
                <PagePanelText
                  title={
                    <Trans>My Subscriptions</Trans>
                  }
                  description={(
                    <Trans>
                      View and manage your subscriptions
                    </Trans>
                  )}
                />
              </PagePanelWrap>
              <PagePanelWrap href='/settings/billing/payment-methods'>
                <PagePanelIcon icon={PaymentMethodIdentifier} colorScheme='teal' />
                <PagePanelText
                  title={
                    <Trans>Payment Methods</Trans>
                  }
                  description={(
                    <Trans>
                      Your saved payment methods
                    </Trans>
                  )}
                />
              </PagePanelWrap>
              <PagePanelWrap href='/settings/billing/transactions'>
                <PagePanelIcon icon={TimeHourGlass} colorScheme='purple' />
                <PagePanelText
                  title={
                    <Trans>Transaction History</Trans>
                  }
                  description={(
                    <Trans>
                      Show when and the amount you were billed
                    </Trans>
                  )}
                />
              </PagePanelWrap>
            </Stack>
          </Box>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Help
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <PagePanelWrap isExternal href={SUPPORTER_GUIDELINES}>
              <PagePanelIcon icon={PremiumStar} colorScheme='orange' />
              <PagePanelText
                title={
                  <Trans>Supporter Guidelines</Trans>
                }
                description={(
                  <Trans>Billing agreement and help</Trans>
                )}
              />
            </PagePanelWrap>
          </Box>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootBillingSettings
