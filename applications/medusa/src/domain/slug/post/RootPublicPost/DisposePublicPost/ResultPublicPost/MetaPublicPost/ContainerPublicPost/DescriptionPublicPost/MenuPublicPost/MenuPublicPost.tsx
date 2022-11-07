import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MenuPublicPostFragment$key } from '@//:artifacts/MenuPublicPostFragment.graphql'
import PostArchiveButton from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostArchiveButton/PostArchiveButton'
import PostModerateButton from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostModerateButton/PostModerateButton'
import PostMenu from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostMenu'
import PostReportButton from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostReportButton/PostReportButton'
import PostUnArchiveButton from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostUnArchiveButton/PostUnArchiveButton'
import { Flex } from '@chakra-ui/react'
import useAbility from '@//:modules/authorization/useAbility'
import PostEditButton from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostMenu/PostEditButton/PostEditButton'

interface Props {
  postQuery: MenuPublicPostFragment$key
}

const PostFragment = graphql`
  fragment MenuPublicPostFragment on Post {
    state
    club {
      viewerIsOwner
    }
    ...PostArchiveButtonFragment
    ...PostUnArchiveButtonFragment
    ...PostModerateButtonFragment
    ...PostReportButtonFragment
    ...PostEditButtonFragment
  }
`

export default function MenuPublicPost (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const ability = useAbility()

  return (
    <Flex justify='flex-end'>
      <PostMenu variant='ghost' size='sm'>
        <PostModerateButton query={postData} />
        {(postData.club?.viewerIsOwner ||
          ability.can('edit', 'Post')) && (
            <PostEditButton query={postData} />
        )}
        {postData.club?.viewerIsOwner
          ? (
              postData.state === 'ARCHIVED'
                ? <PostUnArchiveButton query={postData} />
                : postData.state === 'PUBLISHED'
                  ? <PostArchiveButton query={postData} />
                  : <></>
            )
          : <PostReportButton query={postData} />}
      </PostMenu>
    </Flex>
  )
}
