import { graphql, useFragment } from 'react-relay'
import { PostLikeButtonFragment$key } from '@//:artifacts/PostLikeButtonFragment.graphql'
import { PostLikeButtonViewerFragment$key } from '@//:artifacts/PostLikeButtonViewerFragment.graphql'
import { BookmarkFull } from '@//:assets/icons/interface'
import { ButtonProps } from '@chakra-ui/react'
import Can from '../../../../../../authorization/Can'
import { t } from '@lingui/macro'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import PostLikeWrapper from '../../../PostWrappers/PostLikeWrapper/PostLikeWrapper'
import { useLingui } from '@lingui/react'
import PostLikeLoggedOutButton from '../PostLikeLoggedOutButton/PostLikeLoggedOutButton'

interface Props extends ButtonProps {
  postQuery: PostLikeButtonFragment$key
  viewerQuery: PostLikeButtonViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostLikeButtonFragment on Post {
    ...PostLikeWrapperFragment
    ...PostLikeLoggedOutButtonFragment
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

  const { i18n } = useLingui()

  if (viewerData == null) {
    return (<PostLikeLoggedOutButton postQuery={postData} />)
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
                <MediumGenericButton
                  colorScheme='primary'
                  isDisabled={allowed === false}
                  isIcon
                  onClick={likePost}
                  isLoading={isLikingPost}
                  icon={BookmarkFull}
                >
                  {i18n._(t`Un-Save`)}
                </MediumGenericButton>
              )
            }
            return (
              <MediumGenericButton
                isDisabled={allowed === false}
                isIcon
                onClick={likePost}
                isLoading={isLikingPost}
                icon={BookmarkFull}
              >
                {i18n._(t`Save`)}
              </MediumGenericButton>
            )
          }}
        </Can>
      )}
    </PostLikeWrapper>
  )
}
