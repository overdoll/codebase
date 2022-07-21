import { graphql, useFragment } from 'react-relay'
import { PostLikeButtonFragment$key } from '@//:artifacts/PostLikeButtonFragment.graphql'
import { PostLikeButtonViewerFragment$key } from '@//:artifacts/PostLikeButtonViewerFragment.graphql'
import { HeartFull, HeartOutline } from '@//:assets/icons/interface'
import { ButtonProps } from '@chakra-ui/react'
import Can from '../../../../../../authorization/Can'
import { Trans } from '@lingui/macro'
import encodeJoinRedirect from '../../../../../../support/encodeJoinRedirect'
import PostFooterButton from '../PostFooterButton/PostFooterButton'
import PostLikeWrapper from '../../../PostWrappers/PostLikeWrapper/PostLikeWrapper'

interface Props extends ButtonProps {
  postQuery: PostLikeButtonFragment$key
  viewerQuery: PostLikeButtonViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostLikeButtonFragment on Post {
    reference
    club {
      slug
    }
    ...PostLikeWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment PostLikeButtonViewerFragment on Account {
    __typename
  }
`

export default function PostLikeButton ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const redirect = encodeJoinRedirect({
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: postData.club.slug,
      reference: postData.reference
    }
  })

  if (viewerData == null) {
    return (
      <PostFooterButton isIcon href={redirect} icon={HeartOutline}>
        <Trans>
          Like
        </Trans>
      </PostFooterButton>
    )
  }

  return (
    <PostLikeWrapper postQuery={postData}>
      {({
        likePost,
        hasLiked,
        isLikingPost
      }) => (
        <Can I='interact' a='Post'>
          {allowed => {
            if (hasLiked) {
              return (
                <PostFooterButton
                  colorScheme='primary'
                  isDisabled={allowed === false}
                  isIcon
                  onClick={likePost}
                  isLoading={isLikingPost}
                  icon={HeartFull}
                >
                  <Trans>
                    Remove Like
                  </Trans>
                </PostFooterButton>
              )
            }
            return (
              <PostFooterButton
                isDisabled={allowed === false}
                isIcon
                onClick={likePost}
                isLoading={isLikingPost}
                icon={HeartOutline}
              >
                <Trans>
                  Like
                </Trans>
              </PostFooterButton>
            )
          }}
        </Can>
      )}
    </PostLikeWrapper>
  )
}
