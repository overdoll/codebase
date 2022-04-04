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
import { CLUB_GUIDELINES, SUPPORTER_GUIDELINES, PRIVACY_POLICY, TERMS_OF_SERVICE, COMMUNITY_GUIDELINES } from '@//:modules/constants/links'

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
                  Platform
                </Trans>
              </PageSectionTitle>
              <ListSpacer>
                <PagePanelWrap isExternal path='https://www.corpodoll.com/about/'>
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
                <PagePanelWrap isExternal path={COMMUNITY_GUIDELINES}>
                  <PagePanelIcon icon={FlagReport} colorScheme='green' />
                  <PagePanelText
                    title={
                      <Trans>Community Guidelines</Trans>
                    }
                    description={(
                      <Trans>General platform rules for everyone</Trans>
                    )}
                  />
                </PagePanelWrap>
                <PagePanelWrap isExternal path={CLUB_GUIDELINES}>
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
                <PagePanelWrap isExternal path={SUPPORTER_GUIDELINES}>
                  <PagePanelIcon icon={PremiumStar} colorScheme='orange' />
                  <PagePanelText
                    title={
                      <Trans>Supporter Guidelines</Trans>
                    }
                    description={(
                      <Trans>Billing help and subscriptions</Trans>
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
              <PagePanelWrap isExternal path={TERMS_OF_SERVICE}>
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
              <PagePanelWrap isExternal path={PRIVACY_POLICY}>
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
              <PagePanelWrap isExternal path='https://www.corpodoll.com/dmca/'>
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
              <PagePanelWrap isExternal path='https://www.corpodoll.com/2257/'>
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
              <PagePanelWrap isExternal path='https://www.corpodoll.com/contact/'>
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
