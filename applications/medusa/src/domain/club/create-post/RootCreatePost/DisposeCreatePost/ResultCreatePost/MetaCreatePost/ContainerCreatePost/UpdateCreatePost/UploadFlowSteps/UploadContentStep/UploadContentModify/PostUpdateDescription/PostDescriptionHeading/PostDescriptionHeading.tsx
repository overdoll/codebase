import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostDescriptionHeadingFragment$key } from '@//:artifacts/PostDescriptionHeadingFragment.graphql'
import { Heading, HeadingProps } from '@chakra-ui/react'

interface Props extends HeadingProps {
  postQuery: PostDescriptionHeadingFragment$key
}

const PostFragment = graphql`
  fragment PostDescriptionHeadingFragment on Post {
    description
  }
`

export default function PostDescriptionHeading ({
  postQuery,
  ...rest
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const fontSize = postData.description.length > 60 ? 'sm' : 'md'

  return (
    <Heading
      whiteSpace='normal'
      wordBreak='break-word'
      color='gray.200'
      fontSize={fontSize}
      {...rest}
    >
      {postData.description}
    </Heading>
  )
}
