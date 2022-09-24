import { Box, Flex, Grid, GridItem, Heading, HStack, Stack } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'
import React from 'react'
import { ControlPlayButton, RandomizeDice } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { StaticImageCover } from '@//:modules/content/HookedComponents/Media'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

export default function RouletteTile (): JSX.Element {
  const onClick = (): void => {
    trackFathomEvent('G4FFP8ZQ', 1)
  }

  return (
    <Flex w='100%' h='100%' position='relative'>
      <LinkTile
        onClick={onClick}
        href='/roulette'
      >
        <Flex h='100%' w='100%' borderRadius='lg' position='relative'>
          <Flex
            borderRadius='inherit'
            bg='dimmers.100'
            overflow='hidden'
            right={0}
            left={0}
            bottom={0}
            top={0}
            position='absolute'
          >
            <StaticImageCover loadFirst url='https://static.dollycdn.net/banners/roulette-banner.jpg' />
          </Flex>
          <Flex
            borderWidth={3}
            borderRadius='inherit'
            borderColor='dimmers.200'
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
            templateRows='1fr'
            w='100%'
            overflow='hidden'
          >
            <GridItem overflow='hidden'>
              <Stack h='100%' align='center' justify='center' spacing={2}>
                <Stack maxW={200} align='center' justify='center' w='100%' spacing={2}>
                  <Stack align='center' spacing={2}>
                    <Icon icon={RandomizeDice} w={8} h={8} fill='gray.00' />
                    <Heading textAlign='center' fontSize='2xl' color='gray.00'>
                      <Trans>
                        Rule34 Roulette
                      </Trans>
                    </Heading>
                  </Stack>
                  <Heading textAlign='center' fontSize='xs' color='whiteAlpha.700'>
                    <Trans>
                      Spin your way through rule34, hentai, furry, 3D porn videos and images and see how long you can
                      last
                    </Trans>
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
                  h='100%'
                  w={36}
                  objectFit='cover'
                  disablePictureInPicture
                  controlsList='nodownload noremoteplayback noplaybackrate'
                  as='video'
                  muted
                  loop
                  playsInline
                  autoPlay
                  src='https://static.dollycdn.net/banners/roulette-preview.mp4'
                />
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </LinkTile>
    </Flex>

  )
}
