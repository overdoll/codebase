import { Box, Flex, Heading, useToken } from '@chakra-ui/react'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { UrlObject } from 'url'
import { ReactNode } from 'react'
import { StaticImageCover } from '@//:modules/content/HookedComponents/Media'
import {
  ImageMediaProps
} from '@//:modules/content/HookedComponents/Media/components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'
import { Icon } from '@//:modules/content/PageLayout'
import { IconType } from '@//:types/components'

interface Props extends Pick<ImageMediaProps, 'url' | 'variants'> {
  href: string | UrlObject
  header: ReactNode
  footer: ReactNode
  colorScheme?: string
  smaller?: boolean
  icon: IconType
}

export default function BoxHomeLink (props: Props): JSX.Element {
  const {
    href,
    header,
    footer,
    colorScheme = 'primary',
    url,
    variants,
    smaller = false,
    icon
  } = props

  const [shadow, light] = useToken(
    'colors',
    [`${colorScheme}.600`, `${colorScheme}.400`]
  )

  return (
    <LinkTile colorScheme={colorScheme} borderRadius='xl' href={href}>
      <Flex
        w='100%'
        h='100%'
        borderRadius='xl'
        overflow='hidden'
        position='relative'
        borderWidth={4}
        borderColor={`${colorScheme}.400`}
      >
        <Flex
          bg='#fff'
          right={0}
          left={0}
          bottom={0}
          top={0}
          position='absolute'
        >
          <StaticImageCover variants={variants} url={url} />
        </Flex>
        <Box
          bg={`${colorScheme}.500`}
          opacity={0.4}
          top={0}
          bottom={0}
          left={0}
          right={0}
          position='absolute'
        />
        <Box
          bgGradient={`linear(to-b, transparent, transparent,  transparent, transparent, transparent, ${colorScheme}.400, ${colorScheme}.400)`}
          top={0}
          bottom={0}
          left={0}
          right={0}
          position='absolute'
        />
        <Flex w='100%' pt='100%' position='relative'>

          <Box
            transform='rotate(-3deg) scale(1.8)'
            pt={8}
            pl={24}
            w='100%'
            bg={shadow}
            position='absolute'
            top={0}
            h={85}
          />
          <Box
            transform='rotate(-3deg) scale(1.8)'
            pt={8}
            pl={24}
            w='100%'
            bg={`${colorScheme}.400`}
            position='absolute'
            top={0}
            h={79}
          />

          <Heading
            fontWeight='extrabold'
            textShadow={`5px 5px ${shadow as string}`}
            transform='rotate(-3deg)'
            pt={3}
            pl={4}
            position='absolute'
            top={0}
            fontSize={smaller ? '6xl' : '7xl'}
            color='gray.00'
          >
            {header}
          </Heading>
          <Heading
            pb={4}
            pl={4}
            position='absolute'
            bottom={0}
            fontSize={{
              base: 'xl',
              md: '2xl'
            }}
            color='gray.00'
          >
            {footer}
          </Heading>
          <Flex
            w='100%'
            top={0}
            bottom={0}
            align='center'
            justify='center'
            position='absolute'

          >
            <Icon
              filter={`drop-shadow(${`5px 5px ${light as string}`})`}
              icon={icon}
              w={20}
              h={20}
              fill='white'
            />
          </Flex>
        </Flex>
      </Flex>
    </LinkTile>
  )
}
