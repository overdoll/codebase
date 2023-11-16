/* eslint-disable react/jsx-no-target-blank */
import { Box, Flex } from '@chakra-ui/react'
import { SHOP_LINK } from '@//:modules/constants/links'
import { StaticImageCover } from '@//:modules/content/HookedComponents/Media'
import posthog from 'posthog-js'
import StickerPromoteVariations from './StickerPromoteVariations/StickerPromoteVariations'

export default function StickerPromoteBanner (): JSX.Element {
  const onClick = (): void => {
    posthog?.capture('click-shop-static-banner')
  }

  return (
    <Box
      position='relative'
      mt={8}
      borderWidth={2}
      borderColor='gray.800'
      bg='gray.900'
      borderRadius='md'
      overflow='hidden'
      w='100%'
    >
      <a target='_blank' onClick={onClick} href={SHOP_LINK}>
        <Flex backdropBlur='100%' right={0} bottom={0} left={0} top={0} position='absolute'>
          <StaticImageCover
            variants={(
              <>
                <source
                  media='(min-width: 760px)'
                  srcSet='https://static.dollycdn.net/stickers/sticker-frame-4-large.jpg'
                />
              </>
          )}
            url='https://static.dollycdn.net/stickers/sticker-frame-3-small.jpg'
          />
        </Flex>
        <Flex bg='black' opacity={0.75} right={0} bottom={0} left={0} top={0} position='absolute' />
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
        <StickerPromoteVariations />
      </a>
    </Box>
  )
}
