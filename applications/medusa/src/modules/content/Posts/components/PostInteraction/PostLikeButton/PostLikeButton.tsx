import { graphql, useFragment } from 'react-relay'
import { PostLikeButtonFragment$key } from '@//:artifacts/PostLikeButtonFragment.graphql'
import { PostLikeButtonViewerFragment$key } from '@//:artifacts/PostLikeButtonViewerFragment.graphql'
import { HeartFull, HeartOutline } from '@//:assets/icons/interface'
import { useMutation } from 'react-relay/hooks'
import { Icon } from '../../../../PageLayout'
import { ButtonProps, Flex, Heading } from '@chakra-ui/react'
import abbreviateNumber from '../../../../../support/abbreviateNumber'
import IconButton from '../../../../../form/IconButton/IconButton'
import Can from '../../../../../authorization/Can'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import encodeJoinRedirect from '../../../../../support/encodeJoinRedirect'
import { useRouter } from 'next/router'

interface Props extends ButtonProps {
  query: PostLikeButtonFragment$key
  viewerQuery: PostLikeButtonViewerFragment$key | null
}

const Fragment = graphql`
  fragment PostLikeButtonFragment on Post {
    id
    reference
    club {
      slug
    }
    viewerLiked {
      __typename
    }
    likes
  }
`

const ViewerFragment = graphql`
  fragment PostLikeButtonViewerFragment on Account {
    id
  }
`

const LikeMutation = graphql`
  mutation PostLikeButtonLikeMutation($postId: ID!) {
    likePost(input: {id: $postId}) {
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
    undoLikePost(input: {id: $postId}) {
      postLikeId
    }
  }
`

export default function PostLikeButton ({
  query,
  viewerQuery,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [likePost, isLiking] = useMutation(LikeMutation)
  const [undoLike, isUnliking] = useMutation(UndoMutation)

  const redirect = encodeJoinRedirect({
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: data.club.slug,
      reference: data.reference
    }
  })

  const { i18n } = useLingui()

  const router = useRouter()

  const hasLiked = data?.viewerLiked != null

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

  const isLoggedIn = viewerData != null

  return (
    <Can I='interact' a='Post'>
      {allowed => (
        <Flex align='center'>
          <IconButton
            aria-label={i18n._(t`Like`)}
            borderRadius='xl'
            isDisabled={allowed === false}
            mr={1}
            bg='transparent'
            isLoading={isLiking || isUnliking}
            icon={(<Icon
              icon={hasLiked ? HeartFull : HeartOutline}
              fill={hasLiked ? 'primary.400' : 'gray.200'}
              h={6}
              w={6}
                   />)}
            onClick={isLoggedIn ? (hasLiked ? () => onUndoLike() : () => onLikePost()) : async () => await router.push(redirect)}
            {...rest}
          />
          <Heading color={hasLiked ? 'primary.400' : 'gray.200'} fontSize='xl'>
            {likes}
          </Heading>
        </Flex>
      )}
    </Can>
  )
}
