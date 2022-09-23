import { Icon } from '@//:modules/content/PageLayout'
import { OverdollLogo } from '@//:assets/logos/platform'
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { LinkTile } from '@//:modules/content/ContentSelection'

export default function SiteLinkLogo (): JSX.Element {
  return (
    <Box h={8}>
      <LinkTile href='/'>
        <HStack spacing={1} align='center' justify='center'>
          <Icon icon={OverdollLogo} fill='orange.500' w={8} h={8} />
          <Flex direction='column' align='center'>
            <Heading fontSize='sm' color='orange.500'>
              overdoll
            </Heading>
            <Text lineHeight={1} fontSize='2xs' color='orange.300'>
              halloween edition
            </Text>
          </Flex>
        </HStack>
      </LinkTile>
    </Box>
  )
}
