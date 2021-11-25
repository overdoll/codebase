/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import { graphql, useFragment } from 'react-relay/hooks'
import type { RecoveryCodesSettingsFragment$key } from '@//:artifacts/RecoveryCodesSettingsFragment.graphql'
import { PagePanelWrap, PagePanelDescription, PagePanelTitle } from '../../../../../../../modules/content/PageLayout'

type Props = {
  data: RecoveryCodesSettingsFragment$key
}

const RecoveryCodesFragmentGQL = graphql`
    fragment RecoveryCodesSettingsFragment on AccountMultiFactorSettings {
        recoveryCodesGenerated
    }
`

export default function RecoveryCodesSettings (props: Props): Node {
  const data = useFragment(RecoveryCodesFragmentGQL, props.data)

  const [t] = useTranslation('settings')

  return (
    <>
      <PagePanelWrap path='/configure/multi_factor/recovery_codes'>
        <PagePanelTitle>
          {t('security.multi_factor.recovery_codes.title')}
        </PagePanelTitle>
        <PagePanelDescription>
          {data.recoveryCodesGenerated
            ? t('security.multi_factor.recovery_codes.description.configured')
            : t('security.multi_factor.recovery_codes.description.not_configured')}
        </PagePanelDescription>
      </PagePanelWrap>
    </>
  )
}
