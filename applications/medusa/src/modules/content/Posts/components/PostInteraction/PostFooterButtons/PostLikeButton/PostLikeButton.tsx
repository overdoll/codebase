import { graphql, useFragment } from 'react-relay'
import { PostLikeButtonFragment$key } from '@//:artifacts/PostLikeButtonFragment.graphql'
import { PostLikeButtonViewerFragment$key } from '@//:artifacts/PostLikeButtonViewerFragment.graphql'
import { HeartFull, HeartOutline } from '@//:assets/icons/interface'
import { ButtonProps } from '@chakra-ui/react'
import Can from '../../../../../../authorization/Can'
import { t } from '@lingui/macro'
import encodeJoinRedirect from '../../../../../../support/encodeJoinRedirect'
import PostFooterButton from '../PostFooterButton/PostFooterButton'
import PostLikeWrapper from '../../../PostWrappers/PostLikeWrapper/PostLikeWrapper'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'

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

  const router = useRouter()

  const { i18n } = useLingui()

  const redirect = encodeJoinRedirect({
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: postData.club.slug,
      reference: postData.reference
    }
  })

  if (viewerData == null) {
    return (
      <PostFooterButton isIcon onClick={async () => await router.push(redirect)} icon={HeartOutline}>
        {i18n._(t`Like`)}
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
                  {i18n._(t`Remove Like`)}
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
                {i18n._(t`Like`)}
              </PostFooterButton>
            )
          }}
        </Can>
      )}
    </PostLikeWrapper>
  )
}
