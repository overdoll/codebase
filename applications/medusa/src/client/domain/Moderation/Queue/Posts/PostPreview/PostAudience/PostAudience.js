/**
 * @flow
 */

import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import type { Node } from 'react'
import { useFragment, graphql } from 'react-relay'
import type { PostAudienceFragment$key } from '@//:artifacts/PostAudienceFragment.graphql'

type Props = {
  query: PostAudienceFragment$key
}

const PostAudienceFragmentGQL = graphql`
  fragment PostAudienceFragment on Post {
    audience {
      title
    }
  }
`

export default function PostAudience ({ query }: Props): Node {
  const data = useFragment(PostAudienceFragmentGQL, query)

  return (
    <Wrap direction='column'>
      <WrapItem>
        <Tag size='lg' colorScheme='green' borderRadius='full'>
          <TagLabel>{data?.audience.title}</TagLabel>
        </Tag>
      </WrapItem>
    </Wrap>
  )
}
