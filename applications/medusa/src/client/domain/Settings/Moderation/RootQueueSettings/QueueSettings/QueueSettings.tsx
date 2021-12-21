import { Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { graphql, PreloadedQuery, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import type { QueueSettingsMutation } from '@//:artifacts/QueueSettingsMutation.graphql'
import type { QueueSettingsQuery as QueueSettingsQueryType } from '@//:artifacts/QueueSettingsQuery.graphql'
import Switch from '@//:modules/form/Switch/Switch'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'

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

  const status = queryData?.viewer?.moderatorSettings.isInModeratorQueue === true
  const notify = useToast()

  const { i18n } = useLingui()

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
          title: t`You are no longer in the Moderator Posts Queue`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error changing your Queue status`,
          isClosable: true
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
        <Switch onChange={onChangeSettings} isDisabled={isChangingSettings} ml={4} defaultChecked={status} />
      </Flex>
    </>
  )
}
