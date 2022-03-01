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
import {
  Barcode,
  ClubMembers,
  ClubPeopleGroup,
  FlagReport,
  InfoCircle,
  MailEnvelope,
  PremiumStar,
  SeriesIdentifier,
  WarningTriangle
} from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { SearchBar } from '@//:assets/icons/navigation'
import { Box, Stack } from '@chakra-ui/react'

export default function Help (): JSX.Element {
  return (
    <>
      <Helmet title='help' />
      <PageWrapper>
        <Stack spacing={4}>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Members
                </Trans>
              </PageSectionTitle>
              <ListSpacer>
                <PagePanelWrap isExternal path='www.corpodoll.com/about/'>
                  <PagePanelIcon icon={InfoCircle} colorScheme='primary' />
                  <PagePanelText
                    title={
                      <Trans>What is overdoll?</Trans>
                    }
                    description={(
                      <Trans>What we're all about</Trans>
                    )}
                  />
                </PagePanelWrap>
                <PagePanelWrap isExternal path='www.corpodoll.com/community-guidelines/'>
                  <PagePanelIcon icon={FlagReport} colorScheme='green' />
                  <PagePanelText
                    title={
                      <Trans>Community Guidelines</Trans>
                    }
                    description={(
                      <Trans>General platform rules</Trans>
                    )}
                  />
                </PagePanelWrap>
                <PagePanelWrap isExternal path='www.corpodoll.com/club-guidelines/'>
                  <PagePanelIcon icon={ClubPeopleGroup} colorScheme='teal' />
                  <PagePanelText
                    title={
                      <Trans>Club Guidelines</Trans>
                    }
                    description={(
                      <Trans>For clubs posting content</Trans>
                    )}
                  />
                </PagePanelWrap>
                <PagePanelWrap isExternal path='www.corpodoll.com/supporter-guidelines/'>
                  <PagePanelIcon icon={PremiumStar} colorScheme='orange' />
                  <PagePanelText
                    title={
                      <Trans>Supporter Guidelines</Trans>
                    }
                    description={(
                      <Trans>Billing and account</Trans>
                    )}
                  />
                </PagePanelWrap>
              </ListSpacer>
            </PageSectionWrap>
          </Box>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Legal
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <ListSpacer>
              <PagePanelWrap isExternal path='www.corpodoll.com/tos/'>
                <PagePanelIcon icon={SeriesIdentifier} colorScheme='teal' />
                <PagePanelText
                  title={
                    <Trans>Terms of Service</Trans>
                  }
                  description={(
                    <Trans>How you use our platform</Trans>
                  )}
                />
              </PagePanelWrap>
              <PagePanelWrap isExternal path='www.corpodoll.com/billing/'>
                <PagePanelIcon icon={Barcode} colorScheme='green' />
                <PagePanelText
                  title={
                    <Trans>Subscription Agreement</Trans>
                  }
                  description={(
                    <Trans>Subscription agreement</Trans>
                  )}
                />
              </PagePanelWrap>
              <PagePanelWrap isExternal path='www.corpodoll.com/your-privacy'>
                <PagePanelIcon icon={SearchBar} colorScheme='purple' />
                <PagePanelText
                  title={
                    <Trans>Your Privacy</Trans>
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
          </Box>
        </Stack>
      </PageWrapper>
    </>
  )
}
