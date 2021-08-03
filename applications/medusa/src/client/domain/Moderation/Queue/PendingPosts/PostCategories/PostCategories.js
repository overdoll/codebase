/**
 * @flow
 */

import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import type { Node } from 'react'
import { useFragment, graphql } from 'react-relay'
import type { PostCategoriesFragment$key } from '@//:artifacts/PostCategoriesFragment.graphql'

type Props = {
  categories: PostCategoriesFragment$key
}

const postCategoriesFragmentGQL = graphql`
  fragment PostCategoriesFragment on Post {
    categories {
      title
    }
  }
`

export default function PostHeader (props: Props): Node {
  const data = useFragment(postCategoriesFragmentGQL, props.categories)

  return (
    <Wrap>
      {data.categories.map((item, index) =>
        <WrapItem key={index}>
          <Tag size='lg' colorScheme='gray' borderRadius='full'>
            <TagLabel>{item.title}</TagLabel>
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
