/* eslint-disable react/jsx-no-target-blank */
import { useMemo } from 'react'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'
import { Box, Heading, useToken, Text, Flex } from '@chakra-ui/react'
import { SHOP_LINK } from '@//:modules/constants/links'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { StaticImageCover } from '@//:modules/content/HookedComponents/Media'

export default function StickerPromoteBanner (): JSX.Element {
  const memoized = useMemo(
    () => new Random(hash(`${new Date().toString()}`)),
    []
  )

  const [shadow] = useToken('colors', ['primary.600', 'primary.400'])

  const stickers = [
    {
      nsfw: 'https://static.dollycdn.net/stickers/omegaozone_1_nsfw.png',
      sfw: 'https://static.dollycdn.net/stickers/omegaozone_1_sfw.png'
    },
    {
      nsfw: 'https://static.dollycdn.net/stickers/oppaiforge_1_nsfw.png',
      sfw: 'https://static.dollycdn.net/stickers/oppaiforge_1_sfw.png'
    }
  ]

  const chosen = useMemo(() => memoized.nextInt32([0, 2]), [])
  return (
    <Box
      p={2}
      position='relative'
      mt={8}
      bg='gray.900'
      borderRadius='md'
      w='100%'
    >
      <a target='_blank' href={SHOP_LINK}>
        <Flex right={0} bottom={0} position='absolute'>
          <Flex mb={4} h={28}>
            <StaticImageCover url={stickers[chosen].sfw} />
          </Flex>
          <Flex mb={2} h={36}>
            <StaticImageCover url={stickers[chosen].nsfw} />
          </Flex>
        </Flex>
        <Box
          borderRadius='md'
          opacity={0.1}
          position='absolute'
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg='white'
        />
        <Box position='relative' w='100%' h='100%'>
          <Heading
            fontWeight='extrabold'
            textShadow={`5px 5px ${shadow as string}`}
            transform='rotate(-3deg)'
            pt={2}
            pl={2}
            position='absolute'
            top={0}
            fontSize='4xl'
            color='gray.00'
          >
            <Trans>NEW</Trans>
          </Heading>
          <Text
            textShadow='1px 1px 2px #000'
            position='relative'
            fontWeight='md'
            color='gray.00'
            px={2}
            pt={16}
            pb={4}
            fontSize='lg'
          >
            <Text as='b'>Limited Edition</Text>{' '}
            <Text
              textShadow=''
              p={1}
              borderRadius='lg'
              bg='white'
              color='primary.500'
              as='b'
            >
              NSFW and SFW
            </Text>{' '}
            stickers from your favorite artists
          </Text>
          <Button
            color='gray.00'
            position='relative'
            borderRadius='full'
            colorScheme='primary'
          >
            Go to Shop
          </Button>
        </Box>
      </a>
    </Box>
  )
}
