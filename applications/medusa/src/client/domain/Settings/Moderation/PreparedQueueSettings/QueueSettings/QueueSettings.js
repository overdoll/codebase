/**
 * @flow
 */
import type { Node } from 'react'
import {
  Divider,
  Heading,
  useToast,
  Switch,
  Flex,
  Text
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { QueueSettingsFragment$key } from '@//:artifacts/QueueSettingsFragment.graphql'
import type { QueueSettingsMutation } from '@//:artifacts/QueueSettingsMutation.graphql'

type Props = {
  account: QueueSettingsFragment$key
}

const QueueSettingsFragmentGQL = graphql`
  fragment QueueSettingsFragment on Query {
    viewer {
      __typename
    }
  }
`

const QueueSettingsMutationGQL = graphql`
  mutation QueueSettingsMutation {
    toggleModeratorSettingsInQueue {
      moderatorSettingsInQueue
    }
  }
`

export default function QueueSettings ({ account }: Props): Node {
  const data = useFragment(QueueSettingsFragmentGQL, account)

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
      <Heading size='lg' color='gray.00'>{t('moderation.queue.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Flex align='center' direction='row'>
        <Switch onChange={onChangeSettings} isDisabled={isChangingSettings} mr={4} defaultChecked={status} />
        <Flex direction='column'>
          <Heading color='gray.100' fontSize='lg'>{t('moderation.queue.toggle.header')}</Heading>
          <Text color='gray.200' fontSize='sm'>{t('moderation.queue.toggle.subheader')}</Text>
        </Flex>
      </Flex>
    </>
  )
}
