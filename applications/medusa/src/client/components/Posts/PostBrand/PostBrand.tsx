import { Flex, Heading } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostBrandFragment$key } from '@//:artifacts/PostBrandFragment.graphql'
import { ResourceIcon } from '@//:modules/content/PageLayout'

const PostBrandFragmentGQL = graphql`
  fragment PostBrandFragment on Post {
    brand {
      name
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

interface Props {
  query: PostBrandFragment$key
}

export default function PostBrand ({ query }: Props): JSX.Element {
  const data = useFragment(PostBrandFragmentGQL, query)

  if (data?.brand?.thumbnail == null) return <></>

  return (
    <Flex align='center'>
      <ResourceIcon mr={2} query={data?.brand?.thumbnail} />
      <Heading fontSize='md'>
        {data?.brand?.name}
      </Heading>
    </Flex>
  )
}
