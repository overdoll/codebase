import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Flex, Heading, HStack, keyframes, Stack, Text } from '@chakra-ui/react'
import { InfoCircle } from '@//:assets/icons'
import Icon from '../../../modules/content/PageLayout/Flair/Icon/Icon'
import { Trans } from '@lingui/macro'
import PlatformShareTwitterButton from './PlatformShareTwitterButton/PlatformShareTwitterButton'
import PlatformShareDirectButton from './PlatformShareDirectButton/PlatformShareDirectButton'
import PlatformShareRedditButton from './PlatformShareRedditButton/PlatformShareRedditButton'
import PlatformShareDiscordButton from './PlatformShareDiscordButton/PlatformShareDiscordButton'

export default function PlatformPromoteAlert (): JSX.Element {
  const animateGlow = keyframes`
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  `

  const GLOW = {
    bgGradient: 'linear(to-r,teal.300,teal.400,primary.400,primary.300,teal.400,teal.300)',
    backgroundSize: '200% 200%',
    animation: `${animateGlow} 10s linear infinite`,
    transform: 'scale(1.01) translateZ(0)',
    filter: 'blur(20px)',
    opacity: 0.5
  }

  return (
    <Flex w='100%' position='relative'>
      <Flex w='100%' h='100%' top={0} right={0} left={0} {...GLOW} position='absolute' />
      <LargeBackgroundBox borderRadius='lg' bg='gray.900' zIndex={1} w='100%' borderColor='teal.300'>
        <Stack spacing={2}>
          <Stack>
            <HStack align='center'>
              <Icon
                w={5}
                h={5}
                icon={InfoCircle}
                fill='teal.300'
              />
              <Heading color='teal.300' fontSize='lg'>
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
            <PlatformShareTwitterButton />
            <PlatformShareRedditButton />
            <PlatformShareDiscordButton />
          </HStack>
        </Stack>
      </LargeBackgroundBox>
    </Flex>
  )
}
