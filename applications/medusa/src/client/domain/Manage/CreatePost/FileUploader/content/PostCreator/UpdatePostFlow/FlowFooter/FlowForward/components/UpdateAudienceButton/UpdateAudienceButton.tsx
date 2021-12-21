import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateAudienceButton$key } from '@//:artifacts/UpdateAudienceButton.graphql'
import type { UpdateAudienceButtonMutation } from '@//:artifacts/UpdateAudienceButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'

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

  const [t] = useTranslation('manage')

  const notify = useToast()

  const checkUpdate = (): void => {
    if (state.audience !== data?.audience?.id) {
      onUpdateAudience()
      return
    }
    dispatch({
      type: EVENTS.STEP,
      value: STEPS.BRAND
    })
  }

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
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.BRAND
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.audience.selector.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={state.audience == null}
      isLoading={isUpdatingAudience}
      onClick={checkUpdate}
    >{t('create_post.flow.steps.footer.forward')}
    </Button>
  )
}
