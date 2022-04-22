import { Heading, Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { NoPostsPlaceholderFragment$key } from '@//:artifacts/NoPostsPlaceholderFragment.graphql'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { CheckCircle, PauseCircle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  moderator: NoPostsPlaceholderFragment$key
}

const NoPostsPlaceholderFragmentGQL = graphql`
  fragment NoPostsPlaceholderFragment on Account {
    moderatorSettings {
      isInModeratorQueue
    }
  }
`

export default function PostHeader (props: Props): JSX.Element {
  const data = useFragment(NoPostsPlaceholderFragmentGQL, props.moderator)

  if (!data.moderatorSettings.isInModeratorQueue) {
    return (
      <Stack align='center'>
        <Icon
          w={12}
          h={12}
          mb={4}
          icon={PauseCircle}
          fill='orange.300'
        />
        <Heading color='gray.00' fontSize='4xl'>
          <Trans>
            Moderation Paused
          </Trans>
        </Heading>
        <Text color='gray.200'>
          <Trans>
            Since you've paused your moderator status, you won't get anymore new cases.
          </Trans>
        </Text>
        <LinkButton
          href='/settings/moderation'
          colorScheme='gray'
          variant='ghost'
          size='md'
        >
          <Trans>
            Moderation Settings
          </Trans>
        </LinkButton>
      </Stack>
    )
  }

  return (
    <Stack align='center'>
      <Icon
        w={12}
        h={12}
        icon={CheckCircle}
        mb={4}
        fill='green.300'
      />
      <Heading color='gray.00' fontSize='4xl'>
        <Trans>
          All Clear
        </Trans>
      </Heading>
      <Text color='gray.200'>
        <Trans>
          There are no posts in your queue at the moment. Try checking again tomorrow?
        </Trans>
      </Text>
    </Stack>
  )
}
