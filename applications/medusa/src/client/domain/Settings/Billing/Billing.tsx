import { Helmet } from 'react-helmet-async'
import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'
import { PaymentMethodIdentifier, PremiumStar, SubscriptionIdentifier } from '@//:assets/icons'
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
          </Stack>
        </PageWrapper>
      </>
    )
  }

  return <>{children}</>
}
