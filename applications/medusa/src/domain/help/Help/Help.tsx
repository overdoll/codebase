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
  PayoutMethod,
  PremiumStar,
  SeriesIdentifier,
  WarningTriangle
} from '@//:assets/icons'
import { SocialTwitter } from '@//:assets/logos'
import { Trans } from '@lingui/macro'
import { SearchBar } from '@//:assets/icons/navigation'
import { Box, Stack, Text } from '@chakra-ui/react'
import {
  CLUB_GUIDELINES,
  COMMUNITY_GUIDELINES,
  PAYOUTS_INFORMATION,
  PRIVACY_POLICY,
  SUPPORTER_GUIDELINES,
  TERMS_OF_SERVICE
} from '@//:modules/constants/links'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import Can from '@//:modules/authorization/Can'

const Help: PageProps<{}> = () => {
  return (
    <>
      <Head>
        <title>
          Help :: overdoll
        </title>
      </Head>
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
                <PagePanelWrap isExternal href='https://www.corpodoll.com/about/'>
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
                <PagePanelWrap isExternal href={COMMUNITY_GUIDELINES}>
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
                <PagePanelWrap isExternal href={CLUB_GUIDELINES}>
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
                <PagePanelWrap isExternal href={PAYOUTS_INFORMATION}>
                  <PagePanelIcon icon={PayoutMethod} colorScheme='purple' />
                  <PagePanelText
                    title={
                      <Trans>Payouts Information</Trans>
                    }
                    description={(
                      <Trans>Information about payouts</Trans>
                    )}
                  />
                </PagePanelWrap>
                <PagePanelWrap isExternal href={SUPPORTER_GUIDELINES}>
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
              <PagePanelWrap isExternal href={TERMS_OF_SERVICE}>
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
              <PagePanelWrap isExternal href={PRIVACY_POLICY}>
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
              <PagePanelWrap isExternal href='https://www.corpodoll.com/dmca/'>
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
              <PagePanelWrap isExternal href='https://www.corpodoll.com/2257/'>
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
              <PagePanelWrap isExternal href='https://www.corpodoll.com/contact/'>
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
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Social
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <ListSpacer>
              <PagePanelWrap isExternal href='https://twitter.com/overdoll_com'>
                <PagePanelIcon icon={SocialTwitter} colorScheme='teal' />
                <PagePanelText
                  title={
                    <Trans>Twitter</Trans>
                  }
                  description={(
                    <Trans>Follow us on Twitter!</Trans>
                  )}
                />
              </PagePanelWrap>
            </ListSpacer>
          </Box>
          <Can I='staff' a='Entity'>
            <Box>
              <Text fontFamily='mono' fontSize='sm' color='gray.200'>
                <Trans>Build ID: {process.env.NEXT_BUILD_ID ?? 'unknown'}</Trans>
              </Text>
            </Box>
          </Can>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default Help
