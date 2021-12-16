import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostAudienceFragment$key } from '@//:artifacts/PostAudienceFragment.graphql'

interface Props {
  query: PostAudienceFragment$key
}

const PostAudienceFragmentGQL = graphql`
  fragment PostAudienceFragment on Post {
    audience {
      title
    }
  }
`

export default function PostAudience ({ query }: Props): JSX.Element {
  const data = useFragment(PostAudienceFragmentGQL, query)

  return (
    <Wrap direction='column'>
      <WrapItem>
        <Tag size='lg' variant='outline' colorScheme='gray' borderRadius='full'>
          <TagLabel>{data?.audience?.title}</TagLabel>
        </Tag>
      </WrapItem>
    </Wrap>
  )
}
