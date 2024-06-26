import { graphql, useFragment } from 'react-relay/hooks'
import type { PostMenuButtonFragment$key } from '@//:artifacts/PostMenuButtonFragment.graphql'
import PostUnArchiveButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostUnArchiveButton/PostUnArchiveButton'
import PostArchiveButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostArchiveButton/PostArchiveButton'
import PostModerateButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostModerateButton/PostModerateButton'
import PostReportButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostReportButton/PostReportButton'
import { NavigationMenuHorizontal } from '@//:assets/icons'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import Can from '@//:modules/authorization/Can'

interface Props {
  postQuery: PostMenuButtonFragment$key
}

const PostFragment = graphql`
  fragment PostMenuButtonFragment on Post {
    state
    club {
      viewerIsOwner
    }
    ...PostArchiveButtonFragment
    ...PostUnArchiveButtonFragment
    ...PostModerateButtonFragment
    ...PostReportButtonFragment
  }
`

export default function PostMenuButton ({
  postQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const ArchiveButton = (): JSX.Element => {
    switch (postData.state) {
      case 'ARCHIVED':
        return <PostUnArchiveButton query={postData} />
      case 'PUBLISHED':
        return <PostArchiveButton query={postData} />
      default:
        return <></>
    }
  }

  return (
    <Can I='interact' a='Post'>
      {allowed => (
        <Menu
          isIcon
          isDisabled={allowed === false}
          icon={NavigationMenuHorizontal}
          size='md'
          as={MediumGenericButton}
        >
          <PostModerateButton query={postData} />
          {postData?.club?.viewerIsOwner
            ? <ArchiveButton />
            : <PostReportButton query={postData} />}
        </Menu>)}
    </Can>
  )
}
