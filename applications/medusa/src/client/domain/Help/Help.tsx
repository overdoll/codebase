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
import { Barcode, ClubMembers, MailEnvelope, SeriesIdentifier, WarningTriangle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import { SearchBar } from '@//:assets/icons/navigation'

export default function Help (): JSX.Element {
  return (
    <>
      <Helmet title='help' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              General Help
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <ListSpacer>
          <PagePanelWrap isExternal path='www.corpodoll.com/tos/'>
            <PagePanelIcon icon={SeriesIdentifier} colorScheme='teal' />
            <PagePanelText
              title={
                <Trans>Terms and Conditions</Trans>
              }
              description={(
                <Trans>What you should know</Trans>
              )}
            />
          </PagePanelWrap>
          <PagePanelWrap isExternal path='www.corpodoll.com/billing/'>
            <PagePanelIcon icon={Barcode} colorScheme='green' />
            <PagePanelText
              title={
                <Trans>Billing</Trans>
              }
              description={(
                <Trans>Help and information</Trans>
              )}
            />
          </PagePanelWrap>
          <PagePanelWrap isExternal path='www.corpodoll.com/privacy'>
            <PagePanelIcon icon={SearchBar} colorScheme='purple' />
            <PagePanelText
              title={
                <Trans>Privacy Policy</Trans>
              }
              description={(
                <Trans>How we protect you</Trans>
              )}
            />
          </PagePanelWrap>
          <PagePanelWrap isExternal path='www.corpodoll.com/dmca/'>
            <PagePanelIcon icon={WarningTriangle} colorScheme='orange' />
            <PagePanelText
              title={
                <Trans>DMCA and Copyright</Trans>
              }
              description={(
                <Trans>DMCA claims information</Trans>
              )}
            />
          </PagePanelWrap>
          <PagePanelWrap isExternal path='www.corpodoll.com/2257/'>
            <PagePanelIcon icon={ClubMembers} colorScheme='orange' />
            <PagePanelText
              title={
                <Trans>18 U.S.C. § 2257</Trans>
              }
              description={(
                <Trans>18 U.S.C. § 2257 statement</Trans>
              )}
            />
          </PagePanelWrap>
          <PagePanelWrap isExternal path='www.corpodoll.com/contact/'>
            <PagePanelIcon icon={MailEnvelope} colorScheme='primary' />
            <PagePanelText
              title={
                <Trans>Contact Us</Trans>
              }
              description={(
                <Trans>Come say hello!</Trans>
              )}
            />
          </PagePanelWrap>
        </ListSpacer>
      </PageWrapper>
    </>
  )
}
