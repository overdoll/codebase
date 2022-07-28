import { PagePanelIcon, PagePanelText, PagePanelWrap, PageWrapper } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { ExternalLink } from '@//:modules/routing'
import { Heading, Stack, Text } from '@chakra-ui/react'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { OverdollLogo } from '@//:assets/logos'
import Icon from '../../../../modules/content/PageLayout/Flair/Icon/Icon'
import InviteOnlyRichObject from '../../../../common/rich-objects/clubs/invite-only/InviteOnlyRichObject/InviteOnlyRichObject'
import { OVERDOLL_ABOUT } from '@//:modules/constants/links'
import { InfoCircle } from '@//:assets/icons'

const InviteOnly: PageProps<{}> = () => {
  const HEADER_PROPS = {
    color: 'primary.400',
    fontSize: '4xl'
  }

  const TEXT_PROPS = {
    color: 'gray.00',
    fontSize: 'md'
  }

  const HIGHLIGHT_PROPS = {
    color: 'primary.100'
  }

  return (
    <>
      <InviteOnlyRichObject />
      <PageWrapper>
        <Stack spacing={16}>
          <Icon
            icon={OverdollLogo}
            w={40}
            h={40}
            fill='primary.400'
          />
          <Stack spacing={1}>
            <Heading {...HEADER_PROPS}>
              <Trans>
                overdoll is invite-only
              </Trans>
            </Heading>
            <Text {...TEXT_PROPS}>
              <Trans>
                In order to create posts and collect subscription revenue,
                <HighlightInline {...HIGHLIGHT_PROPS}> you must submit an application and get
                  approved to be an Aritst on the platform
                </HighlightInline>. For everything else, access is unrestricted.
              </Trans>
            </Text>
          </Stack>
          <Stack spacing={1}>
            <Heading {...HEADER_PROPS}>
              <Trans>
                But why?
              </Trans>
            </Heading>
            <Text {...TEXT_PROPS}>
              <Trans>
                Building a platform is challenging.
                <HighlightInline {...HIGHLIGHT_PROPS}> Building a great platform in the adult entertainment space is
                  infinitely more challenging.
                </HighlightInline> With a select group of artists, we believe that we can collect constructive
                feedback and build a great platform that adult content artists and their fans truly deserve.
              </Trans>
            </Text>
          </Stack>
          <Stack spacing={8}>
            <Stack spacing={1}>
              <Heading {...HEADER_PROPS}>
                <Trans>
                  How can I apply?
                </Trans>
              </Heading>
              <Text {...TEXT_PROPS}>
                <Trans>
                  You may apply using the button below. In fact, if you apply now chances are you’ll probably get
                  accepted.
                  <HighlightInline {...HIGHLIGHT_PROPS}> We encourage you to only submit an application if you are
                    passionate about the industry and
                    believe in helping us bring the platform to its true potential.
                  </HighlightInline>
                </Trans>
              </Text>
            </Stack>
            <ExternalLink
              href='https://docs.google.com/forms/d/e/1FAIpQLSf21AW0Sgn_VF3yaXsD0IYCbq8miRU8oqtVBPSC-7djiPaRgA/viewform'
            >
              <Button w='100%' size='xl' colorScheme='primary'>
                <Trans>
                  Open Application Link
                </Trans>
              </Button>
            </ExternalLink>
          </Stack>
          <Stack spacing={1}>
            <Heading {...HEADER_PROPS}>
              <Trans>
                Cool! But what is overdoll?
              </Trans>
            </Heading>
            <Text {...TEXT_PROPS}>
              <Trans>
                Simply put,
                <HighlightInline {...HIGHLIGHT_PROPS}> overdoll.com is a platform where artists can post
                  digitally-produced adult content and fans
                  can support their favorite artists through a paid supporter subscription as well as discover other
                  artists on our platform.
                </HighlightInline>
              </Trans>
            </Text>
            <Text {...TEXT_PROPS}>
              <Trans>
                We believe in building a platform specifically for adult digital artists and their fans because
                <HighlightInline {...HIGHLIGHT_PROPS}> the
                  current offerings just don’t understand the industry.
                </HighlightInline> Too far often opportunities are
                ignored here because of the simple fact that it involves adult content. We’re here to change that for
                good. You can also check out the link below for our full vision for the platform.
              </Trans>
            </Text>
            <PagePanelWrap isExternal href={OVERDOLL_ABOUT}>
              <PagePanelIcon icon={InfoCircle} colorScheme='primary' />
              <PagePanelText
                title={
                  <Trans>What is overdoll?</Trans>
                }
                description={(
                  <Trans>How the platform helps you</Trans>
                )}
              />
            </PagePanelWrap>
          </Stack>
          <Stack spacing={8}>
            <Stack spacing={1}>
              <Heading {...HEADER_PROPS}>
                <Trans>
                  What can I do in the meantime?
                </Trans>
              </Heading>
              <Text {...TEXT_PROPS}>
                <Trans>
                  Regardless of whether you are a fan or an artist, feel free to create an account and start exploring
                  the platform. We're taking your initial feedback at hello@overdoll.com.
                </Trans>
              </Text>
            </Stack>
            <LinkButton w='100%' href='/join' size='lg' colorScheme='gray'>
              <Trans>
                Create Account
              </Trans>
            </LinkButton>
          </Stack>
          <Text {...TEXT_PROPS}>
            <Trans>
              For any other questions, you may contact hello@overdoll.com
            </Trans>
          </Text>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default InviteOnly
