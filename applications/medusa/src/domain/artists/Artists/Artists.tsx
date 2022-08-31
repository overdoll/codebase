import { LargeBackgroundBox, PageWrapper } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import { Trans } from '@lingui/macro'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { OverdollLogo } from '@//:assets/logos'
import { FileUpload, PremiumStar, SearchSmall } from '@//:assets/icons'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import ContactButton from '@//:common/components/Contact/ContactButton'
import PlatformShareDirectButton
  from '@//:common/components/PlatformPromoteAlert/PlatformShareDirectButton/PlatformShareDirectButton'
import PlatformShareDiscordButton
  from '@//:common/components/PlatformPromoteAlert/PlatformShareDiscordButton/PlatformShareDiscordButton'
import PlatformShareRedditButton
  from '@//:common/components/PlatformPromoteAlert/PlatformShareRedditButton/PlatformShareRedditButton'
import PlatformShareTwitterButton
  from '@//:common/components/PlatformPromoteAlert/PlatformShareTwitterButton/PlatformShareTwitterButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import RootPostsWaterfall from './RootPostsWaterfall/RootPostsWaterfall'
import { ExternalLink } from '@//:modules/routing'
import Button from '@//:modules/form/Button/Button'
import ArtistsRichObject from '@//:common/rich-objects/artists/ArtistsRichObject/ArtistsRichObject'

const Artists: PageProps<{}> = () => {
  const HEADER_PROPS = {
    color: 'gray.00',
    fontSize: '3xl'
  }

  const TEXT_PROPS = {
    color: 'gray.00',
    fontSize: 'lg'
  }

  const ICON_PROPS = {
    h: 6,
    w: 6,
    fill: 'gray.00'
  }

  const BOX_PROPS = {
    borderRadius: 'lg',
    bg: 'whiteAlpha.200',
    backdropFilter: 'blur(20px)',
    p: 4,
    borderWidth: 3,
    borderColor: 'whiteAlpha.100'
  }

  return (
    <>
      <ArtistsRichObject />
      <PageWrapper zIndex={1}>
        <Stack spacing={24}>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={1}>
              <HStack spacing={1}>
                <Icon
                  icon={OverdollLogo}
                  w={10}
                  h={10}
                  fill='primary.400'
                />
                <Heading {...HEADER_PROPS} color='primary.400'>
                  <Trans>
                    overdoll
                  </Trans>
                </Heading>
              </HStack>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  overdoll is the first true digital content platform, built for the adult content artist
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={3}>
              <HStack spacing={3}>
                <Icon
                  icon={FileUpload}
                  {...ICON_PROPS}
                  fill='teal.300'
                />
                <Heading {...HEADER_PROPS} color='teal.300'>
                  <Trans>
                    Upload and Categorize
                  </Trans>
                </Heading>
              </HStack>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  High quality videos, drawings, renders - anything, as long as it's digitally produced adult content
                </Trans>
              </Heading>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Add categories and characters to your post to make it easy to find across the platform
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={3}>
              <HStack spacing={3}>
                <Icon
                  icon={SearchSmall}
                  {...ICON_PROPS}
                  fill='purple.300'
                />
                <Heading {...HEADER_PROPS} color='purple.300'>
                  <Trans>
                    Discover and Browse
                  </Trans>
                </Heading>
              </HStack>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Use search and tags to easily find your content
                </Trans>
              </Heading>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Share your unique link, giving your fans the best mobile content experience
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={3}>
              <HStack spacing={3}>
                <Icon
                  icon={PremiumStar}
                  {...ICON_PROPS}
                  fill='orange.300'
                />
                <Heading {...HEADER_PROPS} color='orange.300'>
                  <Trans>
                    Monetize Exclusive Content
                  </Trans>
                </Heading>
              </HStack>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Mark content in your posts as exclusive
                </Trans>
              </Heading>
              <Heading {...TEXT_PROPS}>
                <Trans>
                  Let your fans become paid supporters to get access to the content
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
          <LargeBackgroundBox {...BOX_PROPS}>
            <Stack spacing={16}>
              <Stack spacing={8}>
                <Stack spacing={2}>
                  <Heading {...TEXT_PROPS} color='gray.00'>
                    <Trans>
                      Ready to start posting your content? Contact us!
                    </Trans>
                  </Heading>
                  <ContactButton colorScheme='whiteAlpha' size='lg' w='100%' />
                </Stack>
                <Stack spacing={2}>
                  <Heading {...TEXT_PROPS} color='gray.00'>
                    <Trans>
                      We can also reach out to you - just send us your details!
                    </Trans>
                  </Heading>
                  <ExternalLink
                    href='https://docs.google.com/forms/d/e/1FAIpQLSd_mOJxnNyEciEIQs5nmkJoBseJhOPOCAJ4DR-quXuzp0AOLg/viewform'
                  >
                    <Button colorScheme='whiteAlpha' w='100%' size='lg'>
                      <Trans>
                        Open Form Link
                      </Trans>
                    </Button>
                  </ExternalLink>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Heading {...TEXT_PROPS} color='gray.00'>
                  <Trans>
                    Not an artist? Let your favorite artist know about us!
                  </Trans>
                </Heading>
                <HStack justify='center' spacing={2}>
                  <PlatformShareDirectButton />
                  <PlatformShareDiscordButton />
                  <PlatformShareRedditButton />
                  <PlatformShareTwitterButton />
                </HStack>
              </Stack>
              <Stack spacing={2}>
                <Heading {...TEXT_PROPS} color='gray.00'>
                  <Trans>
                    ...or, you can just browse our content!
                  </Trans>
                </Heading>
                <LinkButton colorScheme='whiteAlpha' w='100%' size='lg' href='/'>
                  <Trans>
                    Browse Content
                  </Trans>
                </LinkButton>
              </Stack>
            </Stack>
          </LargeBackgroundBox>
          <Icon
            icon={OverdollLogo}
            w={8}
            h={8}
            fill='whiteAlpha.500'
          />
        </Stack>
      </PageWrapper>
      <RootPostsWaterfall />
    </>
  )
}

export default Artists
