import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UpdateAudienceButtonFragment$key } from '@//:artifacts/UpdateAudienceButtonFragment.graphql'
import type { UpdateAudienceButtonMutation } from '@//:artifacts/UpdateAudienceButtonMutation.graphql'
import { t } from '@lingui/macro'
import { FlowBuilderNextButton, FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: UpdateAudienceButtonFragment$key
  nextStep: () => void
}

const Fragment = graphql`
  fragment UpdateAudienceButtonFragment on Post {
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

  const { state } = useSequenceContext()

  const [updateAudience, isUpdatingAudience] = useMutation<UpdateAudienceButtonMutation>(Mutation)

  const notify = useToast()

  const hasUpdate = Object.keys(state.audience)[0] !== data?.audience?.id && Object.keys(state.audience).length > 0

  const isDisabled = Object.keys(state.audience).length < 1

  const onUpdateAudience = (): void => {
    updateAudience({
      variables: {
        input: {
          id: data.id,
          audienceId: Object.keys(state.audience)[0]
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
