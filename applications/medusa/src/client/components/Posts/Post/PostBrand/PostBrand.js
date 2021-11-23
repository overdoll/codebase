/**
 * @flow
 */
import type { Node } from 'react'
import {
  Flex, Heading
} from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostBrandFragment$key } from '@//:artifacts/PostBrandFragment.graphql'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'

const PostBrandFragmentGQL = graphql`
  fragment PostBrandFragment on Post {
    brand {
      name
      thumbnail {
        type
        urls {
          mimeType
          url
        }
      }
    }
  }
`

type Props = {
  query: PostBrandFragment$key,
}

export default function PostBrand ({ query }: Props): Node {
  const data = useFragment(PostBrandFragmentGQL, query)

  return (
    <Flex align='center'>
      <Flex align='center' justify='center' mr={2} borderRadius='md' overflow='hidden' w={8} h={8}>
        <ResourceItem type={data.brand.thumbnail.type} urls={data.brand.thumbnail.urls} />
      </Flex>
      <Heading fontSize='md'>
        {data.brand.name}
      </Heading>
    </Flex>
  )
}
