/**
 * @flow
 */

import { Wrap, WrapItem } from '@chakra-ui/react'
import type { Node } from 'react'
import { useFragment, graphql } from 'react-relay'
import type { PostContentFragment$key } from '@//:artifacts/PostContentFragment.graphql'
import ContentItem from '../../../../../../components/DataDisplay/ContentItem/ContentItem'

type Props = {
  content: PostContentFragment$key
}

const PostContentFragmentGQL = graphql`
    fragment PostContentFragment on Post {
        content {
            urls {
                url
            }
        }
    }
`

export default function PostHeader (props: Props): Node {
  const data = useFragment(PostContentFragmentGQL, props.content)

  return (
    <Wrap justify='center'>
      {data?.content.urls.map((item, index) =>
        <WrapItem key={index} spacing={4} h={200} w={160}>
          <ContentItem src={item.url} />
        </WrapItem>
      )}
    </Wrap>
  )
}
