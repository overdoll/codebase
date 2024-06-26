import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useQueryParam } from 'use-query-params'
import type { SubmitPostButtonFragment$key } from '@//:artifacts/SubmitPostButtonFragment.graphql'
import type { SubmitPostButtonMutation } from '@//:artifacts/SubmitPostButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { hasSupporterContent } from '../../UploadFlowSteps/UploadReviewStep/UploadReviewStep'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import isFailed from '@//:modules/content/HookedComponents/Post/support/isFailed'

interface Props {
  query: SubmitPostButtonFragment$key
}

const Fragment = graphql`
  fragment SubmitPostButtonFragment on Post {
    id
    content {
      isSupporterOnly
    }
    club {
      canCreateSupporterOnlyPosts
    }
    ...PublishedPostFragment
    ...ReviewPostFragment
    ...isFailedFragment
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

  const uppy = useUppyContext()

  const {
    dispatch,
    reset
  } = useSequenceContext()

  const [submitPost, isSubmittingPost] = useMutation<SubmitPostButtonMutation>(Mutation)

  const [, setPostReference] = useQueryParam<string | null | undefined>('post')

  const contentFailed = isFailed(data)

  const supportingDisabledAndPostHasSupporterContent = hasSupporterContent(data.content) && !data.club.canCreateSupporterOnlyPosts

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
        notify({
          status: 'success',
          title: t`Your post was submitted!`
        })
      },
      updater: (store, payload) => {
        if (payload?.submitPost?.post?.id == null) return
        const node = store.get(payload.submitPost.post.id)
        if (node != null) {
          node.setValue('REVIEW', 'state')
        }
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
      isDisabled={supportingDisabledAndPostHasSupporterContent || contentFailed}
      isLoading={isSubmittingPost}
      onClick={onSubmitPost}
    >
      <Trans>
        Submit
      </Trans>
    </Button>
  )
}
