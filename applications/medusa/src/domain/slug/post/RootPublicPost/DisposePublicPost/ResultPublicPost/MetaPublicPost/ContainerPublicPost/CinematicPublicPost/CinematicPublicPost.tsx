import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { CinematicPublicPostFragment$key } from '@//:artifacts/CinematicPublicPostFragment.graphql'
import { CinematicContent } from '@//:modules/content/HookedComponents/Post'
import MemoKey from '@//:modules/content/HookedComponents/Post/components/VerticalPaginationScroller/MemoKey/MemoKey'

interface Props {
  postQuery: CinematicPublicPostFragment$key
}

const PostFragment = graphql`
  fragment CinematicPublicPostFragment on Post {
    id
    ...CinematicContentFragment
  }
`

export default function CinematicPublicPost (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(PostFragment, postQuery)

  // use a memo here for performance
  return (
    <MemoKey memoKey={postData.id}>
      <CinematicContent postQuery={postData} />
    </MemoKey>
  )
}
