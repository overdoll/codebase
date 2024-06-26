import { Flex, Heading, Text } from '@chakra-ui/react'
import { graphql, PreloadedQuery, useFragment, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import type { QueueSettingsQuery as QueueSettingsQueryType } from '@//:artifacts/QueueSettingsQuery.graphql'
import Switch from '@//:modules/form/Switch/Switch'
import { t, Trans } from '@lingui/macro'
import type { QueueSettingsAddMutation } from '@//:artifacts/QueueSettingsAddMutation.graphql'
import type { QueueSettingsRemoveMutation } from '@//:artifacts/QueueSettingsRemoveMutation.graphql'
import type { QueueSettingsFragment$key } from '@//:artifacts/QueueSettingsFragment.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: PreloadedQuery<QueueSettingsQueryType>
}

const Query = graphql`
  query QueueSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      ...QueueSettingsFragment
    }
  }
`

const Fragment = graphql`
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

export default function QueueSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<QueueSettingsQueryType>(
    Query,
    props.query
  )

  const data = useFragment<QueueSettingsFragment$key>(
    Fragment,
    queryData.viewer
  )

  const [addToQueue, isAddingToQueue] = useMutation<QueueSettingsAddMutation>(
    AddToQueue
  )

  const [removeFromQueue, isRemovingFromQueue] = useMutation<QueueSettingsRemoveMutation>(
    RemoveFromQueue
  )

  const status = data.moderatorSettings?.isInModeratorQueue

  const notify = useToast()

  const onChangeSettings = (): void => {
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
            title: t`You are no longer in the Moderator Posts Queue`
          })
        },
        onError () {
          notify({
            status: 'error',
            title: t`There was an error changing your Queue status to Off`
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
          title: t`You are now active in the Moderator Posts Queue`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error changing your Queue status to On`
        })
      }
    })
  }

  return (
    <>
      <Flex align='center' direction='row'>
        <Flex direction='column'>
          <Heading color='gray.100' fontSize='lg'>
            <Trans>
              Toggle Queue Status
            </Trans>
          </Heading>
          <Text color='gray.200' fontSize='sm'>
            <Trans>
              Change your status for receiving posts in your Moderation Queue
            </Trans>
          </Text>
        </Flex>
        <Switch
          onChange={onChangeSettings}
          colorScheme='purple'
          isDisabled={isAddingToQueue || isRemovingFromQueue}
          ml={4}
          defaultChecked={status}
        />
      </Flex>
    </>
  )
}
