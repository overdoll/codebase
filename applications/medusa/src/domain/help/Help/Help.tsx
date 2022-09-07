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
import { SocialDiscord, SocialTwitter } from '@//:assets/logos'
import { Trans } from '@lingui/macro'
import { SearchBar } from '@//:assets/icons/navigation'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import {
  CLUB_GUIDELINES,
  COMMUNITY_GUIDELINES,
  DISCORD_LINK,
  OVERDOLL_ABOUT,
  PAYOUTS_INFORMATION,
  PRIVACY_POLICY,
  SUPPORTER_GUIDELINES,
  TERMS_OF_SERVICE,
  TWITTER_FOLLOW_INTENT
} from '@//:modules/constants/links'
import { PageProps } from '@//:types/app'
import Can from '@//:modules/authorization/Can'
import HelpRichObject from '../../../common/rich-objects/help/HelpRichObject/HelpRichObject'
import ContactInformation from '../../../common/components/Contact/ContactInformation/ContactInformation'
import React from 'react'

const Help: PageProps<{}> = () => {
  return (
    <>
      <HelpRichObject />
      <PageWrapper>
        <Stack spacing={4}>
          <Stack spacing={4}>
            <Heading color='gray.00' fontSize='lg'>
              <Trans>
                If you would like to contact us or have any feedback, feel free to send us a note through one of the
                following methods.
              </Trans>
            </Heading>
            <ContactInformation />
          </Stack>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Platform
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <ListSpacer>
              <PagePanelWrap isExternal href={OVERDOLL_ABOUT}>
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
              <PagePanelWrap isExternal href={TWITTER_FOLLOW_INTENT}>
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
              <PagePanelWrap isExternal href={DISCORD_LINK}>
                <PagePanelIcon icon={SocialDiscord} colorScheme='facebook' />
                <PagePanelText
                  title={
                    <Trans>Discord</Trans>
                  }
                  description={(
                    <Trans>Join our discord!</Trans>
                  )}
                />
              </PagePanelWrap>
            </ListSpacer>
          </Box>
          <Can I='staff' a='Entity'>
            <Box>
              <Text fontFamily='mono' fontSize='sm' color='gray.200'>
                <Trans>
                  Build ID: {process.env.NEXT_BUILD_ID ?? 'unknown'}
                </Trans>
              </Text>
            </Box>
          </Can>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default Help
