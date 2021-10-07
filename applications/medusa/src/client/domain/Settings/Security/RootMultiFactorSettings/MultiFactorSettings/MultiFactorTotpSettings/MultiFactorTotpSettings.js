/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorTotpSettingsFragment$key } from '@//:artifacts/MultiFactorTotpSettingsFragment.graphql'
import { PagePanelWrap, PagePanelTitle, PagePanelDescription } from '../../../../../../components/PageLayout'

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

  return (
    <>
      <PagePanelWrap disabled={!data.recoveryCodesGenerated} path='/configure/multi_factor/totp'>
        <PagePanelTitle>
          {t('security.multi_factor.totp.title')}
        </PagePanelTitle>
        {data.recoveryCodesGenerated
          ? <PagePanelDescription>
            {data.multiFactorTotpConfigured
              ? t('security.multi_factor.totp.description.configured')
              : t('security.multi_factor.totp.description.not_configured')}
          </PagePanelDescription>
          : <PagePanelDescription>{t('security.multi_factor.totp.description.restricted')}
          </PagePanelDescription>}
      </PagePanelWrap>
    </>
  )
}
