import AudiencePreference, { AudiencePreferenceProp } from '../../../fragments/AudiencePreference/AudiencePreference'
import { ObjectResolver, useSequence } from '../../../../Sequence'
import { HStack, Stack } from '@chakra-ui/react'
import Button from '../../../../../../form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks'
import { QuickUpdateAudiencePreferenceQuery } from '@//:artifacts/QuickUpdateAudiencePreferenceQuery.graphql'
import compareTwoArrays from '../../../../../../support/compareTwoArrays'
import { useToast } from '../../../../../ThemeComponents'

interface Props {
  onClose: () => void
}

interface SequenceProps extends AudiencePreferenceProp {
}

const Query = graphql`
  query QuickUpdateAudiencePreferenceQuery {
    viewer {
      curationProfile {
        audience {
          audiences {
            id
            title
          }
        }
      }
    }
  }
`

const Mutation = graphql`
  mutation QuickUpdateAudiencePreferenceMutation($audienceIds: [ID!]!, $skipped: Boolean!) {
    updateCurationProfileAudience(input: {audienceIds: $audienceIds, skipped: $skipped}) {
      curationProfile {
        id
        completed
        audience {
          skipped
          completed
          audiences {
            id
          }
        }
      }
    }
  }
`

export default function QuickUpdateAudiencePreference (props: Props): JSX.Element {
  const {
    onClose
  } = props

  const queryData = useLazyLoadQuery<QuickUpdateAudiencePreferenceQuery>(Query, {})

  const defaultAudience = queryData.viewer?.curationProfile?.audience?.audiences.reduce((accum, value) => ({
    ...accum,
    [value.id]: {
      title: value.title
    }
  }), {}) as SequenceProps['audience']

  const [updateAudience, isUpdatingAudience] = useMutation(Mutation)

  const methods = useSequence<SequenceProps>({
    defaultValue: {
      audience: defaultAudience
    },
    resolver: {
      audience: ObjectResolver()
    }
  })

  const notify = useToast()

  const onSave = (): void => {
    updateAudience({
      variables: {
        audienceIds: Object.keys(methods.state.audience),
        skipped: !(Object.keys(methods.state.audience).length > 0)
      },
      onCompleted () {
        onClose()
        notify({
          status: 'success',
          title: t`We'll remember your choices for the next time`,
          duration: 5000
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the audiences`
        })
      }
    })
  }

  const currentAudienceIds = queryData.viewer?.curationProfile?.audience?.audiences.map((item) => item.id) ?? []

  const saveCondition = ((Object.keys(methods.state.audience).length > 0) &&
    compareTwoArrays(Object.keys(methods.state.audience), currentAudienceIds) === false) || (Object.keys(methods.state.audience).length !== queryData.viewer?.curationProfile?.audience?.audiences.length)

  return (
    <Stack spacing={8}>
      <AudiencePreference audienceState={methods.state.audience} dispatch={methods.dispatch} />
      <HStack spacing={2} justify='flex-end'>
        <Button isDisabled={isUpdatingAudience} onClick={onClose} variant='ghost' size='lg'>
          <Trans>
            Close
          </Trans>
        </Button>
        {saveCondition && (
          <Button onClick={onSave} isLoading={isUpdatingAudience} colorScheme='green' variant='solid' size='lg'>
            <Trans>
              Save
            </Trans>
          </Button>
        )}
      </HStack>
    </Stack>
  )
}
