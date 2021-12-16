import { Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostContentFragment$key } from '@//:artifacts/PostContentFragment.graphql'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'

interface Props {
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

export default function PostContent ({ query }: Props): JSX.Element {
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
