import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Icon } from '../../../../PageLayout'
import { HeartFull, PremiumStar, RisingGraph } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function SupporterPlatformFeatureSummary (): JSX.Element {
  return (
    <HStack spacing={2}>
      <Stack maxW={150} spacing={2}>
        <Icon icon={PremiumStar} w={8} h={8} fill='gray.100' />
        <Heading textAlign='center' fontSize='sm' color='gray.100'>
          <Trans>
            See your chosen artist's exclusive content
          </Trans>
        </Heading>
      </Stack>
      <Stack maxW={150} spacing={2}>
        <Icon icon={RisingGraph} w={8} h={8} fill='gray.100' />
        <Heading textAlign='center' fontSize='sm' color='gray.100'>
          <Trans>
            Sort posts by Top and New
          </Trans>
        </Heading>
      </Stack>
      <Stack maxW={150} spacing={2}>
        <Icon icon={HeartFull} w={8} h={8} fill='gray.100' />
        <Heading textAlign='center' fontSize='sm' color='gray.100'>
          <Trans>
            Access your liked posts
          </Trans>
        </Heading>
      </Stack>
    </HStack>
  )
}
