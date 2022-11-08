import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MenuSimplePublicPostFragment$key } from '@//:artifacts/MenuSimplePublicPostFragment.graphql'
import PostArchiveButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostArchiveButton/PostArchiveButton'
import PostMenu from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostMenu'
import PostUnArchiveButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostUnArchiveButton/PostUnArchiveButton'
import useAbility from '@//:modules/authorization/useAbility'
import PostEditButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostEditButton/PostEditButton'
import { Icon } from '../../../../../PageLayout'
import { NavigationMenuHorizontal } from '@//:assets/icons'

interface Props {
  postQuery: MenuSimplePublicPostFragment$key
}

const PostFragment = graphql`
  fragment MenuSimplePublicPostFragment on Post {
    state
    club {
      viewerIsOwner
    }
    ...PostArchiveButtonFragment
    ...PostUnArchiveButtonFragment
    ...PostEditButtonFragment
  }
`

export default function MenuSimplePublicPost (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const ability = useAbility()

  if (!postData.club?.viewerIsOwner && !ability.can('edit', 'Post')) {
    return <></>
  }

  return (
    <PostMenu
      icon={
        <Icon
          icon={NavigationMenuHorizontal}
          w={6}
          h={6}
          fill='gray.100'
        />
      }
      variant='solid'
      size='md'
    >
      {(postData.club?.viewerIsOwner ||
        ability.can('edit', 'Post')) && (
          <PostEditButton query={postData} />
      )}
      {postData.club?.viewerIsOwner &&
        (
          postData.state === 'ARCHIVED'
            ? <PostUnArchiveButton query={postData} />
            : postData.state === 'PUBLISHED'
              ? <PostArchiveButton query={postData} />
              : <></>
        )}
    </PostMenu>
  )
}
