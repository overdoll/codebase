import { Icon } from '@//:modules/content/PageLayout'
import { OverdollLogo } from '@//:assets/logos/platform'
import { Flex, Heading, HStack } from '@chakra-ui/react'
import { LinkTile } from '@//:modules/content/ContentSelection'

export default function SiteLinkLogo (): JSX.Element {
  return (
    <LinkTile h={8} href='/'>
      <HStack spacing={1} align='center' justify='center'>
        <Icon icon={OverdollLogo} fill='primary.400' w={8} h={8} />
        <Flex direction='column' align='center'>
          <Heading fontSize='sm' color='primary.400'>
            overdoll
          </Heading>
        </Flex>
      </HStack>
    </LinkTile>
  )
}
