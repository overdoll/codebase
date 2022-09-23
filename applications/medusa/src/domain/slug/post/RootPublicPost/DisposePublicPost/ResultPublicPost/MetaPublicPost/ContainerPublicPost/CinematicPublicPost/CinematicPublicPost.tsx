import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { CinematicPublicPostFragment$key } from '@//:artifacts/CinematicPublicPostFragment.graphql'
import { CinematicContent } from '@//:modules/content/HookedComponents/Post'

interface Props {
  postQuery: CinematicPublicPostFragment$key
}

const PostFragment = graphql`
  fragment CinematicPublicPostFragment on Post {
    ...CinematicContentFragment
  }
`

export default function CinematicPublicPost (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <CinematicContent postQuery={postData} />
  )
}
