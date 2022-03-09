import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useQueryParam } from 'use-query-params'
import type { SubmitPostButtonFragment$key } from '@//:artifacts/SubmitPostButtonFragment.graphql'
import type { SubmitPostButtonMutation } from '@//:artifacts/SubmitPostButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { useContext } from 'react'
import { UppyContext } from '../../../../../../context'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
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
    }
  }
`

export default function SubmitPostButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const uppy = useContext(UppyContext)
  const {
    dispatch,
    reset
  } = useSequenceContext()

  const [submitPost, isSubmittingPost] = useMutation<SubmitPostButtonMutation>(Mutation)

  const [, setPostReference] = useQueryParam<string | null | undefined>('post')

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
        reset()
        dispatch({
          type: 'isSubmitted',
          value: true,
          transform: 'SET'
        })
        dispatch({
          type: 'isInReview',
          value: true,
          transform: 'SET'
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error submitting your post`
        })
      }
    })
  }

  return (
    <Button
      colorScheme='teal'
      size='lg'
      isLoading={isSubmittingPost}
      onClick={onSubmitPost}
    >
      <Trans>
        Submit
      </Trans>
    </Button>
  )
}
