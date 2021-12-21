import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostBrandFragment$key } from '@//:artifacts/PostBrandFragment.graphql'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'

const PostBrandFragmentGQL = graphql`
  fragment PostBrandFragment on Post {
    brand {
      name
      thumbnail {
        ...ResourceItemFragment
        type
        urls {
          mimeType
          url
        }
      }
    }
  }
`

interface Props {
  query: PostBrandFragment$key
}

export default function PostBrand ({ query }: Props): JSX.Element {
  const data = useFragment(PostBrandFragmentGQL, query)

  return (
    <Flex align='center'>
      <Flex align='center' justify='center' mr={2} borderRadius='md' overflow='hidden' w={8} h={8}>
        {data?.brand?.thumbnail != null &&
          <ResourceItem query={data.brand.thumbnail} />}
      </Flex>
      <Heading fontSize='md'>
        {data?.brand?.name}
      </Heading>
    </Flex>
  )
}
