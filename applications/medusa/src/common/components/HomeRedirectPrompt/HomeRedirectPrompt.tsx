import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonRight } from '@//:assets/icons'
import React from 'react'
import useAbility from '@//:modules/authorization/useAbility'

export default function HomeRedirectPrompt (): JSX.Element {
  const ability = useAbility()

  if (ability.can('configure', 'Account')) {
    return <></>
  }

  return (
    <LinkTile href='/'>
      <HStack borderRadius='lg' justify='space-between' p={3} bg='dimmers.100'>
        <Box>
          <Heading fontSize='sm' color='whiteAlpha.900'>
            <Trans>
              overdoll is more than just for browsing adult content
            </Trans>
          </Heading>
          <Text color='whiteAlpha.700' fontSize='xs'>
            <Trans>
              We've got a home page with a rule34 roulette game and much more!
            </Trans>
          </Text>
        </Box>
        <Icon icon={ArrowButtonRight} w={4} h={4} fill='whiteAlpha.700' />
      </HStack>
    </LinkTile>
  )
}
