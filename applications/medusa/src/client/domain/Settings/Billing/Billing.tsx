import { Helmet } from 'react-helmet-async'
import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import { Box, Stack } from '@chakra-ui/react'
import { Barcode, PaymentMethodIdentifier, PremiumStar, SubscriptionIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Billing ({ children }: Props): JSX.Element {
  if (children == null) {
    return (
      <>
        <Helmet title='billing settings' />
        <PageWrapper>
          <Stack spacing={8}>
            <Box>
              <PageSectionWrap>
                <PageSectionTitle colorScheme='green'>
                  <Trans>
                    Billing
                  </Trans>
                </PageSectionTitle>
              </PageSectionWrap>
              <Stack spacing={2}>
                <PagePanelWrap path='/settings/billing/subscriptions'>
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
                <PagePanelWrap path='/settings/billing/payment-methods'>
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
              </Stack>
            </Box>
            <Box>
              <PageSectionWrap>
                <PageSectionTitle colorScheme='green'>
                  <Trans>
                    Help
                  </Trans>
                </PageSectionTitle>
              </PageSectionWrap>
              <Stack spacing={2}>
                <PagePanelWrap isExternal path='www.corpodoll.com/supporter-guidelines/'>
                  <PagePanelIcon icon={PremiumStar} colorScheme='orange' />
                  <PagePanelText
                    title={
                      <Trans>Supporter Guidelines</Trans>
                    }
                    description={(
                      <Trans>Get help with billing</Trans>
                    )}
                  />
                </PagePanelWrap>
                <PagePanelWrap isExternal path='www.corpodoll.com/subscriptions/'>
                  <PagePanelIcon icon={Barcode} colorScheme='purple' />
                  <PagePanelText
                    title={
                      <Trans>Subscription Agreement</Trans>
                    }
                    description={(
                      <Trans>Subscription agreement</Trans>
                    )}
                  />
                </PagePanelWrap>
              </Stack>
            </Box>
          </Stack>
        </PageWrapper>
      </>
    )
  }

  return <>{children}</>
}
