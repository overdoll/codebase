import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UpdateAudienceButton$key } from '@//:artifacts/UpdateAudienceButton.graphql'
import type { UpdateAudienceButtonMutation } from '@//:artifacts/UpdateAudienceButtonMutation.graphql'
import { t } from '@lingui/macro'
import { useContext } from 'react'
import { FlowBuilderNextButton, FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: UpdateAudienceButton$key
  nextStep: () => void
}

const Fragment = graphql`
  fragment UpdateAudienceButton on Post {
    id
    audience {
      id
    }
  }
`

const Mutation = graphql`
  mutation UpdateAudienceButtonMutation ($input: UpdatePostAudienceInput!) {
    updatePostAudience(input: $input) {
      post {
        id
        audience {
          id
          title
        }
      }
    }
  }
`

export default function UpdateAudienceButton ({
  query,
  nextStep
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const state = useContext(StateContext)

  const [updateAudience, isUpdatingAudience] = useMutation<UpdateAudienceButtonMutation>(Mutation)

  const notify = useToast()

  const hasUpdate = state.audience.value !== data?.audience?.id && state.audience.value != null

  const isDisabled = state.audience.value == null

  const onUpdateAudience = (): void => {
    if (state.audience.value == null) return

    updateAudience({
      variables: {
        input: {
          id: data.id,
          audienceId: state.audience.value
        }
      },
      onCompleted () {
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the audience`
        })
      }
    })
  }
  if (hasUpdate) {
    return (
      <FlowBuilderSaveButton
        isDisabled={isDisabled}
        isLoading={isUpdatingAudience}
        onClick={onUpdateAudience}
      />
    )
  }

  return (
    <FlowBuilderNextButton
      isDisabled={isDisabled}
    />
  )
}
