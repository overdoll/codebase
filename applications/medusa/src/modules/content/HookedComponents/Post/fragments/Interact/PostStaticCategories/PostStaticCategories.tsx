import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostStaticCategoriesFragment$key } from '@//:artifacts/PostStaticCategoriesFragment.graphql'

interface Props {
  query: PostStaticCategoriesFragment$key
}

const Fragment = graphql`
  fragment PostStaticCategoriesFragment on Post {
    categories {
      id
      title
    }
  }
`

export default function PostStaticCategories ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Wrap>
      {data.categories.map((item) =>
        <WrapItem key={item.id}>
          <Tag size='lg' variant='solid' colorScheme='gray' borderRadius='full'>
            <TagLabel>{item.title}</TagLabel>
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
