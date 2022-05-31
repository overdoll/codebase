import { Box, Fade, Heading, HStack, Progress, Stack } from '@chakra-ui/react'
import AdvertBoxWrapper from '../AdvertBoxWrapper/AdvertBoxWrapper'
import { Trans } from '@lingui/macro'
import { ContentBrushPen, PremiumStar } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { ReactNode, useEffect, useState } from 'react'
import { Timeout } from '@//:types/components'

let timeout: null | Timeout = null

let countdownTimeout: null | Timeout = null

export default function BenefitsTransition (): JSX.Element {
  const [index, setIndex] = useState(0)
  const [countdown, setCountdown] = useState(10)

  const ListItem = ({
    children,
    colorScheme
  }: { children: ReactNode, colorScheme: string }): JSX.Element => {
    return (
      <HStack align='center' spacing={3}>
        <Icon flexShrink={0} icon={PremiumStar} fill={`${colorScheme}.200`} w={4} h={4} />
        <Heading fontSize='md' color={`${colorScheme}.200`}>
          {children}
        </Heading>
      </HStack>
    )
  }

  const ArtistPanel = (): JSX.Element => {
    return (

      <Stack h='100%' justify='center' spacing={6}>
        <Box>
          <HStack align='center' spacing={3}>
            <Icon icon={ContentBrushPen} fill='teal.300' w={6} h={6} />
            <Heading fontSize='3xl' color='teal.300'>
              <Trans>
                For Artists
              </Trans>
            </Heading>
          </HStack>
          <Heading fontSize='md' color='gray.200'>
            <Trans>
              Creating adult digital content
            </Trans>
          </Heading>
        </Box>
        <Stack spacing={3}>
          <ListItem colorScheme='teal'>
            <Trans>
              Collect paid supporter revenue
            </Trans>
          </ListItem>
          <ListItem colorScheme='teal'>
            <Trans>
              Post free and/or exclusive content
            </Trans>
          </ListItem>
          <ListItem colorScheme='teal'>
            <Trans>
              Have your content distributed across the platform
            </Trans>
          </ListItem>
        </Stack>
      </Stack>
    )
  }

  const FanPanel = (): JSX.Element => {
    return (

      <Stack h='100%' justify='center' spacing={6}>
        <Box>
          <HStack align='center' spacing={3}>
            <Icon icon={ContentBrushPen} fill='green.300' w={6} h={6} />
            <Heading fontSize='3xl' color='green.300'>
              <Trans>
                For Fans
              </Trans>
            </Heading>
          </HStack>
          <Heading fontSize='md' color='gray.200'>
            <Trans>
              Of adult digital content
            </Trans>
          </Heading>
        </Box>
        <Stack spacing={3}>
          <ListItem colorScheme='green'>
            <Trans>
              Support your favorite artists
            </Trans>
          </ListItem>
          <ListItem colorScheme='green'>
            <Trans>
              Find any type of content
            </Trans>
          </ListItem>
          <ListItem colorScheme='green'>
            <Trans>
              Create a personalized content feed
            </Trans>
          </ListItem>
        </Stack>
      </Stack>
    )
  }

  useEffect(() => {
    const refreshLoop = (): void => {
      setIndex(x => x === 0 ? 1 : 0)
      setCountdown(11)
      timeout = setTimeout(refreshLoop, 10000)
    }

    timeout = setTimeout(refreshLoop, 10000)

    return () => {
      if (timeout != null) {
        clearTimeout(timeout)
      }
    }
  }, [])

  useEffect(() => {
    const refreshLoop = (): void => {
      setCountdown(x => x - 1)
      countdownTimeout = setTimeout(refreshLoop, 1000)
    }

    countdownTimeout = setTimeout(refreshLoop, 1000)

    return () => {
      if (countdownTimeout != null) {
        clearTimeout(countdownTimeout)
      }
    }
  }, [])

  return (
    <AdvertBoxWrapper>
      <Fade unmountOnExit style={{ height: '100%' }} in={index === 1}>
        <FanPanel />
      </Fade>
      <Fade unmountOnExit style={{ height: '100%' }} in={index === 0}>
        <ArtistPanel />
      </Fade>
      <Progress
        transitionDelay='0.5s'
        transition='1s ease'
        colorScheme='primary'
        h={1}
        size='sm'
        value={(countdown / 11) * 100}
        w='100%'
      />
    </AdvertBoxWrapper>
  )
}
