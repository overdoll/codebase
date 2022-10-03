import { Icon } from '@//:modules/content/PageLayout'
import { OverdollLogo } from '@//:assets/logos/platform'
import { Box, Heading, HStack } from '@chakra-ui/react'
import { LinkTile } from '@//:modules/content/ContentSelection'

export default function SiteLinkLogo (): JSX.Element {
  return (
    <Box h={8}>
      <LinkTile href='/'>
        <HStack spacing={2} align='center' justify='center'>
          <Icon icon={OverdollLogo} fill='orange.400' w={8} h={8} />
          <Heading fontSize='2xl' color='orange.400'>
            overdoll
          </Heading>
        </HStack>
      </LinkTile>
    </Box>
  )
}
