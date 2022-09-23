import { Flex, Heading, Stack } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { UrlObject } from 'url'
import { IconType } from '@//:types/components'
import { ReactNode } from 'react'
import { StaticImageCover } from '@//:modules/content/HookedComponents/Media'

interface Props {
  href: string | UrlObject
  icon: IconType
  header: ReactNode
  footer: ReactNode
  bg?: string
  color?: string
  isExternal?: boolean
  onClick?: () => void
}

export default function StaticTile (props: Props): JSX.Element {
  const {
    href,
    icon,
    header,
    footer,
    bg,
    color,
    isExternal = false,
    onClick
  } = props

  return (
    <LinkTile onClick={onClick} isExternal={isExternal} linkProps={{ prefetch: false }} href={href}>
      <Flex
        h='100%'
        w='100%'
        borderRadius='lg'
        overflow='hidden'
        position='relative'
      >
        <Flex bg={color} borderRadius='inherit' right={0} left={0} bottom={0} top={0} position='absolute'>
          {bg != null && (
            <StaticImageCover url={bg} />
          )}
        </Flex>
        <Flex
          borderWidth={3}
          borderRadius='inherit'
          borderColor='dimmers.200'
          right={0}
          left={0}
          bottom={0}
          top={0}
          bg='dimmers.500'
          position='absolute'
        />
        <Stack h='100%' justify='center' w='100%' spacing={2} p={2} position='relative'>
          <Icon icon={icon} w={6} h={6} fill='gray.00' />
          <Heading textAlign='center' fontSize='md' color='gray.00'>
            {header}
          </Heading>
          <Heading textAlign='center' fontSize='xs' color='whiteAlpha.700'>
            {footer}
          </Heading>
        </Stack>
      </Flex>
    </LinkTile>
  )
}
