/**
 * @flow
 */

import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { useSubmitPostFragment$key } from '@//:artifacts/useSubmitPostFragment.graphql'
import { graphql, useMutation } from 'react-relay/hooks'
import type useSubmitPostMutation from '@//:artifacts/useSubmitPostMutation.graphql'
import { useFragment } from 'react-relay'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../../../../constants/constants'
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { StringParam, useQueryParam } from 'use-query-params'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: useSubmitPostFragment$key
}

const Fragment = graphql`
  fragment useSubmitPostFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation useSubmitPostMutation ($input: SubmitPostInput!) {
    submitPost(input: $input) {
      post {
        id
        state
      }
      inReview
    }
  }
`

export default function useSubmitPost ({ uppy, dispatch, state, query }: Props) {
  const data = useFragment(Fragment, query)

  const [submitPost, isSubmittingPost] = useMutation<useSubmitPostMutation>(Mutation)

  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const onSubmitPost = () => {
    submitPost({
      variables: {
        input: {
          id: data.id
        }
      },
      onCompleted (data) {
        setPostReference(undefined)
        uppy.reset()
        dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
        dispatch({ type: EVENTS.STEP, value: STEPS.SUBMIT })
        if (data?.submitPost?.inReview) {
          dispatch({ type: EVENTS.IN_REVIEW })
        }
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('posts.flow.steps.review.selector.query.error'),
          isClosable: true
        })
      }
    })
  }

  return [onSubmitPost, isSubmittingPost]
}
