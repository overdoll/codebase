import { Box, Flex, Heading, Stack, Text, useToken } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { ContentBrushPen, HeartFull, PremiumStar, RisingGraph } from '@//:assets/icons'
import { StaticImageCover } from '@//:modules/content/HookedComponents/Media'
import Button from '@//:modules/form/Button/Button'

export default function FeaturesClubSupporter (): JSX.Element {
  const [orange, primary] = useToken(
    'colors',
    ['orange.300', 'primary.400']
  )

  return (
    <>
      <Box>
        <Box position='relative' mt={1}>
          <Flex top={0} bottom={0} left={0} right={0} position='absolute'>
            <StaticImageCover
              variants={(
                <>
                  <source
                    media='(min-width: 760px)'
                    srcSet='https://static.dollycdn.net/supporters/banners/2/large.jpg'
                  />
                  <source
                    media='(min-width: 330px)'
                    srcSet='https://static.dollycdn.net/supporters/banners/2/medium.jpg'
                  />
                </>
              )}
              url='https://static.dollycdn.net/supporters/banners/2/small.jpg'
            />
          </Flex>
          <Box bg='orange.400' opacity={0.3} top={0} bottom={0} left={0} right={0} position='absolute' />
          <Box
            bgGradient='linear(to-l, transparent, dimmers.100, dimmers.500,dimmers.700, dimmers.800, dimmers.800, dimmers.800, dimmers.800)'
            top={0}
            bottom={0}
            left={0}
            right={0}
            position='absolute'
          />
          <Stack px={4} py={16} position='relative' spacing={6}>
            <Box>
              <Heading
                textShadow={`3px 3px ${orange as string}`}
                fontSize='5xl'
                color='gray.00'
              >
                <Trans>
                  From the club
                </Trans>
              </Heading>
              <Heading fontSize='2xl' color='gray.00'>
                <Trans>
                  Get{' '}
                  <Text
                    color='orange.300'
                    textDecorationThickness='3px'
                    textDecorationColor='orange.300'
                    as='u'
                  >benefits
                  </Text> from
                  the
                  club you support
                </Trans>
              </Heading>
            </Box>
            <Stack align='flex-start' spacing={2}>
              <Icon icon={PremiumStar} w={10} h={10} fill='orange.300' />
              <Heading maxW={300} fontSize='xl' color='gray.00'>
                <Trans>
                  Exclusive access to all content posted by the club
                </Trans>
              </Heading>
            </Stack>
            <Stack align='flex-start' spacing={2}>
              <Icon icon={ContentBrushPen} w={10} h={10} fill='orange.300' />
              <Heading maxW={300} fontSize='xl' color='gray.00'>
                <Trans>
                  Additional exclusive content posted every month
                </Trans>
              </Heading>
            </Stack>
          </Stack>
        </Box>
        <Box mt={1} position='relative'>
          <Flex top={0} bottom={0} left={0} right={0} position='absolute'>
            <StaticImageCover
              variants={(
                <>
                  <source
                    media='(min-width: 760px)'
                    srcSet='https://static.dollycdn.net/supporters/banners/3/large.jpg'
                  />
                  <source
                    media='(min-width: 330px)'
                    srcSet='https://static.dollycdn.net/supporters/banners/3/medium.jpg'
                  />
                </>
              )}
              url='https://static.dollycdn.net/supporters/banners/3/small.jpg'
            />
          </Flex>
          <Box bg='primary.400' opacity={0.3} top={0} bottom={0} left={0} right={0} position='absolute' />
          <Box
            bgGradient='linear(to-l, transparent, dimmers.100, dimmers.500,dimmers.700, dimmers.800, dimmers.800, dimmers.800, dimmers.800)'
            top={0}
            bottom={0}
            left={0}
            right={0}
            position='absolute'
          />
          <Stack px={4} py={16} position='relative' spacing={6}>
            <Box>
              <Heading textShadow={`3px 3px ${primary as string}`} fontSize='5xl' color='gray.00'>
                <Trans>
                  From us
                </Trans>
              </Heading>
              <Heading fontSize='2xl' color='gray.00'>
                <Trans>
                  Receive{' '}
                  <Text
                    color='primary.400'
                    textDecorationThickness='3px'
                    textDecorationColor='primary.400'
                    as='u'
                  >platform-wide features
                  </Text>
                </Trans>
              </Heading>
            </Box>
            <Stack align='flex-start' spacing={2}>
              <Icon icon={RisingGraph} w={10} h={10} fill='primary.400' />
              <Heading maxW={300} fontSize='xl' color='gray.00'>
                <Trans>
                  Unlock ability to sort posts by Top and New
                </Trans>
              </Heading>
            </Stack>
            <Stack align='flex-start' spacing={2}>
              <Icon icon={HeartFull} w={10} h={10} fill='primary.400' />
              <Heading maxW={300} fontSize='xl' color='gray.00'>
                <Trans>
                  Save and see your liked posts
                </Trans>
              </Heading>
            </Stack>
          </Stack>
        </Box>
        <Box mt={1} position='relative'>
          <Flex top={0} bottom={0} left={0} right={0} position='absolute'>
            <StaticImageCover
              variants={(
                <>
                  <source
                    media='(min-width: 760px)'
                    srcSet='https://static.dollycdn.net/supporters/banners/1/large.jpg'
                  />
                  <source
                    media='(min-width: 330px)'
                    srcSet='https://static.dollycdn.net/supporters/banners/1/medium.jpg'
                  />
                </>
              )}
              url='https://static.dollycdn.net/supporters/banners/1/small.jpg'
            />
          </Flex>
          <Stack bg='dimmers.700' p={12} position='relative'>
            <Button size='xl' colorScheme='orange' onClick={() => window.scrollTo(0, 0)}>
              <Trans>
                Support Now
              </Trans>
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  )
}
