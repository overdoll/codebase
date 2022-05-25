import { graphql, useFragment } from 'react-relay/hooks'
import type { PayoutsMethodSettingsFragment$key } from '@//:artifacts/PayoutsMethodSettingsFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LargeBackgroundBox, PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import PayoutMethod from '../../../../method/RootPayoutMethodSettings/PayoutMethodSettings/PayoutMethod/PayoutMethod'
import { PayoutMethod as PayoutMethodIcon } from '@//:assets/icons'

interface Props {
  query: PayoutsMethodSettingsFragment$key
}

const Fragment = graphql`
  fragment PayoutsMethodSettingsFragment on Account {
    payoutMethod {
      __typename
      ...PayoutMethodFragment
    }
    details {
      id
    }
    multiFactorTotpConfigured
  }
`

export default function PayoutsMethodSettings ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      <PagePanelWrap
        isDisabled={data.details?.id == null || !data.multiFactorTotpConfigured}
        href='/settings/payouts/method'
      >
        <PagePanelIcon icon={PayoutMethodIcon} colorScheme='green' />
        <PagePanelText
          title={
            <Trans>Payout Method</Trans>
          }
          description={(
            data.details?.id == null
              ? <Trans>Set up your payout details first</Trans>
              : (data.payoutMethod == null
                  ? <Trans>Set up your payout method</Trans>
                  : <Trans>Update your payout method</Trans>)
          )}
        />
      </PagePanelWrap>
      {data.payoutMethod != null && (
        <LargeBackgroundBox>
          <Stack spacing={2}>
            <Heading fontSize='lg' color='gray.00'>
              <Trans>
                Your Payout Method
              </Trans>
            </Heading>
            <PayoutMethod query={data.payoutMethod} />
          </Stack>
        </LargeBackgroundBox>
      )}
    </Stack>
  )
}
