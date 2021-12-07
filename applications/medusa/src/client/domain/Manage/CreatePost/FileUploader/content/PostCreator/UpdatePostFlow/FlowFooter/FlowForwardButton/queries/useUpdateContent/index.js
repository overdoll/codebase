/**
 * @flow
 */

import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { useUpdateContentFragment$key } from '@//:artifacts/useUpdateContentFragment.graphql'
import { graphql, useMutation } from 'react-relay/hooks'
import type useUpdateContentMutation from '@//:artifacts/useUpdateContentMutation.graphql'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: useUpdateContentFragment$key
}

const Fragment = graphql`
  fragment useUpdateContentFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation useUpdateContentMutation ($input: UpdatePostContentInput!) {
    updatePostContent(input: $input) {
      post {
        id
        content {
          id
          type
          urls {
            url
            mimeType
          }
        }
      }
    }
  }
`

export default function useUpdateContent ({ uppy, dispatch, state, query }: Props) {
  const data = useFragment(Fragment, query)

  const [updateContent, isUpdatingContent] = useMutation<useUpdateContentMutation>(Mutation)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const onUpdateContent = () => {
    const currentURLs = state.content.map((item) =>
      item.urls[0].url)

    updateContent({
      variables: {
        input: {
          id: data.id,
          content: currentURLs
        }
      },
      onCompleted (data) {
        dispatch({ type: EVENTS.CONTENT, clear: true })
        dispatch({ type: EVENTS.STEP, value: STEPS.AUDIENCE })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.arrange.arranger.query.error'),
          isClosable: true
        })
      }
    })
  }

  return [onUpdateContent, isUpdatingContent]
}
