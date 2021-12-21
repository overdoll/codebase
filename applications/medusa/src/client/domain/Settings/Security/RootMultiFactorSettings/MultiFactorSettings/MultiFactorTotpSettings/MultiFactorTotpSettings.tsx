import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorTotpSettingsFragment$key } from '@//:artifacts/MultiFactorTotpSettingsFragment.graphql'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { QrCode } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'

interface Props {
  data: MultiFactorTotpSettingsFragment$key
}

const MultiFactorTotpFragmentGQL = graphql`
  fragment MultiFactorTotpSettingsFragment on AccountMultiFactorSettings {
    multiFactorTotpConfigured
    recoveryCodesGenerated
  }
`

export default function MultiFactorTotpSettings (props: Props): JSX.Element {
  const data = useFragment(MultiFactorTotpFragmentGQL, props.data)

  return (
    <PagePanelWrap
      disabled={!data.recoveryCodesGenerated}
      path='/configure/multi_factor/totp'
    >
      <PagePanelIcon icon={QrCode} colorScheme='purple' />
      <PagePanelText
        title={<Trans>Authenticator App</Trans>}
        description={data?.recoveryCodesGenerated
          ? (
              data.multiFactorTotpConfigured
                ? <Trans>Configure authenticator app</Trans>
                : <Trans>Reconfigure authenticator app</Trans>
            )
          : (
            <Trans>Recovery codes must be generated first</Trans>
            )}
      />
    </PagePanelWrap>
  )
}
