import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostCategoriesFragment$key } from '@//:artifacts/PostCategoriesFragment.graphql'

interface Props {
  query: PostCategoriesFragment$key
}

const PostCategoriesFragmentGQL = graphql`
  fragment PostCategoriesFragment on Post {
    categories {
      title
    }
  }
`

export default function PostCategories ({ query }: Props): JSX.Element {
  const data = useFragment(PostCategoriesFragmentGQL, query)

  return (
    <Wrap>
      {data.categories.map((item, index) =>
        <WrapItem key={index}>
          <Tag size='lg' variant='outline' colorScheme='gray' borderRadius='full'>
            <TagLabel>{item.title}</TagLabel>
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
