import { Helmet } from 'react-helmet-async'
import {
  ListSpacer,
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import { Barcode } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'

export default function Help (): JSX.Element {
  return (
    <>
      <Helmet title='help' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='primary'>
            <Trans>
              Help
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <ListSpacer>
          <PagePanelWrap isExternal path='https://overdoll.com'>
            <PagePanelIcon icon={Barcode} colorScheme='orange' />
            <PagePanelText
              title={
                <Trans>Terms of Service</Trans>
              }
              description={(
                <Trans>View our Terms of Service</Trans>
              )}
            />
          </PagePanelWrap>
          <PagePanelWrap isExternal path='https://overdoll.com'>
            <PagePanelIcon icon={Barcode} colorScheme='purple' />
            <PagePanelText
              title={
                <Trans>Privacy Policy</Trans>
              }
              description={(
                <Trans>View our Privacy Policy</Trans>
              )}
            />
          </PagePanelWrap>
        </ListSpacer>
      </PageWrapper>
    </>
  )
}
