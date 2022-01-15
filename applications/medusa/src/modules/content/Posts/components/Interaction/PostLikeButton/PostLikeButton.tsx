import { graphql, useFragment } from 'react-relay'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { PostLikeButtonFragment$key } from '@//:artifacts/PostLikeButtonFragment.graphql'
import { HeartFull, HeartOutline } from '@//:assets/icons/interface'
import { Icon } from '../../../../index'
import { useMutation } from 'react-relay/hooks'
import { ClickableBox } from '../../../../PageLayout'
import { Flex, Heading } from '@chakra-ui/react'
import { abbreviateNumber } from '../../../../../support'

interface Props {
  query: PostLikeButtonFragment$key | null
}

const Fragment = graphql`
  fragment PostLikeButtonFragment on Post {
    id
    viewerLiked {
      __typename
    }
    likes
  }
`

const LikeMutation = graphql`
  mutation PostLikeButtonLikeMutation($postId: ID!) {
    likePost(input: {postId: $postId}) {
      postLike {
        post {
          viewerLiked {
            __typename
          }
        }
      }
    }
  }
`

const UndoMutation = graphql`
  mutation PostLikeButtonUndoMutation($postId: ID!) {
    undoLikePost(input: {postId: $postId}) {
      postLikeId
    }
  }
`

export default function PostLikeButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [likePost] = useMutation(LikeMutation)
  const [undoLike] = useMutation(UndoMutation)

  const onLikePost = (): void => {
    if (data?.id == null) return

    likePost({
      variables: {
        postId: data?.id
      },
      optimisticUpdater: (store) => {
        const node = store.get(data.id)
        if (node != null) {
          node.setValue(node.getValue('likes') as number + 1, 'likes')
        }
      },
      updater: (store) => {
        const node = store.get(data.id)
        if (node != null) {
          node.setValue(node.getValue('likes') as number + 1, 'likes')
        }
      }
    })
  }

  const onUndoLike = (): void => {
    if (data?.id == null) return

    undoLike({
      variables: {
        postId: data?.id
      },
      optimisticUpdater: (store) => {
        const node = store.get(data.id)
        if (node != null) {
          node.setValue(node.getValue('likes') as number - 1, 'likes')
          node.setValue(null, 'viewerLiked')
        }
      },
      updater: (store) => {
        const node = store.get(data.id)
        if (node != null) {
          node.setValue(node.getValue('likes') as number - 1, 'likes')
          node.setValue(null, 'viewerLiked')
        }
      }
    })
  }

  const likes = abbreviateNumber(data?.likes ?? 0, 2)

  if (data?.viewerLiked != null) {
    return (
      <Flex align='center'>
        <ClickableBox mr={1} bg='transparent' borderRadius='xl' onClick={onUndoLike} p={1}>
          <Icon icon={HeartFull} fill='primary.400' h={8} w={8} />
        </ClickableBox>
        <Heading color='primary.400' fontSize='2xl'>
          {likes}
        </Heading>
      </Flex>
    )
  }

  return (
    <Flex align='center'>
      <ClickableBox mr={1} bg='transparent' borderRadius='xl' onClick={onLikePost} p={1}>
        <Icon icon={HeartOutline} fill='gray.200' h={8} w={8} />
      </ClickableBox>
      <Heading color='gray.200' fontSize='2xl'>
        {likes}
      </Heading>
    </Flex>
  )
}