/**
 * @flow
 */
import type { Node } from 'react'
import {
  Heading,
  useToast,
  Flex,
  Text
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { graphql, useFragment, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import type { QueueSettingsFragment$key } from '@//:artifacts/QueueSettingsFragment.graphql'
import type { QueueSettingsMutation } from '@//:artifacts/QueueSettingsMutation.graphql'
import type { QueueSettingsQuery as QueueSettingsQueryType } from '@//:artifacts/QueueSettingsQuery.graphql'
import Switch from '@//:modules/form/Switch'

type Props = {
  query: QueueSettingsFragment$key
}

const PreparedQueueGQL = graphql`
  query QueueSettingsQuery {
    ...QueueSettingsFragment
  }
`

const QueueSettingsFragmentGQL = graphql`
  fragment QueueSettingsFragment on Query {
    viewer {
      __typename
    }
  }
`

const QueueSettingsMutationGQL = graphql`
  mutation QueueSettingsMutation($input: RemoveModeratorFromPostQueueInput!) {
    removeModeratorFromPostQueue(input: $input) {
      account {
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

  const data = useFragment(QueueSettingsFragmentGQL, queryData)

  const [changeSettings, isChangingSettings] = useMutation<QueueSettingsMutation>(
    QueueSettingsMutationGQL
  )

  const [t] = useTranslation('settings')

  const status = !!data?.viewer.moderator

  const notify = useToast()

  const onChangeSettings = () => {
    changeSettings(
      {
        variables: {},
        onCompleted (data) {
          if (data.toggleModeratorSettingsInQueue.moderatorSettingsInQueue) {
            notify({
              status: 'success',
              title: t('moderation.queue.toggle.query.success_on'),
              isClosable: true
            })
          }
          if (!data.toggleModeratorSettingsInQueue.moderatorSettingsInQueue) {
            notify({
              status: 'success',
              title: t('moderation.queue.toggle.query.success_off'),
              isClosable: true
            })
          }
        },
        onError () {
          notify({
            status: 'error',
            title: t('moderation.queue.toggle.query.error'),
            isClosable: true
          })
        }
      }
    )
  }

  return (
    <>
      <Flex align='center' direction='row'>
        <Flex direction='column'>
          <Heading color='gray.100' fontSize='lg'>{t('moderation.queue.toggle.header')}</Heading>
          <Text color='gray.200' fontSize='sm'>{t('moderation.queue.toggle.subheader')}</Text>
        </Flex>
        <Switch onChange={onChangeSettings} isDisabled={isChangingSettings} ml={4} defaultChecked={status} />
      </Flex>
    </>
  )
}
