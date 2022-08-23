import { Heading, HStack, Stack } from '@chakra-ui/react'
import AdvertBoxWrapper from '../AdvertBoxWrapper/AdvertBoxWrapper'
import { Trans } from '@lingui/macro'
import { ContentBrushPen, DiscoverGlobe, PremiumStar } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'

export default function BenefitsTransition (): JSX.Element {
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
      <Stack justify='center' spacing={4}>
        <HStack align='center' spacing={3}>
          <Icon icon={ContentBrushPen} fill='teal.300' w={6} h={6} />
          <Heading fontSize='3xl' color='teal.300'>
            <Trans>
              For Artists
            </Trans>
          </Heading>
        </HStack>
        <Stack spacing={3}>
          <ListItem colorScheme='teal'>
            <Trans>
              Post and categorize free and/or exclusive content
            </Trans>
          </ListItem>
          <ListItem colorScheme='teal'>
            <Trans>
              Create a unique content experience for your fans
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
      <Stack justify='center' spacing={4}>
        <HStack align='center' spacing={3}>
          <Icon icon={DiscoverGlobe} fill='green.300' w={6} h={6} />
          <Heading fontSize='3xl' color='green.300'>
            <Trans>
              For Fans
            </Trans>
          </Heading>
        </HStack>
        <Stack spacing={3}>
          <ListItem colorScheme='green'>
            <Trans>
              Save your favorite posts
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

  return (
    <AdvertBoxWrapper>
      <Stack spacing={12} h='100%' justify='center'>
        <FanPanel />
        <ArtistPanel />
      </Stack>
    </AdvertBoxWrapper>
  )
}
