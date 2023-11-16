/* eslint-disable react/jsx-no-target-blank */
import { Box, Text, Flex, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import useFeatureFlag from '@//:modules/hooks/useFeatureFlag'

export default function StickerPromoteVariations (): JSX.Element {
  const flag = useFeatureFlag('site-shop-post-ad')

  if (flag === 'banner_variant_limited') {
    return (
      <Box p={2} position='relative' w='100%' h='100%'>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Text
              position='relative'
              fontWeight='md'
              color='gray.00'
              fontSize='3xl'
            >
              <Text as='b'>Collect Limited and Unique </Text>{' '}
              <Text
                color='orange.300'
                as='b'
              >
                NSFW Stickers
              </Text>{' '}
            </Text>
            <Text
              position='relative'
              fontWeight='md'
              color='gray.00'
              fontSize='lg'
            >
              <Text as='b' color='primary.400'>Holo</Text>. <Text as='b' color='purple.400'>Glitter</Text>. <Text as='b' color='teal.400'>Glossy</Text>. <Text as='b' color='orange.400'>Limited</Text>.
            </Text>
          </Stack>
          <Flex w='100%' justifyContent='flex-end'>
            <Button
              color='gray.00'
              position='relative'
              borderRadius='full'
              colorScheme='orange'
            >
              Start Collecting
            </Button>
          </Flex>
        </Stack>
      </Box>
    )
  }

  if (flag === 'banner_variant_artist') {
    return (
      <Box p={2} position='relative' w='100%' h='100%'>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Text
              position='relative'
              fontWeight='md'
              color='gray.00'
              fontSize='3xl'
            >
              <Text
                color='purple.400'
                as='b'
              >
                NSFW Stickers {' '}
              </Text>
              <Text as='b'>By Your Favorite Artists</Text>
            </Text>
            <Text
              position='relative'
              fontWeight='md'
              color='gray.00'
              fontSize='lg'
            >
              Artists get a 40% cut from each sticker!
            </Text>
          </Stack>
          <Flex w='100%' justifyContent='flex-end'>
            <Button
              color='gray.00'
              position='relative'
              borderRadius='full'
              colorScheme='purple'
            >
              See Stickers
            </Button>
          </Flex>
        </Stack>
      </Box>
    )
  }

  return (
    <Box p={2} position='relative' w='100%' h='100%'>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Text
            position='relative'
            fontWeight='md'
            color='gray.00'
            fontSize='3xl'
          >
            <Text as='b'>The NSFW Sticker Shop That </Text>{' '}
            <Text
              color='primary.500'
              as='b'
            >
              Doesn’t Censor
            </Text>{' '}
          </Text>
          <Text
            position='relative'
            fontWeight='md'
            color='gray.00'
            fontSize='lg'
          >
            Original designs by your favorite artists.
          </Text>
        </Stack>
        <Flex w='100%' justifyContent='flex-end'>
          <Button
            color='gray.00'
            position='relative'
            borderRadius='full'
            colorScheme='primary'
          >
            Shop Now
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}
