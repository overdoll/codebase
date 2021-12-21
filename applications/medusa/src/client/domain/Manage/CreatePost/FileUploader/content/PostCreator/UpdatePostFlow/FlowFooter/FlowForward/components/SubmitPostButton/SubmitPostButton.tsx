import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { StringParam, useQueryParam } from 'use-query-params'
import { useTranslation } from 'react-i18next'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../../../../constants/constants'
import type { SubmitPostButtonFragment$key } from '@//:artifacts/SubmitPostButtonFragment.graphql'
import type { SubmitPostButtonMutation } from '@//:artifacts/SubmitPostButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: SubmitPostButtonFragment$key
}

const Fragment = graphql`
  fragment SubmitPostButtonFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation SubmitPostButtonMutation ($input: SubmitPostInput!) {
    submitPost(input: $input) {
      post {
        id
        state
      }
      inReview
    }
  }
`

export default function SubmitPostButton ({
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [submitPost, isSubmittingPost] = useMutation<SubmitPostButtonMutation>(Mutation)

  const [, setPostReference] = useQueryParam('id', StringParam)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const onSubmitPost = (): void => {
    submitPost({
      variables: {
        input: {
          id: data.id
        }
      },
      onCompleted (data) {
        setPostReference(undefined)
        uppy.reset()
        dispatch({
          type: EVENTS.CLEANUP,
          value: INITIAL_STATE
        })
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.SUBMIT
        })
        if ((data?.submitPost?.inReview) === true) {
          dispatch({
            type: EVENTS.IN_REVIEW,
            value: true
          })
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.review.selector.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <Button
      colorScheme='primary'
      size='lg'
      isLoading={isSubmittingPost}
      onClick={onSubmitPost}
    >{t('create_post.flow.steps.footer.submit')}
    </Button>
  )
}
