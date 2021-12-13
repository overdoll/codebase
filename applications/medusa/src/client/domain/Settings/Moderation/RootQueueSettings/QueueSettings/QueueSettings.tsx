import { Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { graphql, PreloadedQuery, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import type { QueueSettingsMutation } from '@//:artifacts/QueueSettingsMutation.graphql'
import type { QueueSettingsQuery as QueueSettingsQueryType } from '@//:artifacts/QueueSettingsQuery.graphql'
import Switch from '@//:modules/form/Switch/Switch'

interface Props {
  query: PreloadedQuery<QueueSettingsQueryType>
}

const PreparedQueueGQL = graphql`
  query QueueSettingsQuery {
    viewer {
      id
      moderatorSettings {
        isInModeratorQueue
      }
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

// TODO a new mutation for addmoderatortopostqueue
// TODO and now you also have to pass in account id

export default function QueueSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<QueueSettingsQueryType>(
    PreparedQueueGQL,
    props.query
  )

  const [changeSettings, isChangingSettings] = useMutation<QueueSettingsMutation>(
    QueueSettingsMutationGQL
  )

  const [t] = useTranslation('settings')

  const status = queryData?.viewer?.moderatorSettings.isInModeratorQueue === true
  const notify = useToast()

  const onChangeSettings = (): void => {
    changeSettings({
      variables: {
        input: {
          accountId: queryData.viewer?.id as string
        }
      },
      onCompleted (data) {
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
