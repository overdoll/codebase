import { useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useQueryParam } from 'use-query-params'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../../../../constants/constants'
import type { SubmitPostButtonFragment$key } from '@//:artifacts/SubmitPostButtonFragment.graphql'
import type { SubmitPostButtonMutation } from '@//:artifacts/SubmitPostButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { useContext } from 'react'
import { DispatchContext, UppyContext } from '../../../../../../../context'

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
      inReview
    }
  }
`

export default function SubmitPostButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const uppy = useContext(UppyContext)
  const dispatch = useContext(DispatchContext)

  const [submitPost, isSubmittingPost] = useMutation<SubmitPostButtonMutation>(Mutation)

  const [, setPostReference] = useQueryParam<string | null | undefined>('id')

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
          title: t`There was an error submitting your post`,
          isClosable: true
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
    ><Trans>
      Submit
    </Trans>
    </Button>
  )
}
