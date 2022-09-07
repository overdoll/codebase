import { Box, Flex, Grid, GridItem, Heading, HStack, keyframes, Stack } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { UrlObject } from 'url'
import { IconType } from '@//:types/components'
import { ReactNode } from 'react'
import NextImage from '@//:modules/content/DataDisplay/NextImage/NextImage'
import { ControlPlayButton } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  href: string | UrlObject
  icon: IconType
  header: ReactNode
  footer: ReactNode
  bg: string
  video: string
}

export default function HomeGameTile (props: Props): JSX.Element {
  const {
    href,
    icon,
    header,
    footer,
    bg,
    video
  } = props

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
    animation: `${animateGlow} 5s linear infinite`,
    transform: 'scale(1.01) translateZ(0)',
    filter: 'blur(20px)',
    opacity: 0.5
  }

  return (
    <Flex w='100%' h='100%' position='relative'>
      <Flex w='100%' h='100%' top={0} right={0} left={0} {...GLOW} position='absolute' />
      <LinkTile
        href={href}
      >
        <Flex h={400} bg='gray.900' borderRadius='lg' position='relative'>
          <Flex
            borderRadius='inherit'
            bg='orange.100'
            overflow='hidden'
            right={0}
            left={0}
            w='100%'
            h='100%'
            top={0}
            position='absolute'
          >
            <NextImage
              style={{
                objectFit: 'cover'
              }}
              width={600}
              src={bg}
            />
          </Flex>
          <Flex
            borderWidth={3}
            borderRadius='inherit'
            borderColor='gray.50'
            right={0}
            left={0}
            w='100%'
            h='100%'
            top={0}
            bg='dimmers.500'
            position='absolute'
          />
          <Grid
            gap={2}
            px={2}
            position='relative'
            templateColumns='55% 45%'
            templateRows='100%'
            overflow='hidden'
          >
            <GridItem overflow='hidden'>
              <Stack h='100%' align='center' justify='center' spacing={6}>
                <Stack align='center' justify='center' w='100%' spacing={2}>
                  <Stack align='center' spacing={2}>
                    <Icon icon={icon} w={10} h={10} fill='gray.00' />
                    <Heading textAlign='center' fontSize='4xl' color='gray.00'>
                      {header}
                    </Heading>
                  </Stack>
                  <Heading textAlign='center' fontSize='sm' color='gray.100'>
                    {footer}
                  </Heading>
                </Stack>
                <HStack align='center' justify='center' spacing={3}>
                  <Icon icon={ControlPlayButton} w={6} h={6} fill='whiteAlpha.800' />
                  <Heading fontSize='2xl' color='whiteAlpha.800'>
                    <Trans>
                      Play Now
                    </Trans>
                  </Heading>
                </HStack>
              </Stack>
            </GridItem>
            <GridItem overflow='hidden'>
              <Flex align='center' justify='center' h='100%' w='100%'>
                <Box
                  bg='dimmers.300'
                  borderRadius='md'
                  h={320}
                  w={36}
                  objectFit='cover'
                  disablePictureInPicture
                  controlsList='nodownload noremoteplayback noplaybackrate'
                  as='video'
                  muted
                  loop
                  playsInline
                  autoPlay
                  src={video}
                />
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </LinkTile>
    </Flex>

  )
}
