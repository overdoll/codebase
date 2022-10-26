import { HStack, Stack, Text } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { ContentBrushPen, HeartFull, PremiumStar, RisingGraph } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function ClubSupportBenefitsSummary (): JSX.Element {
  return (
    <HStack align='flex-start' justify='center' w='100%' spacing={2}>
      <Stack w={120} spacing={2}>
        <Icon icon={PremiumStar} w={5} h={5} fill='gray.200' />
        <Text textAlign='center' fontSize='xs' color='gray.200'>
          <Trans>
            Unlock exclusive content
          </Trans>
        </Text>
      </Stack>
      <Stack w={120} spacing={2}>
        <Icon icon={ContentBrushPen} w={5} h={5} fill='gray.200' />
        <Text textAlign='center' fontSize='xs' color='gray.200'>
          <Trans>
            Exclusive content posted monthly
          </Trans>
        </Text>
      </Stack>
      <Stack w={120} spacing={2}>
        <Icon icon={RisingGraph} w={5} h={5} fill='gray.200' />
        <Text textAlign='center' fontSize='xs' color='gray.200'>
          <Trans>
            Sort posts by Top and New
          </Trans>
        </Text>
      </Stack>
      <Stack w={120} spacing={2}>
        <Icon icon={HeartFull} w={5} h={5} fill='gray.200' />
        <Text textAlign='center' fontSize='xs' color='gray.200'>
          <Trans>
            See your liked posts
          </Trans>
        </Text>
      </Stack>
    </HStack>
  )
}
