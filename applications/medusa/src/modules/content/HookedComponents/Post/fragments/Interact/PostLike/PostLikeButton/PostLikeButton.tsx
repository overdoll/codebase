import { graphql, useFragment } from 'react-relay'
import { PostLikeButtonFragment$key } from '@//:artifacts/PostLikeButtonFragment.graphql'
import { HeartFull, HeartOutline } from '@//:assets/icons/interface'
import Can from '../../../../../../../authorization/Can'
import { t } from '@lingui/macro'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import PostLikeWrapper from '../../PostLikeWrapper/PostLikeWrapper'
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
                  isIcon
                  colorScheme='primary'
                  isDisabled={allowed === false}
                  onClick={likePost}
                  isLoading={isLikingPost}
                  icon={HeartFull}
                >
                  {i18n._(t`Liked`)}
                </MediumGenericButton>
              )
            }
            return (
              <MediumGenericButton
                isDisabled={allowed === false}
                onClick={likePost}
                isLoading={isLikingPost}
                icon={HeartOutline}
              >
                {i18n._(t`Like`)}
              </MediumGenericButton>
            )
          }}
        </Can>
      )}
    </PostLikeWrapper>
  )
}
