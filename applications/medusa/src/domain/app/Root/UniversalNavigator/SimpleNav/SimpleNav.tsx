import { Box, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { Icon } from '@//:modules/content/PageLayout'
import { DiscoverGlobe } from '@//:assets/icons'

export default function SimpleNav (): JSX.Element {
  return (
    <Box
      zIndex='docked'
      right={0}
      left={1}
      top={1}
      position='fixed'
      pointerEvents='none'
    >
      <LinkTile width={16} pointerEvents='auto' href='/'>
        <Stack
          boxShadow='drag'
          align='center'
          justify='center'
          borderRadius='inherit'
          bg='dimmers.700'
          px={1}
          py={2}
          spacing={1}
        >
          <Icon icon={DiscoverGlobe} w={5} h={5} fill='whiteAlpha.800' />
          <Heading textAlign='center' fontSize='xs' color='whiteAlpha.800'>
            <Trans>
              Browse Rule34
            </Trans>
          </Heading>
        </Stack>
      </LinkTile>
    </Box>
  )
}
