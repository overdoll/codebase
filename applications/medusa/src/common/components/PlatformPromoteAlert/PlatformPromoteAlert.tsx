import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { InfoCircle } from '@//:assets/icons'
import Icon from '../../../modules/content/PageLayout/Flair/Icon/Icon'
import { Trans } from '@lingui/macro'
import PlatformShareTwitterButton from './PlatformShareTwitterButton/PlatformShareTwitterButton'
import PlatformShareDirectButton from './PlatformShareDirectButton/PlatformShareDirectButton'
import PlatformShareRedditButton from './PlatformShareRedditButton/PlatformShareRedditButton'
import PlatformShareDiscordButton from './PlatformShareDiscordButton/PlatformShareDiscordButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import getRandomSeed from '@//:modules/support/getRandomSeed'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

export default function PlatformPromoteAlert (): JSX.Element {
  const seed = getRandomSeed()

  const trackClick = (): void => {
    trackFathomEvent('S6M3O0N3', 1)
  }

  return (
    <Stack spacing={8}>
      <LinkButton onClick={trackClick} w='100%' size='lg' href={`/random?seed=${seed}`}>
        <Trans>
          Browse More Content
        </Trans>
      </LinkButton>
      <Flex w='100%' position='relative'>
        <LargeBackgroundBox borderRadius='lg' bg='gray.800' w='100%'>
          <Stack spacing={2}>
            <Stack>
              <HStack align='center'>
                <Icon
                  w={4}
                  h={4}
                  icon={InfoCircle}
                  fill='gray.200'
                />
                <Heading color='gray.200' fontSize='lg'>
                  <Trans>
                    Want more content?
                  </Trans>
                </Heading>
              </HStack>
              <Text fontSize='md' color='gray.00'>
                <Trans>
                  Let your favorite artists know about us! Use any one of the share buttons below.
                </Trans>
              </Text>
            </Stack>
            <HStack w='100%' spacing={2} justify='center'>
              <PlatformShareDirectButton />
              <PlatformShareDiscordButton />
              <PlatformShareRedditButton />
              <PlatformShareTwitterButton />
            </HStack>
          </Stack>
        </LargeBackgroundBox>
      </Flex>
    </Stack>
  )
}
