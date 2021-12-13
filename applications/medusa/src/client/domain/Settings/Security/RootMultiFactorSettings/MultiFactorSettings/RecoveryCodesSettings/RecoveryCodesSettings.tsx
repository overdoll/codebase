import { useTranslation } from 'react-i18next'
import { graphql, useFragment } from 'react-relay/hooks'
import type { RecoveryCodesSettingsFragment$key } from '@//:artifacts/RecoveryCodesSettingsFragment.graphql'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { Barcode } from '@//:assets/icons/interface'

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

  const [t] = useTranslation('settings')

  return (
    <PagePanelWrap path='/configure/multi_factor/recovery_codes'>
      <PagePanelIcon icon={Barcode} colorScheme='orange' />
      <PagePanelText
        title={t('security.multi_factor.recovery_codes.title')}
        description={data.recoveryCodesGenerated
          ? t('security.multi_factor.recovery_codes.description.configured')
          : t('security.multi_factor.recovery_codes.description.not_configured')}
      />
    </PagePanelWrap>
  )
}
