import { graphql, useFragment } from 'react-relay/hooks'
import type { PostMenuButtonFragment$key } from '@//:artifacts/PostMenuButtonFragment.graphql'
import type { PostMenuButtonViewerFragment$key } from '@//:artifacts/PostMenuButtonViewerFragment.graphql'
import PostUnArchiveButton from '../../PostMenu/PostUnArchiveButton/PostUnArchiveButton'
import PostArchiveButton from '../../PostMenu/PostArchiveButton/PostArchiveButton'
import PostModerateButton from '../../PostMenu/PostModerateButton/PostModerateButton'
import PostReportButton from '../../PostMenu/PostReportButton/PostReportButton'
import { NavigationMenuHorizontal } from '@//:assets/icons'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import { Menu } from '../../../../../ThemeComponents/Menu/Menu'
import Can from '../../../../../../authorization/Can'

interface Props {
  postQuery: PostMenuButtonFragment$key
  viewerQuery: PostMenuButtonViewerFragment$key | null
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
const ViewerFragment = graphql`
  fragment PostMenuButtonViewerFragment on Account {
    ...PostReportButtonViewerFragment
  }
`

export default function PostMenuButton ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

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
            : <PostReportButton query={postData} viewerQuery={viewerData} />}
        </Menu>)}
    </Can>
  )
}
