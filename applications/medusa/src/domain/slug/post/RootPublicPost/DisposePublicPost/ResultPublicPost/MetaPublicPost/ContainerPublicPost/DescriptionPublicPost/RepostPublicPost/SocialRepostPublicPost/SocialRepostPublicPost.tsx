import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { SocialRepostPublicPostFragment$key } from '@//:artifacts/SocialRepostPublicPostFragment.graphql'
import { HStack } from '@chakra-ui/react'
import PostShareRedditButton from './PostShareRedditButton/PostShareRedditButton'
import PostShareTwitterButton from './PostShareTwitterButton/PostShareTwitterButton'
import PostShareDiscordButton from './PostShareDiscordButton/PostShareDiscordButton'

interface Props {
  postQuery: SocialRepostPublicPostFragment$key
}

const PostFragment = graphql`
  fragment SocialRepostPublicPostFragment on Post {
    ...PostMenuButtonFragment
    ...PostShareDiscordButtonFragment
    ...PostShareTwitterButtonFragment
    ...PostShareRedditButtonFragment
  }
`

export default function SocialRepostPublicPost (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <HStack justify='flex-end' spacing={1}>
      <PostShareDiscordButton query={postData} />
      <PostShareTwitterButton query={postData} />
      <PostShareRedditButton query={postData} />
    </HStack>
  )
}
