import { graphql, useFragment } from 'react-relay/hooks'
import type { PayoutsMethodSettingsFragment$key } from '@//:artifacts/PayoutsMethodSettingsFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { PayoutMethod } from '@//:assets/icons'
import DisplayPayoutMethod
  from '../../../../method/RootPayoutMethodSettings/PayoutMethodSettings/DisplayPayoutMethod/DisplayPayoutMethod'

interface Props {
  query: PayoutsMethodSettingsFragment$key
}

const Fragment = graphql`
  fragment PayoutsMethodSettingsFragment on Account {
    ...DisplayPayoutMethodFragment
    payoutMethod {
      __typename
    }
    details {
      id
    }
  }
`

export default function PayoutsMethodSettings ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      {data.payoutMethod != null && (
        <DisplayPayoutMethod query={data} />
      )}
      <PagePanelWrap isDisabled={data.details?.id == null} href='/settings/payouts/method'>
        <PagePanelIcon icon={PayoutMethod} colorScheme='green' />
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
    </Stack>
  )
}
