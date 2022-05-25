import { Icon } from '@//:modules/content/PageLayout'
import { OverdollLogo } from '@//:assets/logos/platform'
import { Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { LinkTile } from '@//:modules/content/ContentSelection'

export default function SiteLinkLogo (): JSX.Element {
  return (
    <LinkTile h={12} href='/'>
      <HStack align='center' justify='center'>
        <Icon icon={OverdollLogo} fill='primary.400' w={10} h={10} />
        <Flex direction='column' align='center'>
          <Heading fontSize='sm' color='primary.400'>
            overdoll
          </Heading>
          <Text color='primary.50' fontSize='2xs' as='i'>
            beta (not really)
          </Text>
        </Flex>
      </HStack>
    </LinkTile>
  )
}
