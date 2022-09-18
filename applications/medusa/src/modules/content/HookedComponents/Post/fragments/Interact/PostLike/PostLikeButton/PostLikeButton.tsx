import { graphql, useFragment } from 'react-relay'
import { PostLikeButtonFragment$key } from '@//:artifacts/PostLikeButtonFragment.graphql'
import { BookmarkFull } from '@//:assets/icons/interface'
import Can from '../../../../../../../authorization/Can'
import { t } from '@lingui/macro'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import PostLikeWrapper from '../../../../../../Posts/components/PostWrappers/PostLikeWrapper/PostLikeWrapper'
import { useLingui } from '@lingui/react'
import PostLikeLoggedOutButton from './PostLikeLoggedOutButton/PostLikeLoggedOutButton'
import useAbility from '../../../../../../../authorization/useAbility'

interface Props {
  postQuery: PostLikeButtonFragment$key
}

const PostFragment = graphql`
  fragment PostLikeButtonFragment on Post {
    ...PostLikeWrapperFragment
    ...PostLikeLoggedOutButtonFragment
  }
`

export default function PostLikeButton ({
  postQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const { i18n } = useLingui()

  const ability = useAbility()

  if (!ability.can('configure', 'Account')) {
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
