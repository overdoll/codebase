import { Box, Flex, Stack } from '@chakra-ui/react'
import SupporterPlatformFeatureSummary from '../SupporterPlatformFeatureSummary/SupporterPlatformFeatureSummary'
import { Trans } from '@lingui/macro'
import LinkButton from '../../../../ThemeComponents/LinkButton/LinkButton'

export default function SupporterUnlockShadow (): JSX.Element {
  return (
    <>
      <Box
        h={800}
        zIndex={2}
        bgGradient='linear(to-b, transparent, dimmers.100, dimmers.500,dimmers.700, dimmers.800, dimmers.900, dimmers.900, dimmers.900)'
        position='absolute'
        bottom={0}
        left={0}
        right={0}
      />
      <Flex justify='center' zIndex={2} position='absolute' bottom={0} h={300} w='100%'>
        <Stack spacing={4}>
          <SupporterPlatformFeatureSummary />
          <LinkButton
            w='100%'
            size='lg'
            colorScheme='orange'
            href='/supporter'
          >
            <Trans>
              Become a Supporter
            </Trans>
          </LinkButton>
        </Stack>
      </Flex>
    </>
  )
}
