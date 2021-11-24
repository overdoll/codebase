/**
 * @flow
 */

import { Wrap, WrapItem } from '@chakra-ui/react'
import type { Node } from 'react'
import { useFragment, graphql } from 'react-relay'
import type { PostContentFragment$key } from '@//:artifacts/PostContentFragment.graphql'
import ResourceItem from '../../../../../../components/DataDisplay/ResourceItem/ResourceItem'

type Props = {
  query: PostContentFragment$key
}

const PostContentFragmentGQL = graphql`
  fragment PostContentFragment on Post {
    content {
      type
      urls {
        url
        mimeType
      }
    }
  }
`

export default function PostContent ({ query }: Props): Node {
  const data = useFragment(PostContentFragmentGQL, query)

  return (
    <Wrap justify='center'>
      {data?.content.map((item, index) =>
        <WrapItem key={index} spacing={4}>
          <ResourceItem type={item.type} urls={item.urls} />
        </WrapItem>
      )}
    </Wrap>
  )
}
