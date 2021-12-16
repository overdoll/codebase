/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { graphql, useFragment, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import type { QueueSettingsFragment$key } from '@//:artifacts/QueueSettingsFragment.graphql'
import type { QueueSettingsAddMutation } from '@//:artifacts/QueueSettingsAddMutation.graphql'
import type { QueueSettingsRemoveMutation } from '@//:artifacts/QueueSettingsRemoveMutation.graphql'
import type { QueueSettingsQuery as QueueSettingsQueryType } from '@//:artifacts/QueueSettingsQuery.graphql'
import Switch from '@//:modules/form/Switch'

type Props = {
  query: QueueSettingsFragment$key
}

const PreparedQueueGQL = graphql`
  query QueueSettingsQuery {
    viewer {
      ...QueueSettingsFragment
    }
  }
`

const QueueSettingsFragmentGQL = graphql`
  fragment QueueSettingsFragment on Account {
    id
    moderatorSettings {
      isInModeratorQueue
    }
  }
`

const AddToQueue = graphql`
  mutation QueueSettingsAddMutation($input: AddModeratorToPostQueueInput!) {
    addModeratorToPostQueue(input: $input) {
      account {
        id
        moderatorSettings {
          isInModeratorQueue
        }
      }
    }
  }
`

const RemoveFromQueue = graphql`
  mutation QueueSettingsRemoveMutation($input: RemoveModeratorFromPostQueueInput!) {
    removeModeratorFromPostQueue(input: $input) {
      account {
        id
        moderatorSettings {
          isInModeratorQueue
        }
      }
    }
  }
`

export default function QueueSettings (props: Props): Node {
  const queryData = usePreloadedQuery<QueueSettingsQueryType>(
    PreparedQueueGQL,
    props.query
  )

  const data = useFragment(QueueSettingsFragmentGQL, queryData.viewer)

  const [addToQueue, isAddingToQueue] = useMutation<QueueSettingsAddMutation>(
    AddToQueue
  )

  const [removeFromQueue, isRemovingFromQueue] = useMutation<QueueSettingsRemoveMutation>(
    RemoveFromQueue
  )

  const [t] = useTranslation('settings')

  const status = data.moderatorSettings.isInModeratorQueue

  const notify = useToast()

  const onChangeSettings = () => {
    if (status) {
      removeFromQueue({
        variables: {
          input: {
            accountId: data.id
          }
        },
        onCompleted () {
          notify({
            status: 'success',
            title: t('moderation.queue.toggle.query.success_off'),
            isClosable: true
          })
        },
        onError () {
          notify({
            status: 'error',
            title: t('moderation.queue.toggle.query.error'),
            isClosable: true
          })
        }
      })
      return
    }

    addToQueue({
      variables: {
        input: {
          accountId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('moderation.queue.toggle.query.success_on'),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('moderation.queue.toggle.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <Flex align='center' direction='row'>
        <Flex direction='column'>
          <Heading color='gray.100' fontSize='lg'>{t('moderation.queue.toggle.header')}</Heading>
          <Text color='gray.200' fontSize='sm'>{t('moderation.queue.toggle.subheader')}</Text>
        </Flex>
        <Switch
          onChange={onChangeSettings} isDisabled={isAddingToQueue || isRemovingFromQueue} ml={4}
          defaultChecked={status}
        />
      </Flex>
    </>
  )
}
