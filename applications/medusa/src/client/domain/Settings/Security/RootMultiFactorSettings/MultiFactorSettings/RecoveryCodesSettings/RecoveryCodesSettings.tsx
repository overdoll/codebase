import { graphql, useFragment } from 'react-relay/hooks'
import type { RecoveryCodesSettingsFragment$key } from '@//:artifacts/RecoveryCodesSettingsFragment.graphql'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { Barcode } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'

interface Props {
  data: RecoveryCodesSettingsFragment$key
}

const RecoveryCodesFragmentGQL = graphql`
  fragment RecoveryCodesSettingsFragment on AccountMultiFactorSettings {
    recoveryCodesGenerated
  }
`

export default function RecoveryCodesSettings (props: Props): JSX.Element {
  const data = useFragment(RecoveryCodesFragmentGQL, props.data)

  return (
    <PagePanelWrap path='/configure/multi_factor/recovery_codes'>
      <PagePanelIcon icon={Barcode} colorScheme='orange' />
      <PagePanelText
        title={
          <Trans>Recovery Codes</Trans>
        }
        description={(
          data.recoveryCodesGenerated
            ? <Trans>View or regenerate recovery codes</Trans>
            : <Trans>Generate recovery codes</Trans>
        )}
      />
    </PagePanelWrap>
  )
}
