import { Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import RandomPattern from '@//:modules/content/DataDisplay/RandomPattern/RandomPattern'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonRight } from '@//:assets/icons'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { UrlObject } from 'url'
import { IconType } from '@//:types/components'
import { ReactNode } from 'react'

interface Props {
  href: string | UrlObject
  icon: IconType
  header: ReactNode
  footer: ReactNode
}

export default function HomeLinkTile (props: Props): JSX.Element {
  const {
    href,
    icon,
    header,
    footer
  } = props

  return (
    <LinkTile href={href}>
      <Flex bg='gray.900' borderRadius='lg' overflow='hidden' position='relative'>
        <Flex right={0} left={0} w='100%' h='100%' top={0} bg='dimmers.500' position='absolute'>
          <RandomPattern seed='123' />
        </Flex>
        <Stack h='inherit' justify='center' w='100%' spacing={3} p={4} position='relative'>
          <HStack spacing={4}>
            <Icon icon={icon} w={8} h={8} fill='gray.00' />
            <Heading fontSize='3xl' color='gray.00'>
              {header}
            </Heading>
          </HStack>
          <HStack w='100%' justify='space-between'>
            <Heading fontSize='md' color='gray.200'>
              {footer}
            </Heading>
            <Icon icon={ArrowButtonRight} w={4} h={4} fill='gray.200' />
          </HStack>
        </Stack>
      </Flex>
    </LinkTile>
  )
}
