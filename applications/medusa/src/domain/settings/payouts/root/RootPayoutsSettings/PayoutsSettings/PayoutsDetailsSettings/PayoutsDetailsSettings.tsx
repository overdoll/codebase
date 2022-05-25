import { graphql, useFragment } from 'react-relay/hooks'
import type { PayoutsDetailsSettingsFragment$key } from '@//:artifacts/PayoutsDetailsSettingsFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LargeBackgroundBox, PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { PayoutDetails } from '@//:assets/icons'
import AccountDetails from './AccountDetails/AccountDetails'

interface Props {
  query: PayoutsDetailsSettingsFragment$key
}

const Fragment = graphql`
  fragment PayoutsDetailsSettingsFragment on Account {
    details {
      id
      ...AccountDetailsFragment
    }
    multiFactorTotpConfigured
  }
`

export default function PayoutsDetailsSettings ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      <PagePanelWrap isDisabled={!data.multiFactorTotpConfigured} href='/settings/payouts/details'>
        <PagePanelIcon icon={PayoutDetails} colorScheme='purple' />
        <PagePanelText
          title={
            <Trans>Payout Details</Trans>
          }
          description={(
            data.details?.id == null
              ? <Trans>Enter your payout details</Trans>
              : <Trans>Update your payout details</Trans>
          )}
        />
      </PagePanelWrap>
      {data.details != null && (
        <LargeBackgroundBox>
          <Stack spacing={2}>
            <Heading fontSize='lg' color='gray.00'>
              <Trans>
                Your Payout Details
              </Trans>
            </Heading>
            <AccountDetails query={data.details} />
          </Stack>
        </LargeBackgroundBox>
      )}
    </Stack>
  )
}
