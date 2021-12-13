import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { NoPostsPlaceholderFragment$key } from '@//:artifacts/NoPostsPlaceholderFragment.graphql'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { Link } from '@//:modules/routing'
import { CheckCircle, PauseCircle } from '@//:assets/icons/interface'

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
  const [t] = useTranslation('moderation')

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
          {t('queue.paused.header')}
        </Heading>
        <Text color='gray.200'>
          {t('queue.paused.subheader')}
        </Text>
        <Link to='/settings/moderation'>
          <Button
            colorScheme='gray'
            variant='ghost'
            size='md'
          >{t('queue.paused.unpause')}
          </Button>
        </Link>
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
        {t('queue.empty.header')}
      </Heading>
      <Text color='gray.200'>
        {t('queue.empty.subheader')}
      </Text>
    </Stack>
  )
}
