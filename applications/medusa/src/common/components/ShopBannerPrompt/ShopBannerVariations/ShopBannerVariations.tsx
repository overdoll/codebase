/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-target-blank */
import { useMemo } from 'react'
import { Heading, HStack, Flex } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import useFeatureFlag from '@//:modules/hooks/useFeatureFlag'
import { motion } from 'framer-motion'

const MotionHeading = motion(Heading)

const scrollVariants = {
  animate: {
    x: ['-50%', '50%'], // Full width scrolling
    transition: {
      x: {
        repeat: Infinity,
        duration: 5, // Slower speed for smoother transition
        ease: 'linear'
      }
    }
  }
}

export const MotionHeadingComponent = ({ text }): JSX.Element => {
  return (
    <Flex
      overflowX='hidden'
      position='relative'
      whiteSpace='nowrap'
      w='100%'
      h='100%'
      alignItems='center'
    >
      <Flex alignItems='center' left={{ base: '-75%', md: '-25%' }} justifyContent='center' position='absolute' display='flex'>
        {[...Array(4)].map((_, i) => (
          <MotionHeading
            key={i}
            fontSize={{ base: 'xl', md: 'xl' }}
            fontWeight='normal'
            color='primary.100'
            variants={scrollVariants}
            initial='hidden'
            animate='animate'
          >
            / {text} /
          </MotionHeading>
        ))}
      </Flex>
    </Flex>
  )
}

export const ShopButtonComponent = ({ text }): JSX.Element => (
  <Flex right={0} top={0} w='100%' position='absolute' justifyContent='flex-end'>
    <Button flexShrink={0} top={0} borderRadius='full' size='xs' colorScheme='primary'>
      {text}
    </Button>
  </Flex>

)
export default function ShopBannerVariations (): JSX.Element {
  const flag = useFeatureFlag('shop-sticky-header-ad')

  const { bannerText, buttonText } = useMemo(() => {
    switch (flag) {
      case 'header_variant_variety':
        return { bannerText: 'NSFW HOLO GLITTER GLOSSY STICKERS', buttonText: 'Start Collecting' }
      case 'header_variant_collect':
        return { bannerText: 'COLLECT NSFW STICKERS, MAKE ARTISTS SMILE', buttonText: 'Start Collecting' }
      case 'control':
        return { bannerText: 'THE NSFW STICKER SHOP THAT DOESN’T CENSOR', buttonText: 'Shop Now' }
      default:
        return { bannerText: 'THE NSFW STICKER SHOP THAT DOESN’T CENSOR', buttonText: 'Shop Now' }
    }
  }, [flag])

  return (
    <HStack overflow='hidden' w='100%' h='100%' justify='space-between' spacing={2}>
      <Flex position='relative' h='100%' w='100%'>
        <MotionHeadingComponent text={bannerText} />
        <ShopButtonComponent text={buttonText} />
      </Flex>
    </HStack>
  )
}
