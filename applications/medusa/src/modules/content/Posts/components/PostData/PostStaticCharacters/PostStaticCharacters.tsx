import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostStaticCharactersFragment$key } from '@//:artifacts/PostStaticCharactersFragment.graphql'

interface Props {
  query: PostStaticCharactersFragment$key
}

const Fragment = graphql`
  fragment PostStaticCharactersFragment on Post {
    characters {
      name
      series {
        title
      }
    }
  }
`

export default function PostStaticCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (

    <Wrap>
      {data.characters.map((item, index) =>
        <WrapItem key={index}>
          <Tag size='lg' variant='outline' colorScheme='gray' borderRadius='full'>
            <TagLabel>{item.name} ({item.series?.title})</TagLabel>
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
