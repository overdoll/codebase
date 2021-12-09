/**
 * @flow
 */

import { Button, Heading, Text } from '@chakra-ui/react'
import type { Node } from 'react'
import { graphql, useFragment } from 'react-relay'
import type { NoPostsPlaceholderFragment$key } from '@//:artifacts/NoPostsPlaceholderFragment.graphql'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { Link } from '@//:modules/routing'
import InterfaceValidationCheckSquare1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check-square-1.svg'
import EntertainmentControlButtonPauseCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/entertainment/control-buttons/entertainment-control-button-pause-circle.svg'

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
      <>
        <Icon
          w={12} h={12} icon={EntertainmentControlButtonPauseCircle}
          fill='orange.300'
        />
        <Heading color='gray.00' fontWeight='normal' size='xl' mt={8} mb={1}>
          {t('queue.paused.header')}
        </Heading>
        <Text mb={1} color='gray.200'>
          {t('queue.paused.subheader')}
        </Text>
        <Link to='/settings/moderation'>
          <Button
            colorScheme='gray' variant='ghost'
            size='md'
          >{t('queue.paused.unpause')}
          </Button>
        </Link>
      </>
    )
  }

  return (
    <>
      <Icon
        w={12} h={12} icon={InterfaceValidationCheckSquare1}
        fill='green.300'
      />
      <Heading color='gray.00' fontWeight='normal' size='xl' mt={8} mb={1}>
        {t('queue.empty.header')}
      </Heading>
      <Text color='gray.200'>
        {t('queue.empty.subheader')}
      </Text>
    </>
  )
}
