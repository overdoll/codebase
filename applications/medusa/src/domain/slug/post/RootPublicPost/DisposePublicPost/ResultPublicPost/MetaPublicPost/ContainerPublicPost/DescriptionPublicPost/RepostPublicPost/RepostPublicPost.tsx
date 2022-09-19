import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { RepostPublicPostFragment$key } from '@//:artifacts/RepostPublicPostFragment.graphql'
import { Stack } from '@chakra-ui/react'
import CopyLinkPublicPost from './CopyLinkPublicPost/CopyLinkPublicPost'
import SocialRepostPublicPost from './SocialRepostPublicPost/SocialRepostPublicPost'
import ClubPublicPost from '../ClubPublicPost/ClubPublicPost'

interface Props {
  postQuery: RepostPublicPostFragment$key
}

const PostFragment = graphql`
  fragment RepostPublicPostFragment on Post {
    ...CopyLinkPublicPostFragment
    ...SocialRepostPublicPostFragment
  }
`

export default function RepostPublicPost (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <Stack
      spacing={1}
      w='100%'
      direction={{
        base: 'column',
        lg: 'row'
      }}
    >
      <CopyLinkPublicPost postQuery={postData} />
      <SocialRepostPublicPost postQuery={postData} />
    </Stack>
  )
}
