import { RejectionReasonsFragment$key } from '@//:artifacts/RejectionReasonsFragment.graphql'
import { ModeratePostFragment$key } from '@//:artifacts/ModeratePostFragment.graphql'
import { graphql } from 'react-relay'

interface Props {
  infractions: RejectionReasonsFragment$key
  postID: ModeratePostFragment$key
}

const PostIDGQL = graphql`
  fragment ModeratePostFragment on PostModerator {
    id
    post {
      id
      club {
        name
      }
      characterRequests {
        __typename
      }
      characters {
        __typename
      }
    }
  }
`

export default function UpdatePostCharactersModal (): JSX.Element {
  return <></>
}
