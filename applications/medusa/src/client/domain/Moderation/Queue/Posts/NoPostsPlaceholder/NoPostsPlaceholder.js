/**
 * @flow
 */

import { Button, Heading, Text, Stack, Box } from '@chakra-ui/react'
import type { Node } from 'react'
import { graphql, useFragment } from 'react-relay'
import type { NoPostsPlaceholderFragment$key } from '@//:artifacts/NoPostsPlaceholderFragment.graphql'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { Link } from '@//:modules/routing'

import { PauseCircle, CheckCircle } from '../../../../../../assets/icons/interface'

type Props = {
  moderator: NoPostsPlaceholderFragment$key
}

const NoPostsPlaceholderFragmentGQL = graphql`
  fragment NoPostsPlaceholderFragment on Account {
    moderatorSettings {
      isInModeratorQueue
    }
  }
`

export default function PostHeader (props: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(NoPostsPlaceholderFragmentGQL, props.moderator)

  if (!data.moderatorSettings.isInModeratorQueue) {
    return (
      <Stack spacing={4} align='center'>
        <Icon
          w={12} h={12}
          icon={PauseCircle}
          fill='orange.300'
        />
        <Box>
          <Heading color='gray.00' fontSize='4xl'>
            {t('queue.paused.header')}
          </Heading>
          <Text color='gray.200'>
            {t('queue.paused.subheader')}
          </Text>
        </Box>
        <Link to='/settings/moderation'>
          <Button
            colorScheme='gray' variant='solid'
            size='lg'
          >{t('queue.paused.unpause')}
          </Button>
        </Link>
      </Stack>
    )
  }

  return (
    <Stack spacing={4} align='center'>
      <Icon
        w={12} h={12} icon={CheckCircle}
        fill='green.300'
      />
      <Box>
        <Heading color='gray.00' fontSize='4xl'>
          {t('queue.empty.header')}
        </Heading>
        <Text color='gray.200'>
          {t('queue.empty.subheader')}
        </Text>
      </Box>
    </Stack>
  )
}
