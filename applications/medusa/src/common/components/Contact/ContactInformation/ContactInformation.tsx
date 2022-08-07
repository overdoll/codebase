import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { MailEnvelope } from '@//:assets/icons'
import { SocialDiscord, SocialTwitter } from '@//:assets/logos'

export default function ContactInformation (): JSX.Element {
  const ICON_PROPS = {
    w: 5,
    h: 5,
    fill: 'gray.200'
  }

  const TEXT_PROPS = {
    fontSize: 'md',
    color: 'gray.100'

  }

  return (
    <Stack spacing={2}>
      <HStack spacing={3}>
        <Icon icon={MailEnvelope} {...ICON_PROPS} />
        <Heading {...TEXT_PROPS}>
          hello@overdoll.com
        </Heading>
      </HStack>
      <HStack spacing={3}>
        <Icon icon={SocialDiscord} {...ICON_PROPS} />
        <Heading {...TEXT_PROPS}>
          overdoll#2932
        </Heading>
      </HStack>
      <HStack spacing={3}>
        <Icon icon={SocialTwitter} {...ICON_PROPS} />
        <Heading {...TEXT_PROPS}>
          @overdoll_com
        </Heading>
      </HStack>
    </Stack>
  )
}
