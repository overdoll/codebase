import { Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { ExternalLink } from '@//:modules/routing'
import { DISCORD_LINK, TWITTER_FOLLOW_INTENT } from '@//:modules/constants/links'
import { Icon } from '@//:modules/content/PageLayout'
import { SocialDiscord, SocialTwitter } from '@//:assets/logos'

export default function DropdownMenuSocialLinks (): JSX.Element {
  return (
    <Stack
      p={2}
      direction={{
        base: 'column',
        md: 'row'
      }}
      spacing={4}
      align='center'
      justify='center'
    >
      <ExternalLink href={TWITTER_FOLLOW_INTENT}>
        <Button
          colorScheme='gray'
          variant='link'
          size='md'
          leftIcon={<Icon icon={SocialTwitter} w={4} h={4} fill='gray.100' />}
        >
          <Trans>
            Twitter
          </Trans>
        </Button>
      </ExternalLink>
      <ExternalLink href={DISCORD_LINK}>
        <Button
          colorScheme='gray'
          variant='link'
          size='md'
          leftIcon={<Icon icon={SocialDiscord} w={4} h={4} fill='gray.100' />}
        >
          <Trans>
            Discord
          </Trans>
        </Button>
      </ExternalLink>
    </Stack>
  )
}
