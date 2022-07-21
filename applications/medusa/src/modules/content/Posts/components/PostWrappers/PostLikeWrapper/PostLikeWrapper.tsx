import { graphql, useFragment } from 'react-relay'
import { PostLikeWrapperFragment$key } from '@//:artifacts/PostLikeWrapperFragment.graphql'
import { PostLikeWrapperLikeMutation } from '@//:artifacts/PostLikeWrapperLikeMutation.graphql'
import { PostLikeWrapperUndoMutation } from '@//:artifacts/PostLikeWrapperUndoMutation.graphql'
import { useMutation } from 'react-relay/hooks'
import { ButtonProps } from '@chakra-ui/react'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../../../../../support/runIfFunction'

interface ChildrenCallable {
  likePost: () => void
  hasLiked: boolean
  isLikingPost: boolean
}

interface Props extends ButtonProps {
  postQuery: PostLikeWrapperFragment$key
  children: MaybeRenderProp<ChildrenCallable>
}

const PostFragment = graphql`
  fragment PostLikeWrapperFragment on Post {
    id
    viewerLiked {
      __typename
    }
  }
`

const LikeMutation = graphql`
  mutation PostLikeWrapperLikeMutation($input: LikePostInput!) {
    likePost(input: $input) {
      postLike {
        __typename
      }
    }
  }
`

const UndoMutation = graphql`
  mutation PostLikeWrapperUndoMutation($input: UndoLikePostInput!) {
    undoLikePost(input: $input) {
      postLikeId
    }
  }
`

export default function PostLikeWrapper ({
  postQuery,
  children
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const [likePost, isLiking] = useMutation<PostLikeWrapperLikeMutation>(LikeMutation)
  const [undoLike, isUnliking] = useMutation<PostLikeWrapperUndoMutation>(UndoMutation)

  const hasLiked = postData?.viewerLiked != null

  const onLikePost = (): void => {
    likePost({
      variables: {
        input: {
          id: postData.id
        }
      },
      updater: (store) => {
        const node = store.get(postData.id)
        const payload = store.getRootField('likePost')?.getLinkedRecord('postLike')
        if (node != null) {
          node.setValue(node.getValue('likes') as number + 1, 'likes')
          if (payload != null) {
            node.setLinkedRecord(payload, 'viewerLiked')
          }
        }
      }
    })
  }

  const onUndoLike = (): void => {
    undoLike({
      variables: {
        input: {
          id: postData.id
        }
      },
      updater: (store) => {
        const node = store.get(postData.id)
        if (node != null) {
          node.setValue(node.getValue('likes') as number - 1, 'likes')
          node.setValue(null, 'viewerLiked')
        }
      }
    })
  }

  const onLike = (): void => {
    if (hasLiked) {
      onUndoLike()
      return
    }
    onLikePost()
  }

  return (
    <>
      {runIfFunction(children, {
        likePost: onLike,
        hasLiked: hasLiked,
        isLikingPost: isLiking || isUnliking
      })}
    </>
  )
}
