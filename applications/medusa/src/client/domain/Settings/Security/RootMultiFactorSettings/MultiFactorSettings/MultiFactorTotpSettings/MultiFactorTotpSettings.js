/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorTotpSettingsFragment$key } from '@//:artifacts/MultiFactorTotpSettingsFragment.graphql'
import {
  PagePanelWrap,
  PagePanelTitle,
  PagePanelDescription,
  PagePanelIcon,
  PagePanelText
} from '@//:modules/content/PageLayout'
import { Barcode, QrCode } from '../../../../../../../assets/icons/interface'

type Props = {
  data: MultiFactorTotpSettingsFragment$key
}

const MultiFactorTotpFragmentGQL = graphql`
  fragment MultiFactorTotpSettingsFragment on AccountMultiFactorSettings {
    multiFactorTotpConfigured
    recoveryCodesGenerated
  }
`

export default function MultiFactorTotpSettings (props: Props): Node {
  const data = useFragment(MultiFactorTotpFragmentGQL, props.data)

  const [t] = useTranslation('settings')

  const getPageDescription = () => {
    if (data.recoveryCodesGenerated) {
      return data.multiFactorTotpConfigured
        ? t('security.multi_factor.totp.description.configured')
        : t('security.multi_factor.totp.description.not_configured')
    }
    return t('security.multi_factor.totp.description.restricted')
  }

  return (
    <PagePanelWrap
      disabled={!data.recoveryCodesGenerated}
      path='/configure/multi_factor/totp'
    >
      <PagePanelIcon icon={QrCode} colorScheme='purple' />
      <PagePanelText
        title={t('security.multi_factor.totp.title')}
        description={getPageDescription()}
      />
    </PagePanelWrap>
  )
}
