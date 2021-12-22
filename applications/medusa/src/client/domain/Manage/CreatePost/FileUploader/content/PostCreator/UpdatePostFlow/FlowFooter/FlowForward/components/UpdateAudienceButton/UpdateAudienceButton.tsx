import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateAudienceButton$key } from '@//:artifacts/UpdateAudienceButton.graphql'
import type { UpdateAudienceButtonMutation } from '@//:artifacts/UpdateAudienceButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: UpdateAudienceButton$key
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
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateAudience, isUpdatingAudience] = useMutation<UpdateAudienceButtonMutation>(Mutation)

  const notify = useToast()

  const hasUpdate = state.audience !== data?.audience?.id && state.audience != null

  const goNext = (): void => {
    dispatch({
      type: EVENTS.STEP,
      value: STEPS.BRAND
    })
  }

  const isDisabled = state.audience == null

  const onUpdateAudience = (): void => {
    if (state?.audience == null) return

    updateAudience({
      variables: {
        input: {
          id: data.id,
          audienceId: state?.audience
        }
      },
      onCompleted () {
        goNext()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the audience`,
          isClosable: true
        })
      }
    })
  }
  if (hasUpdate) {
    return (
      <Button
        colorScheme='green'
        size='lg'
        isDisabled={isDisabled}
        isLoading={isUpdatingAudience}
        onClick={onUpdateAudience}
      >
        <Trans>
          Save
        </Trans>
      </Button>
    )
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={isDisabled}
      onClick={goNext}
    >
      <Trans>
        Next
      </Trans>
    </Button>
  )
}
